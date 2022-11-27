const express = require("express");
const fachauser = require("../middleware/fachauser");
const router = express.Router();
const User = require("../models/User");
const connectToMongo = require("../db");
let success = false;

router.put("/cutoken", fachauser, async (req, res) => {
  try {
    const usid = req.userdata.userid;
    const US = await User.findById(usid);
    if (!US.coin > 0) {
      res.status(200).json({ success, message: "No Token" });
    } else {
      const user = await User.findByIdAndUpdate(usid, {
        coin: US.coin - 1,
      }).select("coin");
      success = true;
      res.status(200).json({ success, user });
      success = false;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success, message: "Server Error" });
  }
});

router.put("/addtoken/:id", fachauser, async (req, res) => {
  try {
    const usid = req.userdata.userid;
    const US = await User.findById(usid);
      const user = await User.findByIdAndUpdate(usid, {
        coin: US.coin + parseInt(req.params.id)
      }).select("coin");
      success = true;
      res.status(200).json({ success, user });
      success = false;
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success, message: "Server Error" });
  }
});
module.exports = router;
