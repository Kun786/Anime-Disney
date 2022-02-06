const _UserCluster = require('../models/UserManagementModel');
const _PackageCluster = require('../models/PackageManagementModel');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const UserRegister = async (req, res) => {
    try {

        // const {}=req.body;
        const _GetReferralUserName = req.body.refral;
        const _GetUserName = req.body.username;
        const _GetPackage = req.body.package;
        const _RegisterUserToSave = new _UserCluster({
            Name: req.body.name,
            UserName: req.body.username,
            Email: req.body.email,
            Mobile: req.body.mobile,
            Package: req.body.package,
            Password: req.body.password,
            Address: req.body.password,
            Referal: req.body.refral,
            AccountNumber: req.body.account,
            PassCode: req.body.password
        });
        const _UserData = await _RegisterUserToSave.save();

        const _GetPackageDetails = await _PackageCluster.findOne({PackageName:_GetPackage});
        if (_GetReferralUserName) {
            await _UserCluster.updateOne({ UserName: _GetReferralUserName }, { $inc: { Earnings: _GetPackageDetails.ReferralClick, ReferralEarnings: _GetPackageDetails.ReferralClick } }); 
        }
        res.json({ Message: 'User Register Successfully', Result: true, Data: _UserData });
    } catch (error) {
        console.log(error.message);
        res.json({ Message: error.message, Result: false });
    }
}

const UserLogin = async (req, res) => {
    try {
        _UserName = req.body.username;
        _Password = req.body.password;
        const _UserToAuthenticate = await _UserCluster.findOne({ UserName: _UserName });

        if (_UserToAuthenticate === null) {
            return res.json({
                Message: 'Authentication Failed Either Incorrect Password or UserName',
                Data: null
            })
        }

        const _Result = await bcrypt.compare(_Password, _UserToAuthenticate.Password);
        if (!_Result) {
            return res.json({
                Message: 'Authentication Failed Either Incorrect Password or UserName',
                Data: 'Not Found ' + _Result,
                Result: null
            })
        }

        const _Token = jwt.sign(
            {
                Email: _UserToAuthenticate.Email,
                UserId: _UserToAuthenticate._id
            },
            'UserLogin',
            { expiresIn: '1h' }
        )

        if (_UserToAuthenticate.Status === 2) {
            return res.json({
                Message: 'You Cannot Login Because Your Account not Approved By Admin Please Contact Admin',
                Data: null,
                Token: _Token,
                Result: _UserToAuthenticate.Status,
                Id: _UserToAuthenticate._id
            })
        }

        if (_UserToAuthenticate.Status === 0) {
            return res.json({
                Message: 'You cannot login as you are suspended by Admin',
                Data: false,
                Result: null
            })
        }


        return res.json({
            Message: 'Authentication SuccessFull',
            Data: _Result,
            Token: _Token,
            User: _UserToAuthenticate
        })



    } catch (error) {
        console.log(error.message);
        res.json({
            Error: error.message,
            Data: null
        })
    }
}

const UpdateUserEarnings = async (req, res) => {
    try {
        const _UserId = req.body._Id;
        const _UpdateEarnings = await _UserCluster.updateOne({ _id: _UserId }, { $inc: { Earnings: 4 } });
        const _GetUpdatedUser = await _UserCluster.findById({ _id: _UserId });
        res.json({
            Message: `Updated Successfully`,
            Data: true,
            Result: _GetUpdatedUser,
        })
    } catch (error) {
        res.json({
            Error: error.message,
            Data: false,
            Result: null
        })
    }
}

const UpdateUserEarningsByAdmin = async (req, res) => {
    try {
        const _UserId = req.body._Id;
        const _Earnings = req.body.Amount;
        const _updationMethod = req.body.Method;
        if(_updationMethod === 'add'){
            const _UpdateEarnings = await _UserCluster.updateOne({ _id: _UserId }, { $inc: { Earnings: _Earnings } });
        } else if(_updationMethod === 'remove'){
            const _UpdateEarnings = await _UserCluster.updateOne({ _id: _UserId }, { $inc: { Earnings: - _Earnings } });
        }
        const _GetUpdatedUser = await _UserCluster.findById({ _id: _UserId });
        res.json({
            Message: `Updated Successfully`,
            Data: true,
            Result: _GetUpdatedUser,
        })
    } catch (error) {
        res.json({
            Error: error.message,
            Data: false,
            Result: null
        })
    }
}
const GetUsers = async (req, res) => {
    try {
        const _GetAllUsers = await _UserCluster.find();
        if (_GetAllUsers.length <= 0) {
            return res.json({
                Message: `No Users Found in your Database`,
                Data: false,
                Result: null
            })
        }
        if (_GetAllUsers.length > 0) {
            return res.json({
                Message: `Found All Users`,
                Data: true,
                Result: _GetAllUsers
            })
        }
    } catch (error) {
        res.json({
            Error: error.message,
            Data: false,
            Result: null
        })
    }
}


const GetUserById = async (req, res) => {
    try {
        const _GetId = req.params._Id;
        const _GetUserById = await _UserCluster.findById({ _id: _GetId });
        if (_GetUserById === null) {
            return res.json({
                Message: `No Users Found in your Database`,
                Data: false,
                Result: null
            })
        }
        if (_GetUserById !== null) {
            return res.json({
                Message: `Found All Users`,
                Data: true,
                Result: _GetUserById
            })
        }
    } catch (error) {
        res.json({
            Error: error.message,
            Data: false,
            Result: null
        })
    }
}

