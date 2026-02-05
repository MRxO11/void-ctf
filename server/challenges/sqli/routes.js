const express = require("express");
const auth = require("../../security/authMiddleware");
const controller = require("./controller");

const router = express.Router();

router.get("/search", auth, controller.search);

module.exports = router;
