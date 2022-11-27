const express = require("express");
const User = require("../models/User");
const Admin = require("../models/Admin");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { useInsertionEffect } = require("react");
const connectToMongo = require("../db"); 
const fachauser = require('../middleware/fachauser')
let success = false;
router.post(
  "/creatuser",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("passwd", "Password Must be 5 Digit").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, message: errors.array() });
    }

    let ch = await User.findOne({ email: req.body.email });

    if (ch) {
      return res.status(400).json({success, message: "User Alredy Registerd" });
    }

    try {
      const saltRounds = 10;
      const myPlaintextPassword = req.body.passwd;
      await bcrypt.genSalt(saltRounds, function (err, salt) {
        // console.log(salt);
        function o(userid) {
          // console.log({userid})
          const date = { userid };
          const token = jwt.sign(date, "H@rd!k#$110"); 
          success = true;
          res.json({success, token });
          success = false
        }
        bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
          // Store hash in your password DB.
          user = User.create({
            name: req.body.name,
            email: req.body.email,
            passwd: hash,
          }).then((user) => o(user._id)); //functio for data sand to user
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({success, errors: error });
    }

  }
);

router.post(
  "/login",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("passwd", "enter password").isLength({ min: 1 }),
  ],
  async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, message: errors.array() });
    }

    try {
      let ch = await User.findOne({ email: req.body.email });
      if (!ch) {
        return res.status(400).json({success, message: "User Not Found" });
      }

      var data = await User.find({ email: req.body.email });
      const pss = data[0].passwd;

      const passcom = await bcrypt.compare(req.body.passwd, pss);

      if (!passcom) {
        return res.status(400).json({success, message: "Wrong Password" });
      }

      const dates = { userid: data[0]._id };
      const token = jwt.sign(dates, "H@rd!k#$110");
      success = true
      res.json({success, token });
      success = false
    } catch (error) {
      console.log(error);
      res.status(500).json({success, error });
    }
  }
);

router.get("/getuser",fachauser, async (req, res) => {
  try {
    const usid = req.userdata.userid;
    const user = await User.findById(usid).select('-passwd')
    success = true;
    res.status(200).json({success,user});
    success = false
  } catch (error) {
    //console.log(error);
    res.status(500).json({success, message: "Server Error" });
  }
});

router.post(
  "/admin",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("passwd", "enter password").isLength({ min: 1 }),
  ],
  async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, message: errors.array() });
    }

    try {
      let ch = await Admin.findOne({ email: req.body.email });
      if (!ch) {
        return res.status(400).json({success, message: "User Not Found" });
      }

      var data = await Admin.find({ email: req.body.email });
      const pss = data[0].passwd;

      const passcom = await bcrypt.compare(req.body.passwd, pss);

      if (!passcom) {
        return res.status(400).json({success, message: "Wrong Password" });
      }

      const dates = { userid: data[0]._id };
      const token = jwt.sign(dates, "H@rd!k#$110");
      success = true
      res.json({success, token });
      success = false
    } catch (error) {
      console.log(error);
      res.status(500).json({success, error });
    }
  }
);


module.exports = router;
