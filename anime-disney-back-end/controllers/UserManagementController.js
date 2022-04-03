const _UserCluster = require("../models/UserManagementModel");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserRegister = async (req, res) => {
 console.log(req.body);
  try {
    const UserExists = await _UserCluster.findOne({ Email: req.body.Email });
    if (UserExists) {
      return res.json("User Already Exist this Email");
    } else {
      const { name, email, birthday, gender, password, zodiac, age, planet, star} = req.body;
      const _RegisterUserToSave = new _UserCluster({
        Name: name,
        Email: email,
        DOB: birthday,
        Gender: gender,
        Age : age,
        Zodiac: zodiac,
        Star: star,
        Planet: planet,
        Password: password
      });
      const _UserData = await _RegisterUserToSave.save();
      res.json({
        Message: "User Register Successfully",
        status: true,
        Data: _UserData,
      });
    }
  } catch (error) {
    res.json({ Message: error.message, status: false });
  }
};

const UserLogin = async (req, res) => {
  try {
    console.log(req.body)
    _UserEmail = req.body.email;
    _Password = req.body.password;
    console.log(req.body);

    const _UserToAuthenticate = await _UserCluster.findOne({
      Email: _UserEmail,
    });

    if (_UserToAuthenticate === null) {
      return res.json({
        Message: "Authentication Failed Either Incorrect Password or UserName",
        status: false,
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
        status: false,
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
