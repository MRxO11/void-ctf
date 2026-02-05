const pool = require("../../../core/db");
const crypto = require("crypto");

async function ensureUser(userId) {
  await pool.query(
    "INSERT INTO deadlock_users (id, credits) VALUES ($1, 100) ON CONFLICT DO NOTHING",
    [userId]
  );
}

async function issueToken(userId) {
  const token = crypto.randomBytes(16).toString("hex");

  await pool.query(
    "INSERT INTO deadlock_tokens (token, user_id, used) VALUES ($1,$2,false)",
    [token, userId]
  );

  return token;
}

async function openVault(userId, token) {
  const client = await pool.connect();

  try {
    const t = await client.query(
      "SELECT used FROM deadlock_tokens WHERE token=$1 AND user_id=$2",
      [token, userId]
    );

    if (!t.rows.length || t.rows[0].used)
      return { error: "invalid token" };

    const u = await client.query(
      "SELECT credits FROM deadlock_users WHERE id=$1",
      [userId]
    );

    if (u.rows[0].credits < 100)
      return { error: "not enough credits" };
w
    await new Promise(r => setTimeout(r, 3000));

    await client.query(
      "UPDATE deadlock_tokens SET used=true WHERE token=$1",
      [token]
    );

    await client.query(
      "UPDATE deadlock_users SET credits = credits - 100 WHERE id=$1",
      [userId]
    );

    const after = await client.query(
      "SELECT credits FROM deadlock_users WHERE id=$1",
      [userId]
    );

    if (after.rows[0].credits < 0) {
      const flag = await client.query(
        "SELECT flag FROM deadlock_flags LIMIT 1"
      );
      return { flag: flag.rows[0].flag };
    }

    return { status: "vault opened" };

  } finally {
    client.release();
  }
}


module.exports = { ensureUser, issueToken, openVault };
