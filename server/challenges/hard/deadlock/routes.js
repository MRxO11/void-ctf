const express = require("express");
const auth = require("../../../security/authMiddleware");
const controller = require("./controller");

const router = express.Router();

router.use((req,res,next)=>{
  res.set("X-VOID-Lab","HARD");
  next();
});

router.post("/enter", auth, controller.enter);
router.get("/token", auth, controller.token);
router.post("/open", auth, controller.open);

module.exports = router;