const UpdateUserStatus = async (req, res) => {
    try {
        const _GetId = req.params._Id;UpdateUserEarningsByAdmin
        const _UpdateUserStatus = await _UserCluster.updateOne({ _id: _GetId }, { $set: { Status: 1 } });
        res.json({
            Message: `User Status Updated`,
            Data: true,
            Result: _UpdateUserStatus,
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null,
        })
    }
}

const UpdateUserTid = async (req, res) => {
    try {
        const _GetId = req.body._id;
        const _GetPayLoad = req.body.tid;
        const _UpdateUserTid = await _UserCluster.updateOne({ _id: _GetId }, { $set: { Tid: _GetPayLoad } });
        res.json({
            Message: `Tid Added`,
            Data: true,
            Result: _UpdateUserTid,
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null,
        })
    }
}

const DeactiveUserStatus = async (req, res) => {
    try {
        const _GetId = req.params._Id;
        const _DeactiveUser = await _UserCluster.updateOne({ _id: _GetId }, { $set: { Status: 0 } });
        res.json({
            Message: `User DeActivated Successfully`,
            Data: true,
            Result: _DeactiveUser,
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null,
        })
    }
}

const DeleteUser = async (req, res) => {
    try {
        const _GetId = req.params._Id;
        const _RemoveDocumentFromCollection = await _UserCluster.remove({ _id: _GetId });
        res.json({
            Message: 'Removed Successfully',
            Data: true,
            Result: _RemoveDocumentFromCollection
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}


const GetAllReferalUsers = async (req, res) => {
    try {
        const _GetAllReferalUsers = await _UserCluster.find({
            "Referal": { "$exists": true, "$ne": "" }
        });
        res.json({
            Message: "Found",
            Data: true,
            Result: _GetAllReferalUsers
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

const GetReferedUserDetails = async (req, res) => {
    try {
        const _GetReferalUserName = req.body;
        const _GetReferalUserDetails = await _UserCluster.find({ Referal: _GetReferalUserName });
        if (_GetReferalUserDetails !== null) {
            return res.json({
                Message: `User Found Successfully`,
                Data: true,
                Result: _GetReferalUserDetails
            })
        }
        if (!_GetReferalUserDetails) {
            return res.json({
                Message: `User Not Found`,
                Data: false,
                Result: null
            })
        }
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

const DailyUserRegisteration = async (req, res) => {
    try {
        const _Date = new Date();
        const _TodayDate = new Date(_Date.getFullYear(), _Date.getMonth(), _Date.getDate());
        const _GetAllUsersAccordingToDateTheyCreated = await _UserCluster.find({ CreatedDate: { $gte: _TodayDate } }).lean();
        if (_GetAllUsersAccordingToDateTheyCreated.length > 0) {
            return res.json({
                Message: 'User Register Today Found Successfully',
                Data: true,
                Result: _GetAllUsersAccordingToDateTheyCreated
            })
        }

        if (_GetAllUsersAccordingToDateTheyCreated <= 0) {
            return res.json({
                Message: 'No User Register Today',
                Data: false,
                Result: null
            })
        }
        // doc.find({created: {$gte: today}}).exec(callback);
    } catch (error) {
        res.json({
            Message: error.message,
            Date: false,
            Result: null
        })

    }
}

const UpdateVideoArrayForUser = async (req, res) => {
    try {
        const _GetReferralUserName = req.body.referal;
        const _GetPackage = req.body.package;
        const _GetVideoId = req.body.VideoId;
        const _GetUserId = req.body.UserId;
        const _UpdateAndPushVideoId = await _UserCluster.updateOne(
            { _id: _GetUserId },
            { $push: { VideoArray: _GetVideoId } },
        );

        const _GetPackageDetails = await _PackageCluster.findOne({PackageName:_GetPackage});
        if (_GetReferralUserName) {
            await _UserCluster.updateOne({ UserName: _GetReferralUserName }, { $inc: { Earnings: _GetPackageDetails.ReferralClick, ReferralEarnings: _GetPackageDetails.ReferralClick } }); 
        }
        await _UserCluster.updateOne({ _id: _GetUserId}, { $inc: { Earnings: _GetPackageDetails.ClickRate } });

        if (_UpdateAndPushVideoId.modifiedCount === 1) {
            return res.json({
                Message: 'Video Id Added Successfully',
                Data:true,
                Result:_UpdateAndPushVideoId
            })
        }
        if (_UpdateAndPushVideoId.modifiedCount === 0) {
            return res.json({
                Message: 'Either User Not Found or Video Id Has Not Added',
                Data:false,
                Result:_UpdateAndPushVideoId
            })
        }
        await _UserCluster.VideoArray.createIndex( {createdDate: 1}, {
            expireAfterSeconds: 5, // 2 days
            partialFilterExpression: {
                scheduledDate: 0
            }
        });
    } catch (error) {
        return res.json({
            Message: error.message,
            Data:false,
            Result:null
        })
    }
}


const GetUserVideoArrayById = async (req,res) => {
    try {
        const _Id = req.params._UserId;
        console.log(_Id);
        const _UserArray = await _UserCluster.findOne({_id:_Id}).lean();
        res.json({
            Message:'Found Successfully',
            Data:true,
            Result:_UserArray.VideoArray
        })
    } catch (error) {
        res.json({
            Message:error.message,
            Data:false,
            Result:null
        })
    }
}

module.exports = { UserLogin, UserRegister, UpdateUserEarnings, GetUsers, GetUserById, UpdateUserStatus, DeactiveUserStatus, DeleteUser, GetReferedUserDetails, GetAllReferalUsers, UpdateUserTid, DailyUserRegisteration, UpdateVideoArrayForUser, GetUserVideoArrayById, UpdateUserEarningsByAdmin };
