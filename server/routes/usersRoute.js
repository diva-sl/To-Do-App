const express = require("express");
const router = express.Router();
const User = require("../modals/userModels.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup User

router.post("/signup", async (req, res, next) => {
  const { name, email, password } = req.body.formData;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        message: "User Already Exists",
        success: false,
        data: null,
      });
    }
    const hashedPassword = await bcrypt.hashSync(password);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    if (user) {
      return res.send({
        message: "User Created Successfully",
        success: true,
        data: null,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

//SigIn User

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
        data: null,
      });
    }
    const isCorrectPassword = bcrypt.compareSync(
      password,
      existingUser.password
    );
    if (!isCorrectPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password.",
        data: null,
      });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "User logged in successfully.",
      token,
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({
      success: false,
      message: "An internal server error occurred.",
      data: null,
    });
  }
});

module.exports = router;
