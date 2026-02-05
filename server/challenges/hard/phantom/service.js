const pool = require("../../../core/db");

async function createRequest(userId, type, payload) {
  const { rows } = await pool.query(
    `INSERT INTO phantom_requests (user_id, type, payload)
     VALUES ($1,$2,$3) RETURNING *`,
    [userId, type, payload]
  );
  return rows[0];
}

async function getPending() {
  const { rows } = await pool.query(
    `SELECT * FROM phantom_requests WHERE status='pending'`
  );
  return rows;
}

async function closeRequest(id) {
  await pool.query(
    `UPDATE phantom_requests SET status='done' WHERE id=$1`,
    [id]
  );
}

async function getSecret() {
  const { rows } = await pool.query(
    `SELECT secret FROM phantom_secrets LIMIT 1`
  );
  return rows[0];
}

async function saveResult(id, result) {
  await pool.query(
    "UPDATE phantom_requests SET result=$1 WHERE id=$2",
    [result, id]
  );
}

async function getUserResults(userId) {
  const { rows } = await pool.query(
    "SELECT id, type, status, result FROM phantom_requests WHERE user_id=$1 ORDER BY id DESC",
    [userId]
  );
  return rows;
}

module.exports = {
  createRequest,
  getPending,
  closeRequest,
  getSecret,
  saveResult,
  getUserResults
};
