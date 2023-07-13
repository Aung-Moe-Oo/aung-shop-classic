const router = require("express").Router();
const User = require("../Models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    isAdmin: true,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json("Something went wrong!");
  }
});

// Login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .json("Your user ID and/or password does not match.");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res
        .status(401)
        .json("Your user ID and/or password does not match.");
    }

    const { password, ...others } = user._doc;
    const accessToken = jwt.sign({ ...others }, process.env.JWT_SEC, {
      expiresIn: "1d",
    });
    const data = { ...others, accessToken };

    res.cookie("token", accessToken, { httpOnly: true }).status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
