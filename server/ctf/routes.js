const express = require("express");
const auth = require("../security/authMiddleware");
const controller = require("./controller");

const router = express.Router();

router.get("/challenges", auth, controller.listChallenges);
router.post("/submit", auth, controller.submitFlag);
router.get("/scoreboard", controller.scoreboard);
router.get("/progress", auth, controller.getProgress);

router.get("/health", (req, res) => {
  res.json({ status: "CTF ENGINE READY" });
});

module.exports = router;
