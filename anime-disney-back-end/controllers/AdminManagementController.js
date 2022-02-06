const _UserCluster = require('../models/UserManagementModel');
const _AdminManagementRegisterModel = require('../models/AdminManagementRegisterModel');
const _PackageManagementAddNewPackageModel = require(`../models/PackageManagementModel`);

const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



const AdminRegister= async(req,res) => {
    try {
        const _GetAdminUserLength = _AdminManagementRegisterModel.find();
        if (_GetAdminUserLength.length >= 1) {
            res.json({
                Message:`Admin Regesteration is Constraint`,
                Status:null,
                Data:false
            })
        } else {
            const _RegisterAdmin = new _AdminManagementRegisterModel({
                Name: req.body.fname,
                Email: req.body.email,
                Mobile: req.body.mobile,
                Password: req.body.password,
                Address: req.body.address
            });
            await _RegisterAdmin.save();
            res.json({
                Message:`User Register Successfully`,
                Status:1,
                Data:true
            })
        }
    } catch (error) {
        res.json({ Message: error.message, Result: false });
    }
}

const AdminLogin = async (req,res) => {
    try {
        _Email = req.body.email;
        _Password = req.body.password;
        let _AdminToAuthenticate = await _AdminManagementRegisterModel.findOne({ Email: _Email });
        if(_AdminToAuthenticate !== null){
            if (_AdminToAuthenticate.Status === 0) {
                return res.status(200).json({
                    Message: 'You Cannot Login Because You Are Suspended By Admin Please Contact Admin',
                    Result: false
                })
            }
        }
       
        if (_AdminToAuthenticate === null) {
            return res.status(401).json({
                Message: 'Authentication Failed Either Incorrect Password or Email',
                Result: false
            })
        }

        const _Result = await bcrypt.compare(_Password, _AdminToAuthenticate.Password);
        if (!_Result) {
            return res.status(401).json({
                Message: 'Authentication Failed Either Incorrect Password or Email',
                Data: 'Not Found ' + _Result,
                Result: false
            })
        }

        const _Token = jwt.sign(
            {
                Email: _AdminToAuthenticate.Email,
                UserId: _AdminToAuthenticate._id
            },
            'UserLogin',
            { expiresIn: '1h' }
        )

        return res.status(200).json({
            Message: 'Authentication SuccessFull',
            Data: _AdminToAuthenticate,
            Token: _Token,
            Result: true
        })
   
        

    } catch (error) {
        res.status(500).json({
            Error: error.message,
            Data: null,
            Result: false
        })
    }
}

const GetAdminDetails = async(req,res)=>{
    try {
        const _GetAdminId = await _AdminManagementRegisterModel.find();
        if(_GetAdminId.length <= 0){return res.json({Message:`Not Found`, Data:false, Result:null})}
        if(_GetAdminId.length > 0){return res.json({Message:`User Found Successfully`, Data:true, Id:_GetAdminId[0]._id, Result:_GetAdminId})}
    } catch (error) {
        res.json({
            Message:error.Message,
            Data:false,
            Result:null
        })
    }
}

const AddAdminEarnings = async(req,res) => {
    try {
        const _PackageName = req.body.pkg;
        const _AdminId = req.body.adminId;
        const _GetPackage = await _PackageManagementAddNewPackageModel.findOne({PackageName:_PackageName});
        const _GetPackageValue = _GetPackage.PackagePrice;
        const _UpdateAdminEarnings = await _AdminManagementRegisterModel.updateOne({_id:_AdminId},{$inc: { Earnings:_GetPackageValue }});
        if(_GetPackage === null){
            return res.json({
                Message:`No Data Found`,
                Data:false,
                Result:null
                
            })
        }

        if(_GetPackage !== null){
            return res.json({
                Message:`Actions Updated`,
                Data:true,
                Result:_UpdateAdminEarnings
            })
        }
    } catch (error) {
        res.json({
            Message:error.message,
            Data:false
        })
    }

}
const ResetUsersVideoArray = async (req,res) =>{
    try {
        const _UsersArray = await _UserCluster.updateMany({VideoArray:[]});
        res.json({
            Message:'Users Video Array Rest Successfully',
            Data:true,
            Result:_UsersArray
        })
    } catch (error) {
        res.json({
            Message:error.message,
            Data:false,
            Result:null
        })
    }
}

module.exports = { AdminRegister, AdminLogin, AddAdminEarnings, GetAdminDetails, ResetUsersVideoArray };