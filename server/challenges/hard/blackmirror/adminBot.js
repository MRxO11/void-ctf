const puppeteer = require("puppeteer");
const jwt = require("jsonwebtoken");

const TARGET =
  process.env.BACKEND_URL ||
  `http://localhost:${process.env.PORT || 5000}`;

async function startBot() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"]
  });

  const page = await browser.newPage();

  const token = jwt.sign(
    {
      id: "admin-bot",
      role: "admin",
      username: "blackmirror_bot"
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  await page.setExtraHTTPHeaders({
    "x-admin-bot": "blackmirror",
    "authorization": `Bearer ${token}`
  });

  console.log("[BLACKMIRROR] Admin bot started");

  let lastVisit = Date.now();

  setInterval(async () => {
    try {
      await page.goto(
        `${TARGET}/labs/hard/blackmirror/admin/reports?since=${lastVisit}`,
        { waitUntil: "networkidle2", timeout: 5000 }
      );

      lastVisit = Date.now();
    } catch (e) {
      console.log("[BLACKMIRROR BOT ERROR]", e.message);
    }
  }, 8000);
}

module.exports = startBot;
