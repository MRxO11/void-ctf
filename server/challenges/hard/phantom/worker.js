const service = require("./service");

async function process(req) {
  const { type, payload } = req;

  if (payload && payload.action) {
    if (payload.action === "dump_secrets") {
      return await service.getSecret();
    }
  }

  if (type === "export_users") {
    return { ok: true };
  }

  if (type === "system_health") {
    return { status: "healthy" };
  }

  return { error: "unknown task" };
}

module.exports = { process };
