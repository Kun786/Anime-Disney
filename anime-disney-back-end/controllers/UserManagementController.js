const _UserCluster = require("../models/UserManagementModel");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserRegister = async (req, res) => {
 


  try {
    const UserExists = await _UserCluster.findOne({ Email: req.body.Email });
    if (UserExists) {
      return res.json("User Already Exist this Email");
    } else {
      const { Name, Email, DOB, Gender, Password, Zodiac, Age, Planet, RepeatPassword, Star} = req.body;
      const _RegisterUserToSave = new _UserCluster({
        Name: Name,
        Email: Email,
        DOB: DOB,
        Gender: Gender,
        Age : Age,
        Zodiac: Zodiac,
        Star: Star,
        Planet: Planet,
        Password: Password,
        RepeatPassword: RepeatPassword,
      });
      const _UserData = await _RegisterUserToSave.save();
      res.json({
        Message: "User Register Successfully",
        Result: true,
        Data: _UserData,
      });
    }
  } catch (error) {
    res.json({ Message: error.message, Result: false });
  }
};

const UserLogin = async (req, res) => {
  try {
    _UserEmail = req.body.Email;
    _Password = req.body.Password;
    console.log(req.body);

    const _UserToAuthenticate = await _UserCluster.findOne({
      Email: _UserEmail,
    });

    if (_UserToAuthenticate === null) {
      return res.json({
        Message: "Authentication Failed Either Incorrect Password or UserName",
        Data: null,
      });
    }
    console.log(_UserToAuthenticate._Password);
    const _Result = await bcrypt.compare(
      _Password,
      _UserToAuthenticate.Password
    );
    console.log(_Result);
    if (!_Result) {
      return res.json({
        Message: "Authentication Failed Either Incorrect Password or UserName",
        Data: "Not Found " + _Result,
        Result: null,
      });
    }

    const _Token = jwt.sign(
      {
        Email: _UserToAuthenticate.Email,
        UserId: _UserToAuthenticate._id,
      },
      "UserLogin",
      { expiresIn: "1h" }
    );

    return res.json({
      Message: "Authentication SuccessFull",
      Data: _Result,
      Token: _Token,
      User: _UserToAuthenticate,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      Error: error.message,
      Data: null,
    });
  }
};

module.exports = { UserLogin, UserRegister };
