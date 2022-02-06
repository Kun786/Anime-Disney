const _UserCluster = require('../models/UserManagementModel');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const UserRegister = async (req, res) => {
    try {
        const {Name,Email,DOB,Gender,Password}=req.body;
        const _RegisterUserToSave = new _UserCluster({
            Name: Name,
            Email: Email,
            DOB: DOB,
            Gender: Gender,
            Password: Password,
            PassCode: Password
        });
        const _UserData = await _RegisterUserToSave.save();
        res.json({ Message: 'User Register Successfully', Result: true, Data: _UserData });
    } catch (error) {
        res.json({ Message: error.message, Result: false });
    }
}

const UserLogin = async (req, res) => {
    try {
        _UserEmail = req.body.email;
        _Password = req.body.password;
        const _UserToAuthenticate = await _UserCluster.findOne({ Email: _UserEmail });

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
