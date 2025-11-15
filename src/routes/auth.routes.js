// routes/auth.routes.js
const router = require("express").Router();
const { signup, login } = require("../controllers/auth.controller");
const { signupValidator } = require("../utils/validators");
const { validationResult } = require("express-validator");

router.post(
  "/signup",
  signupValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, message: "Invalid Data" });
    next();
  },
  signup
);

router.post("/login", login);

module.exports = router;
