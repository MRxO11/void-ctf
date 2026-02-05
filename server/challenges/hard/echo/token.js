const crypto = require("crypto");

const SECRET = process.env.ECHO_SECRET || "echo_dev_key";

function sign(userId) {
  const hmac = crypto.createHmac("sha256", SECRET);
  hmac.update(userId);
  return hmac.digest("hex");
}

function generateToken(userId, action) {
  const sig = sign(userId);

  return Buffer.from(
    JSON.stringify({ userId, action, sig })
  ).toString("base64");
}

function verifyToken(token) {
  const data = JSON.parse(
    Buffer.from(token, "base64").toString()
  );

  const expected = sign(data.userId);

  if (expected !== data.sig) {
    throw new Error("Invalid signature");
  }

  return data; 
}

module.exports = { generateToken, verifyToken };
