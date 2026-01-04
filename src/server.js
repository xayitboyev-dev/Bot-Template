const express = require("express");
const cors = require("cors");
const bot = require("./core/bot");

const app = express();

// CORS middleware
app.use(cors());

// JSON parsing 
app.use(express.json());

// 🔥 Webhook endpoint
app.post("/webhook", (req, res) => {
  bot.handleUpdate(req.body, res);
  res.send({ ok: true });
});

module.exports = app;