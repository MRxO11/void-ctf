const pool = require("../../core/db");

async function getSecretById(id) {
  const { rows } = await pool.query(
    "SELECT id, title, content FROM secrets WHERE id=$1",
    [id] 
  );

  return rows[0] || null;
}

async function getMySecrets(userId) {
  const { rows } = await pool.query(
    `
    SELECT id, title 
    FROM secrets 
    ORDER BY created_at DESC 
    LIMIT 5
    `
  );
  return rows;
}

module.exports = { getSecretById, getMySecrets };