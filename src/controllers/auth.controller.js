// controllers/auth.controller.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Role = require('../models/Role');

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: "Invalid Data" });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(409).json({ success: false, message: "Email exists" });

    const adminRole = await Role.findOne({ role_name: "Admin" });
    if (!adminRole)
      return res.status(500).json({ success: false, message: "Roles not seeded" });

    const user = await User.create({ email, password });

    const token = jwt.sign(
      { id: user._id, role: "Admin" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(201).json({ success: true, token });
  } catch (err) {
    console.log("signup error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: "Invalid Data" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, message: "Invalid credentials" });

    const ok = await user.comparePassword(password);
    if (!ok)
      return res.status(400).json({ success: false, message: "Invalid credentials" });

    // Default for this assignment: first registered user = Admin
    const token = jwt.sign(
      { id: user._id, role: "Admin" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.json({ success: true, token });
  } catch (err) {
    console.log("login error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
