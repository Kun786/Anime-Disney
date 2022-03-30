const _AdminCluster = require("../models/AdminmanagementModel");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const AdminRegister = async (req, res) => {
  function zodiac_sign(day, month) {
    let astro_sign = "";

    // checks month and date within the
    // valid range of a specified zodiac
    if (month == 12) {
      if (day < 22) astro_sign = "Sagittarius";
      else astro_sign = "capricorn";
    } else if (month == 1) {
      if (day < 20) astro_sign = "Capricorn";
      else astro_sign = "aquarius";
    } else if (month == 2) {
      if (day < 19) astro_sign = "Aquarius";
      else astro_sign = "pisces";
    } else if (month == 3) {
      if (day < 21) astro_sign = "Pisces";
      else astro_sign = "aries";
    } else if (month == 4) {
      if (day < 20) astro_sign = "Aries";
      else astro_sign = "taurus";
    } else if (month == 5) {
      if (day < 21) astro_sign = "Taurus";
      else astro_sign = "gemini";
    } else if (month == 6) {
      if (day < 21) astro_sign = "Gemini";
      else astro_sign = "cancer";
    } else if (month == 7) {
      if (day < 23) astro_sign = "Cancer";
      else astro_sign = "leo";
    } else if (month == 8) {
      if (day < 23) astro_sign = "Leo";
      else astro_sign = "virgo";
    } else if (month == 9) {
      if (day < 23) astro_sign = "Virgo";
      else astro_sign = "libra";
    } else if (month == 10) {
      if (day < 23) astro_sign = "Libra";
      else astro_sign = "scorpio";
    } else if (month == 11) {
      if (day < 22) astro_sign = "scorpio";
      else astro_sign = "sagittarius";
    }
    console.log(astro_sign);
  }

  try {
    var DOB = req.body.DOB;
    function getAge(dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      let month = birthDate.getMonth() + 1;
      let day = birthDate.getUTCDate();
      console.log("month is " + month);
      console.log("day is " + day);
      console.log("age is " + age);
      zodiac_sign(day, month)
      return month + " " + day + " " + age;
    }
    getAge(DOB);

    const AdminExists = await _AdminCluster.findOne({ Email: req.body.Email });
    if (AdminExists) {
      return res.json("Admin already Register this Email");
    } else {
      const { Name, Email, DOB, Gender, Password, Status } = req.body;
      const _RegisterAdminToSave = new _AdminCluster({
        Name: Name,
        Email: Email,
        DOB: DOB,
        Gender: Gender,
        Password: Password,
        Status: Status,
      });
      const _AdminData = await _RegisterAdminToSave.save();
      res.json({
        Message: "Admin Register Successfully",
        Result: true,
        Data: _AdminData,
      });
    }
  } catch (error) {
    res.json({ Message: error.message, Result: false });
  }
};

const AdminLogin = async (req, res) => {
  try {
    _AdminEmail = req.body.Email;
    _Password = req.body.Password;
    const _AdminToAuthenticate = await _AdminCluster.findOne({
      Email: _AdminEmail,
    });

    if (_AdminToAuthenticate === null) {
      return res.json({
        Message: "Authentication Failed Either Incorrect Password or AdminName",
        Data: null,
      });
    }
    if (_AdminToAuthenticate.Status === 1) {
      const _Result = await bcrypt.compare(
        _Password,
        _AdminToAuthenticate.Password
      );
      if (!_Result) {
        return res.json({
          Message:
            "Authentication Failed Either Incorrect Password or AdminName",
          Data: "Not Found " + _Result,
          Result: null,
        });
      }

      const _Token = jwt.sign(
        {
          Email: _AdminToAuthenticate.Email,
          adminId: _AdminToAuthenticate._id,
        },
        "AdminLogin",
        { expiresIn: "1h" }
      );

      return res.json({
        Message: "Authentication SuccessFull",
        Data: _Result,
        Token: _Token,
        Admin: _AdminToAuthenticate,
      });
    } else {
      res.json({
        message: "Your are not registered!",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      Error: error.message,
      Data: null,
    });
  }
};

module.exports = { AdminLogin, AdminRegister };
