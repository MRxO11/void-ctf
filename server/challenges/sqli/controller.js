const service = require("./service");

async function search(req, res, next) {
  try {
    const q = req.query.q || "";
    const results = await service.searchProfile(q);
    res.json(results);
  } catch (e) {
    next(e);
  }
}

module.exports = { search };
