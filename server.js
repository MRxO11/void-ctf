const app = require("./server/core/app");

const PORT = process.env.PORT || 5000;

const startBlackMirrorBot = require("./server/challenges/hard/blackmirror/adminBot");
startBlackMirrorBot();

const bmService = require("./server/challenges/hard/blackmirror/service");
bmService.reset().then(() => {
  console.log("[BLACKMIRROR] captures table reset");
});

app.listen(PORT, () => {
  console.log(`[VOID] Server running on port ${PORT}`);
});
