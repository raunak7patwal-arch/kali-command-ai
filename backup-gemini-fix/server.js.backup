const http = require("http");
const fs = require("fs");

const PORT = process.env.PORT || 3000;

function loadEnv() {
  const path = __dirname + "/.env";
  if (!fs.existsSync(path)) return;

  for (const line of fs.readFileSync(path, "utf8").split("\n")) {
    const i = line.indexOf("=");
    if (i > 0) {
      const key = line.slice(0, i).trim();
      const value = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
      process.env[key] = value;
    }
  }
}

loadEnv();

async function askGemini(prompt) {
  const key = process.env.AI_API_KEY;

  if (!key) {
    throw new Error("AI_API_KEY is not configured");
  }

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
    encodeURIComponent(key);

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "Gemini API request failed");
  }

  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && req.url === "/api/health") {
    return res.end(JSON.stringify({
      ok: true,
      service: "Kali Command AI"
    }));
  }

  if (req.method === "POST" && req.url === "/api/ai") {
    let body = "";

    req.on("data", chunk => body += chunk);

    req.on("end", async () => {
      try {
        const { prompt } = JSON.parse(body);

        if (!prompt || typeof prompt !== "string") {
          throw new Error("Prompt is required");
        }

        const answer = await askGemini(prompt);

        res.end(JSON.stringify({
          ok: true,
          answer
        }));
      } catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({
          ok: false,
          error: error.message
        }));
      }
    });

    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, () => {
  console.log(`Kali Command AI backend running on port ${PORT}`);
});
