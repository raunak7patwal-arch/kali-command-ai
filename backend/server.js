require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json({ limit: "1mb" }));

const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    error: "Too many requests. Please wait a minute."
  }
});

app.get("/", (req, res) => {
  res.json({
    ok: true,
    service: "Kali Command AI Backend",
    status: "online"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "Kali Command AI",
    aiConfigured: Boolean(process.env.AI_API_KEY)
  });
});

async function askGemini(prompt) {
  const key = process.env.AI_API_KEY;

  if (!key) {
    throw new Error("AI service is not configured");
  }

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
    encodeURIComponent(key);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error?.message || "AI request failed"
    );
  }

  const answer =
    data?.candidates?.[0]?.content?.parts
      ?.map(part => part.text || "")
      .join("\n") || "";

  if (!answer) {
    throw new Error("AI returned an empty response");
  }

  return answer;
}

app.post("/api/ai", aiLimiter, async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        ok: false,
        error: "A valid prompt is required"
      });
    }

    if (prompt.length > 12000) {
      return res.status(400).json({
        ok: false,
        error: "Prompt is too long"
      });
    }

    const answer = await askGemini(prompt.trim());

    res.json({
      ok: true,
      answer
    });

  } catch (error) {
    console.error("AI ERROR:", error.message);

    res.status(500).json({
      ok: false,
      error: "AI request failed"
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    ok: false,
    error: "Route not found"
  });
});

app.listen(PORT, () => {
  console.log(`Kali Command AI backend running on port ${PORT}`);
});
