const pool = require("../../../core/db");

async function getSecret() {
  const { rows } = await pool.query(
    "SELECT secret FROM echo_secrets LIMIT 1"
  );
  return rows[0];
}

module.exports = { getSecret };
