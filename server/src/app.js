const path = require("node:path");
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
require("./utils/initDb")();

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/quizzes", require("./routes/quizRoutes"));
app.use("/api/attempts", require("./routes/attemptRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

const webDir = path.resolve(__dirname, process.env.WEB_DIR || "../../web");
app.use(express.static(webDir));
app.get("*path", (_req, res) => res.sendFile(path.join(webDir, "index.html")));

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: "Có lỗi xảy ra trên máy chủ." });
});

module.exports = app;
