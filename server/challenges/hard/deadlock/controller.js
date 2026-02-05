const service = require("./service");

async function enter(req, res) {
  await service.ensureUser(req.user.id);
  res.json({ status: "registered" });
}

async function token(req, res) {
  const token = await service.issueToken(req.user.id);
  res.json({ token });
}

async function open(req, res) {
  const { token } = req.body;
  const result = await service.openVault(req.user.id, token);

  if (result.error)
    return res.status(400).json(result);

    res.json({
      success: true,
      ...result
    });
  }

module.exports = { enter, token, open };
