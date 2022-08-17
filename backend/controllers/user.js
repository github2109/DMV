const config = require("../utils/config");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const check = await User.findOne({ username });
    if (check) {
      return res.status(500).json({
        message:
          "This username is already existed, try with a different username.",
      });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    const user = await new User({
      username,
      password: cryptedPassword,
      role,
    });
    const userSaved = await user.save();
    res.status(201).json(userSaved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
