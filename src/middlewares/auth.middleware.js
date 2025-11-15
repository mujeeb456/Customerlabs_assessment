// middlewares/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ success: false, message: "No token" });

    const [bearer, token] = header.split(" ");
    if (bearer !== "Bearer" || !token)
      return res.status(401).json({ success: false, message: "Invalid token format" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ success: false, message: "User not found" });

    req.user = user;
    req.user.role_claim = decoded.role;

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
