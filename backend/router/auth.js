const express = require("express");
const router = express.Router();
const User = require("../models/user");
const validateUser = require("../joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "arjunisagoodboy";
const fetchUser = require("../middleware/islogged");
router.get("/", (req, res) => {
  res.json({
    name: "arjun",
    age: 20,
  });
});

//adding new user
router.post("/signup", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    //check weather user already exists
    let user = await User.find({ email: req.body.email });
    let success = false;
    if (user && user.length > 0) {
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
    const JWT_data = {
      user: {
        id: user._id,
      },
    };
    let authToken = jwt.sign(JWT_data, JWT_SECRET);
    success = true;
    res.json({ success, token: authToken });
  } catch (err) {
    success = false;
    res.status(500).json({ success, message: err });
  }
});

//authenticate a user
router.post("/login", async (req, res) => {
  // const { error } = validateUser(req.body);
  // if (error) {
  //   return res.status(400).json({ message: error.details[0].message });
  // }

  try {
    let { email, password } = req.body;
    //finding if user exists
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    let success = false;
    // comparing the password to login
    let comparepass = await bcrypt.compare(password, user.password);
    if (!comparepass) {
      success = false;
      return res.status(400).json({ success, message: "Invalid credentials" });
    }

    const JWT_data = {
      user: {
        id: user._id,
      },
    };
    let authToken = jwt.sign(JWT_data, JWT_SECRET);
    success = true;
    res.json({ success, token: authToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Some error occurred" });
  }
});

router.get("/getUser", fetchUser, async (req, res) => {
  let userId = req.user.id;
  let user = await User.findById(userId);
  res.json({ user });
});

module.exports = router;
