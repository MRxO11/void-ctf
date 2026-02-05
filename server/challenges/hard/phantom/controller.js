const service = require("./service");
const worker = require("./worker");

async function submit(req, res) {
  const { type, payload } = req.body;

  const request = await service.createRequest(
    req.user.id,
    type,
    payload
  );

  res.json({ message: "Request submitted", id: request.id });
}

async function processAll(req, res) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admins only" });
  }

  const pending = await service.getPending();
  const results = [];

  for (let r of pending) {
    const out = await worker.process(r);
    await service.closeRequest(r.id);
    results.push(out);
  }

  res.json(results);
}

async function results(req, res) {
  const data = await service.getUserResults(req.user.id);
  res.json(data);
}

module.exports = { submit, processAll, results };
