require("dotenv").config();
const express = require("express");

const helmetConfig = require("../security/helmet");
const rateLimiter = require("../security/ratelimit");
const errorHandler = require("../security/errorHandler");
const authMiddleware = require("../security/authMiddleware");

const authRoutes = require("../auth/routes");
const ctfRoutes = require("../ctf/routes");

const idorChallenge = require("../challenges/idor/routes");
const sqliChallenge = require("../challenges/sqli/routes");
const phantom = require("../challenges/hard/phantom/routes");
require("../challenges/hard/phantom/autoWorker");
const echo = require("../challenges/hard/echo/routes");
const deadlock = require("../challenges/hard/deadlock/routes");
const blackmirror = require("../challenges/hard/blackmirror/routes");

const app = express();
const cors = require("cors");

app.use(express.json({ limit: "200kb" }));
app.use(express.urlencoded({ extended: false, limit: "200kb" }));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(helmetConfig);
app.use(rateLimiter);

app.use("/auth", authRoutes);
app.use("/api", ctfRoutes);

app.use("/labs/idor", authMiddleware, idorChallenge);
app.use("/labs/sqli", authMiddleware, sqliChallenge);
app.use("/labs/hard/phantom", authMiddleware, phantom);
app.use("/labs/hard/echo", authMiddleware, echo);
app.use("/labs/hard/deadlock", authMiddleware, deadlock);
app.use("/labs/hard/blackmirror", authMiddleware, blackmirror);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandler);

module.exports = app;
