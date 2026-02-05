const pool = require("../core/db");

async function createUser(username, email, passwordHash) {
  const query = `
    INSERT INTO users (username, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, username, email, role, created_at
  `;
  const values = [username, email, passwordHash];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function findUserByEmail(email) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return rows[0];
}

async function findUserByUsername(username) {
  const { rows } = await pool.query(
    "SELECT id FROM users WHERE username = $1",
    [username]
  );
  return rows[0];
}

async function findUserById(id) {
  const { rows } = await pool.query(
    "SELECT id, username, email, role, points FROM users WHERE id = $1",
    [id]
  );
  return rows[0];
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByUsername
};
