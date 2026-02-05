const tokenUtil = require("./token");
const service = require("./service");

async function getToken(req, res) {
  const token = tokenUtil.generateToken(
    req.user.id,
    "view_profile"
  );

  res.json({ token });
}

async function perform(req, res) {
  try {
    const { token } = req.body;
    const data = tokenUtil.verifyToken(token);

    if (data.action === "view_profile") {
      return res.json({ profile: "ok" });
    }

    if (data.action === "dump_secret") {
      const secret = await service.getSecret();
      return res.json(secret);
    }

    res.status(400).json({ error: "unknown action" });

  } catch {
    res.status(403).json({ error: "invalid token" });
  }
}

module.exports = { getToken, perform };
