const express = require("express");
const router = express.Router();
const User = require("../models/user");
const validateUser = require("../joi");
const bcrypt = require("bcryptjs");
router.get("/", (req, res) => {
  res.json({
    name: "arjun",
    age: 20,
  });
});

//adding new user
router.post("/", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    //check weather user already exists
    let user = await User.find({ email: req.body.email });
    if (user.length > 0) {
      return res.status(400).json({
        success: false,
        message: "email already exists",
      });
    }
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message,
      });
    }
    // salting and hashing
    const salt = await bcrypt.genSalt(10);
    const securePass = await bcrypt.hash(req.body.password, salt);
    let { name, email } = req.body;
    const data = new User({ name: name, email: email, password: securePass });
    await data.save();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
