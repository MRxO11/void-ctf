
const pool = require("../../core/db");

async function searchProfile(term) {
  if (!term || term.trim().length < 3) {
    return [];
  }

  const query = `
    SELECT username, bio FROM profiles
    WHERE username LIKE '%${term}%'
    LIMIT 5
  `;

  const { rows } = await pool.query(query);
  return rows;
}

module.exports = { searchProfile };
