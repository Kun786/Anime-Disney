const _UserCluster = require('../models/UserManagementModel');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const UserRegister = async (req, res) => {
    try {
        const _RegisterUserToSave = new _UserCluster({
            Name: req.body.name,
            Email: req.body.email,
            DOB:req.body.dob,
            Gender: req.body.package,
            Password: req.body.password,
            PassCode: req.body.password
        });
        const _UserData = await _RegisterUserToSave.save();
        res.json({ Message: 'User Register Successfully', Result: true, Data: _UserData });
    } catch (error) {
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


module.exports = { UserLogin, UserRegister };
