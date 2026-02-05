const express = require("express");
const auth = require("../../../security/authMiddleware");
const controller = require("./controller");

const router = express.Router();
router.use(auth);

router.post("/request", auth, controller.submit);
router.get("/result", auth, controller.results);

router.post("/processAll", controller.processAll);

module.exports = router;
