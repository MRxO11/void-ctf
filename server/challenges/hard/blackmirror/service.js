const pool = require("../../../core/db");

async function submit(content) {
  await pool.query(
    "INSERT INTO bm_reports (content) VALUES ($1)",
    [content]
  );
}

async function getAll() {
  const { rows } = await pool.query(
    "SELECT * FROM bm_reports ORDER BY id DESC"
  );
  return rows;
}

async function getFlag() {
  const { rows } = await pool.query(
    "SELECT flag FROM bm_flags LIMIT 1"
  );

  if (!rows.length) return "VOID{FLAG_NOT_CONFIGURED}";
  return rows[0].flag;
}

async function storeCapture(data) {
  await pool.query(
    "INSERT INTO bm_captures (data) VALUES ($1)",
    [data]
  );
}

async function getSince(ts) {
  const { rows } = await pool.query(
    "SELECT * FROM bm_reports WHERE created_at > to_timestamp(($1::double precision) / 1000) ORDER BY id DESC",
    [ts]
  );
  return rows;
}

async function getLastCapture() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const { rows } = await client.query(
      "SELECT id, data FROM bm_captures ORDER BY id DESC LIMIT 1 FOR UPDATE"
    );

    if (rows.length === 0) {
      await client.query("COMMIT");
      return null;
    }

    await client.query("DELETE FROM bm_captures WHERE id=$1", [rows[0].id]);
    await client.query("COMMIT");

    return { data: rows[0].data };

  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

async function reset() {
  await pool.query("TRUNCATE public.bm_captures RESTART IDENTITY");
}

module.exports = {
  submit,
  getAll,
  getFlag,
  getSince,
  storeCapture,
  getLastCapture,
  reset
};
