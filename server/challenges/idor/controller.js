const service = require("./service");

const { validate: isUUID } = require("uuid");

async function getSecret(req, res, next) {
  try {
    if (!isUUID(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const secret = await service.getSecretById(req.params.id);
    if (!secret) return res.status(404).json({ message: "Not found" });

    res.json(secret);
  } catch (e) {
    next(e);
  }
}

async function mySecrets(req, res, next) {
  try {
    const secrets = await service.getMySecrets(req.user.id);
    res.json(secrets);
  } catch (e) {
    next(e);
  }
}

module.exports = { getSecret, mySecrets };
