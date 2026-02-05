const express = require("express");
const controller = require("./controller");

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use((req, res, next) => {
  res.set("X-VOID-Lab", "HARD");
  next();
});


function adminOnly(req, res, next) {
  if (req.headers["x-admin-bot"] === "blackmirror") {
    return next();
  }
  return res.status(403).send("Forbidden");
}


router.post("/reset", async (req, res) => {
  await require("./service").reset();
  res.json({ status: "blackmirror reset" });
});

router.post("/report", controller.submit);
router.get("/result", controller.result);


router.get("/admin/reports", adminOnly, controller.view);
router.get("/admin/secret", adminOnly, controller.adminSecret);
router.post("/capture", controller.capture);

module.exports = router;
