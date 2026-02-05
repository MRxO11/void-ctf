const service = require("./service");

async function submit(req, res) {
  const { content } = req.body;
  await service.submit(content);
  res.json({ status: "queued for review" });
}

async function view(req, res) {
  const since = Number(req.query.since || 0);
  const reports = await service.getSince(since);

  let html = `<h1>Incident Reports</h1>`;

  for (let r of reports) {
    html += `<div class="report">${r.content}</div><hr/>`;
  }

  res.send(html); 
}

async function adminSecret(req, res) {
  const flag = await service.getFlag();
  res.json({ flag });
}

async function capture(req, res) {
  const { data } = req.body;
  if (!data) return res.json({ status: "ignored" });

  await service.storeCapture(data);
  res.json({ status: "captured" });
}

async function result(req, res) {
  const last = await service.getLastCapture();
  res.json({
    success: !!last,
    data: last?.data || null
  });
}

module.exports = {
  submit,
  view,
  adminSecret,
  capture,
  result
};
