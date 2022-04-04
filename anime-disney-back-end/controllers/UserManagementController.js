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
      const { name, email, birthday, gender, password, zodiac, age, planet, star } = req.body;
      const _RegisterUserToSave = new _UserCluster({
        Name: name,
        Email: email,
        DOB: birthday,
        Gender: gender,
        Age: age,
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
    email = req.body.email;
    password = req.body.password;
    const _UserToAuthenticate = await _UserCluster.findOne({ Email: email });

    if (_UserToAuthenticate === null) {
      return res.json({
        Message: 'Authentication Failed Either Incorrect Email or Password',
        Data: null,
        status: false
      })
    }

    const _Result = await bcrypt.compare(password, _UserToAuthenticate.Password);
    if (!_Result) {
      return res.json({
        Message: 'Authentication Failed Either Incorrect Email or Password',
        Data: 'Not Found ' + _Result,
        Result: null,
        status: false
      })
    }

    const _Token = jwt.sign(
      {
        email: _UserToAuthenticate.Email,
        UserId: _UserToAuthenticate._id
      },
      'UserLogin',
      { expiresIn: '1h' }
    )

    return res.json({
      Message: 'Authentication SuccessFull',
      Data: _Result,
      Token: _Token,
      User: _UserToAuthenticate,
      status: true
    })



  } catch (error) {
    console.log(error.message);
    res.json({
      Message: error.message,
      Data: null
    })
  }
}
const getAllUsers = async (req, res) => {
  try {
    let getAllUsers = await _UserCluster.find().lean();
    res.json({
      status: true,
      Result: getAllUsers
    })
  } catch (error) {
    res.json({
      status: false,
      Message: error.message
    })
  }
};
module.exports = { UserLogin, UserRegister, getAllUsers };
