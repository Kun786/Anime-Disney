//Importing Schemas
const _WithDrawlCluster = require('../models/WithDrawlsManagementModel');
const _AdminManagementRegisterModel = require('../models/AdminManagementRegisterModel');
const _UserCluster = require('../models/UserManagementModel');
//Importing Schemas

// Aquiring Dependencies

// Aquiring Dependencies

const WithDrawlRequestByUser = async (req, res) => {
    try {
        const _WithDrawlRequest = new _WithDrawlCluster({
            UserId: req.body.UserId,
            FullName: req.body.FullName,
            UserName: req.body.UserName,
            Mobile: req.body.Mobile,
            UserCurrentEarnings: req.body.UserCurrentEarnings,
            UserWithDrawAmmount: req.body.UserWithDrawAmmount,
            AccountType: req.body.AccountType
        });
        await _WithDrawlRequest.save();
        res.json({
            Message: `Withdrawl Request Has Sent to Admin Successfully`,
            Data: true,
            Result: _WithDrawlRequest
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}


const AcquireAllWithDrawls = async (req, res) => {
    try {
        const _AcquireAllWithDrawls = await _WithDrawlCluster.find();
        res.json({
            Message: "Found Successfully",
            Data: true,
            Result: _AcquireAllWithDrawls,
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

const UpdateWithDrawStatusById = async (req, res) => {
    try {
        const _GetWithDrawId = req.params._WithDrawId;
        const _GetWithDrawCluster = await _WithDrawlCluster.updateOne({ _id: _GetWithDrawId }, { $set: { Status: 1 } });
        res.json({
            Message: 'Staus Updated Successfully',
            Data: true,
            Result: _GetWithDrawCluster
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

const OnApprovedWithDrawlRequest = async (req, res) => {
    try {
        const _GetAdminId = req.params._AdminId;
        const _GetUserId = req.body._UserId;
        const _GetWithDrawlAmmountFromUser = req.body._Amount;
        const _GetWithDrawlId = req.body._WithDrawlId

        const _GetAdminEarnings = await _AdminManagementRegisterModel.findOne({ _id: _GetAdminId });

        if (_GetAdminEarnings.Earnings > 0) {
            const _UpdateAdminEarnings = await _AdminManagementRegisterModel.updateOne({ _id: _GetAdminId },
                 {
                      $inc: { Earnings: -_GetWithDrawlAmmountFromUser }
                    //   $inc: { WithDrawls: _GetWithDrawlAmmountFromUser}
                    });
            const _UpdateAdminWithDrawls = await _AdminManagementRegisterModel.updateOne({ _id: _GetAdminId }, { $inc: { WithDrawls: _GetWithDrawlAmmountFromUser } });
            const _UpdateUserEarnings = await _UserCluster.updateOne({ _id: _GetUserId }, { $inc: { Earnings: -_GetWithDrawlAmmountFromUser } });
            const _UpdateWithDrawlStatus = await _WithDrawlCluster.updateOne({_id:_GetWithDrawlId},{ $set:{Status:1}});
            return res.json({
                Message: 'Admin Earnings User Earnings And Withdrawl Updated',
                Data: true,
            })
        }

        // await Promise.all([
            //Call to the dm
            //call to the db

            // and it will run parallel
        // ])

        if (_GetAdminEarnings.Earnings <= 0){
            return res.json({
                Message:'Cannot Update User Earnings And Withdrawl Updated Because Admin Has 0 Balance',
                Data:false,
                Result:null
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

const WithDrawlByUserName = async (req,res) => {
    try {
        const _GetUserName = req.body;
    const _GetUserWithDrawlOnName = await _WithDrawlCluster.find({UserName:_GetUserName});
    res.json({
        Message:'Data Found Successfully',
        Data:true,
        Result:_GetUserWithDrawlOnName
    })
    } catch (error) {
      res.json({
          Message:error.message,
          Data:false,
          Result:null
      })  
    }
}

const DeleteWithdrawById = async (req, res) => {
    try {
        const _GetId = req.params._Id;
        const _RemoveDocumentFromCollection = await _WithDrawlCluster.remove({ _id: _GetId });
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

module.exports = { WithDrawlRequestByUser, AcquireAllWithDrawls, UpdateWithDrawStatusById, OnApprovedWithDrawlRequest, WithDrawlByUserName, DeleteWithdrawById };