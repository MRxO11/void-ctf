const express = require("express");
const { body } = require("express-validator");
const controller = require("./controller");
const auth = require("../security/authMiddleware");

const router = express.Router();

router.post(
  "/register",
  body("username").isLength({ min: 3, max: 32 }),
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  controller.register
);

router.post("/login", controller.login);
router.get("/me", auth, controller.me);

router.get("/health", (req, res) => {
  res.json({ status: "AUTH SYSTEM READY" });
});

module.exports = router;
