const express = require("express");
const auth = require("../../../security/authMiddleware");
const controller = require("./controller");

const router = express.Router();

router.get("/token", auth, controller.getToken);
router.post("/perform", auth, controller.perform);

module.exports = router;
