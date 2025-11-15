// middlewares/roles.middleware.js

exports.requireAdmin = (req, res, next) => {
  if (req.user.role_claim !== "Admin")
    return res.status(403).json({ success: false, message: "Requires admin" });
  next();
};

exports.requireNormalOrAdmin = (req, res, next) => {
  const r = req.user.role_claim;
  if (r === "Admin" || r === "Normal") return next();
  return res.status(403).json({ success: false, message: "Forbidden" });
};
