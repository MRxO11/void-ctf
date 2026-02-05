const service = require("./service");
const worker = require("./worker");

async function run() {
  try {
    const pending = await service.getPending();

    for (let r of pending) {
      const result = await worker.process(r);

      await service.saveResult(r.id, result);
      await service.closeRequest(r.id);
    }

  } catch (e) {
    console.error("[PHANTOM WORKER]", e.message);
  }
}

setInterval(run, 15000);

console.log("[PHANTOM] internal worker started");
