const pool = require("../core/db");

async function getChallenges() {
  const { rows } = await pool.query(
    "SELECT id, title, description, category, points FROM challenges WHERE is_active=true"
  );
  return rows;
}

async function getUserProgress(userId) {
  const { rows } = await pool.query(
    "SELECT lab_id FROM user_labs WHERE user_id=$1",
    [userId]
  );
  return rows.map(r => r.lab_id);
}

async function submitFlag(userId, labId, submittedFlag) {

  const solved = await pool.query(
    "SELECT 1 FROM user_labs WHERE user_id=$1 AND lab_id=$2",
    [userId, labId]
  );
  if (solved.rows.length) {
    return { success: false, message: "Already solved" };
  }

  const lab = await pool.query(
    "SELECT flag, reward FROM labs WHERE id=$1",
    [labId]
  );

  if (!lab.rows.length) {
    return { success: false, message: "Invalid lab" };
  }

  if (lab.rows[0].flag !== submittedFlag) {
    return { success: false, message: "Wrong flag" };
  }

  await pool.query(
    "INSERT INTO user_labs (user_id, lab_id) VALUES ($1,$2)",
    [userId, labId]
  );

  await pool.query(
    "UPDATE users SET points = points + $1 WHERE id=$2",
    [lab.rows[0].reward, userId]
  );

  return {
    success: true,
    points: lab.rows[0].reward
  };
}

async function getScoreboard() {
  const { rows } = await pool.query(`
    SELECT users.username, COUNT(solves.id) as solves, SUM(challenges.points) as score
    FROM solves
    JOIN users ON users.id = solves.user_id
    JOIN challenges ON challenges.id = solves.challenge_id
    GROUP BY users.username
    ORDER BY score DESC
  `);
  return rows;
}

module.exports = {
  getChallenges,
  getScoreboard,
  submitFlag,
  getUserProgress
};
