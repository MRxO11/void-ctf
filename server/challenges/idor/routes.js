const express = require("express");
const auth = require("../../security/authMiddleware");
const controller = require("./controller");

const router = express.Router();

router.get("/secret/:id", auth, controller.getSecret);
router.get("/my-secrets", auth, controller.mySecrets);


module.exports = router;
