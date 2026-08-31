require("dotenv").config({ path: "backend/.env" });

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const multer = require("multer");
const { GoogleGenAI } = require("@google/genai");
const { google } = require("googleapis");
const { Pool } = require("pg");

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(rateLimit({ windowMs: 60 * 1000, max: 60 }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 500 * 1024 * 1024
  }
});

function geminiConfigured() {
  return Boolean(process.env.GEMINI_API_KEY);
}

function googleConfigured() {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_REDIRECT_URI
  );
}

function createOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
}

/* Temporary connection for current deployment.
   Persistent storage will be added separately. */
/* ========================================
   PERSISTENT YOUTUBE LOGIN STORAGE
======================================== */

let youtubeTokens = null;

const DATABASE_URL = (process.env.DATABASE_URL || "").trim();

let db = null;

if (DATABASE_URL) {
  db = new Pool({
    connectionString: DATABASE_URL,
    ssl: process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false
  });
}

async function initializeDatabase() {
  if (!db) {
    console.log("Persistent database not configured.");
    return;
  }

  await db.query(`
    CREATE TABLE IF NOT EXISTS youtube_connections (
      id INTEGER PRIMARY KEY,
      tokens JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  const result = await db.query(
    "SELECT tokens FROM youtube_connections WHERE id = 1"
  );

  if (result.rows.length > 0) {
    youtubeTokens = result.rows[0].tokens;
    console.log("✓ Persistent YouTube login restored");
  } else {
    console.log("No saved YouTube login found");
  }
}

async function saveYouTubeTokens(tokens) {

  youtubeTokens = tokens;

  if (!db) {
    console.log("Temporary YouTube login active (DATABASE_URL not configured).");
    return;
  }

  await db.query(
    `
    INSERT INTO youtube_connections
      (id, tokens, updated_at)
    VALUES
      (1, $1::jsonb, NOW())
    ON CONFLICT (id)
    DO UPDATE SET
      tokens = EXCLUDED.tokens,
      updated_at = NOW()
    `,
    [JSON.stringify(tokens)]
  );

  console.log("✓ YouTube login saved permanently");

}

async function deleteYouTubeTokens() {
  youtubeTokens = null;

  if (!db) return;

  await db.query(
    "DELETE FROM youtube_connections WHERE id = 1"
  );

  console.log("✓ Persistent YouTube login deleted");
}



function requireYouTubeConnection(req, res) {
  if (!youtubeTokens) {
    res.status(401).json({
      ok: false,
      error: "YouTube channel is not connected."
    });
    return false;
  }
  return true;
}

function getYouTubeClient() {
  const oauth2Client = createOAuthClient();
  oauth2Client.setCredentials(youtubeTokens);

  return {
    oauth2Client,
    youtube: google.youtube({
      version: "v3",
      auth: oauth2Client
    })
  };
}

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "Kali Command AI Backend",
    geminiConfigured: geminiConfigured(),
    googleOAuthConfigured: googleConfigured(),
    youtubeConnected: Boolean(youtubeTokens)
  });
});

app.post("/api/ai", async (req, res) => {
  try {
    const { prompt } = req.body || {};

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        ok: false,
        error: "Please provide a valid prompt."
      });
    }

    if (!geminiConfigured()) {
      return res.status(503).json({
        ok: false,
        error: "Gemini API key is not configured."
      });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt
    });

    res.json({
      ok: true,
      answer: response.text || "AI returned an empty response."
    });

  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({
      ok: false,
      error: error.message || "AI request failed."
    });
  }
});

app.get("/api/oauth/diagnostics", (req, res) => {
  const clientId = (process.env.GOOGLE_CLIENT_ID || "").trim();
  const clientSecret = (process.env.GOOGLE_CLIENT_SECRET || "").trim();
  const redirectUri = (process.env.GOOGLE_REDIRECT_URI || "").trim();

  const problems = [];

  if (!clientId) problems.push("GOOGLE_CLIENT_ID is missing");
  if (!clientSecret) problems.push("GOOGLE_CLIENT_SECRET is missing");
  if (!redirectUri) problems.push("GOOGLE_REDIRECT_URI is missing");

  res.json({
    ok: problems.length === 0,
    configured: {
      clientIdPresent: Boolean(clientId),
      clientSecretPresent: Boolean(clientSecret),
      redirectUriPresent: Boolean(redirectUri)
    },
    redirectUri,
    problems
  });
});

/* YouTube OAuth */

app.get("/auth/youtube", (req, res) => {
  if (!googleConfigured()) {
    return res.status(503).send("Google OAuth is not configured.");
  }

  const oauth2Client = createOAuthClient();

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/youtube.readonly",
      "https://www.googleapis.com/auth/youtube.upload"
    ]
  });

  res.redirect(authUrl);
});

app.get("/oauth2callback", async (req, res) => {
  try {
    const { code, error } = req.query;

    if (error) {
      return res.status(400).send(
        "Google authorization failed: " + error
      );
    }

    if (!code) {
      return res.status(400).send("Authorization code missing.");
    }

    const oauth2Client = createOAuthClient();
    const { tokens } = await oauth2Client.getToken(code);

    await saveYouTubeTokens(tokens);

    res.send(`
      <!doctype html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>YouTube Connected</title>
      </head>
      <body style="font-family:Arial;background:#111;color:white;text-align:center;padding:40px">
        <h1>✅ YouTube Connected!</h1>
        <p>You can safely return to Kali Command AI.</p>
      </body>
      </html>
    `);

  } catch (error) {
    console.error("OAuth callback error:", error);
    res.status(500).send(
      "OAuth connection failed: " + error.message
    );
  }
});

app.get("/api/youtube/status", (req, res) => {
  res.json({
    ok: true,
    googleOAuthConfigured: googleConfigured(),
    connected: Boolean(youtubeTokens)
  });
});

app.get("/api/youtube/channel", async (req, res) => {
  try {
    if (!requireYouTubeConnection(req, res)) return;

    const { youtube } = getYouTubeClient();

    const response = await youtube.channels.list({
      part: ["snippet", "statistics", "contentDetails"],
      mine: true
    });

    const channel = response.data.items?.[0];

    if (!channel) {
      return res.status(404).json({
        ok: false,
        error: "No YouTube channel found."
      });
    }

    res.json({
      ok: true,
      channel: {
        id: channel.id,
        title: channel.snippet?.title,
        description: channel.snippet?.description,
        thumbnails: channel.snippet?.thumbnails,
        statistics: channel.statistics
      }
    });

  } catch (error) {
    console.error("Channel error:", error);
    res.status(500).json({
      ok: false,
      error: error.message || "Failed to load channel."
    });
  }
});

app.post("/api/youtube/disconnect", (req, res) => {
  youtubeTokens = null;

  res.json({
    ok: true,
    message: "YouTube disconnected."
  });
});

/* AI BRAIN ANALYSIS */

app.post(
  "/api/brain/analyze",
  upload.single("video"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          ok: false,
          error: "No video file received."
        });
      }

      const file = req.file;

      if (!file.mimetype.startsWith("video/")) {
        return res.status(400).json({
          ok: false,
          error: "Please upload a valid video file."
        });
      }

      const sizeMB = (
        file.size / 1024 / 1024
      ).toFixed(2);

      let title = file.originalname
        .replace(/\.[^.]+$/, "")
        .replace(/[_-]+/g, " ");

      let description =
        "Video prepared with Kali Command AI.";

      let tags = [];

      let strategy =
        "Video file validated successfully.";

      let raw = "";

      if (geminiConfigured()) {

        const prompt = `
You are an expert YouTube publishing assistant.

The user uploaded a video file.

Filename: ${file.originalname}
Type: ${file.mimetype}
Size: ${sizeMB} MB

You do NOT have access to the actual visual content.

Based only on the filename and metadata, return EXACTLY this format:

TITLE: one compelling title

DESCRIPTION:
A useful YouTube description.

TAGS:
tag1, tag2, tag3, tag4, tag5

STRATEGY:
A short publishing recommendation.

Do not claim you watched the video.
`;

        const ai = new GoogleGenAI({
          apiKey: process.env.GEMINI_API_KEY
        });

        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt
        });

        raw = response.text || "";

        const titleMatch =
          raw.match(/TITLE:\s*([^\n]+)/i);

        const descriptionMatch =
          raw.match(
            /DESCRIPTION:\s*([\s\S]*?)(?=\nTAGS:|\nSTRATEGY:|$)/i
          );

        const tagsMatch =
          raw.match(
            /TAGS:\s*([\s\S]*?)(?=\nSTRATEGY:|$)/i
          );

        const strategyMatch =
          raw.match(
            /STRATEGY:\s*([\s\S]*)$/i
          );

        if (titleMatch?.[1]) {
          title = titleMatch[1].trim();
        }

        if (descriptionMatch?.[1]) {
          description =
            descriptionMatch[1].trim();
        }

        if (tagsMatch?.[1]) {
          tags = tagsMatch[1]
            .split(",")
            .map(x => x.trim())
            .filter(Boolean)
            .slice(0, 30);
        }

        if (strategyMatch?.[1]) {
          strategy =
            strategyMatch[1].trim();
        }
      }

      res.json({
        ok: true,
        file: {
          name: file.originalname,
          type: file.mimetype,
          sizeBytes: file.size,
          sizeMB
        },
        analysis: {
          title,
          description,
          tags,
          strategy,
          raw
        }
      });

    } catch (error) {
      console.error("AI Brain error:", error);

      res.status(500).json({
        ok: false,
        error: error.message ||
          "Video analysis failed."
      });
    }
  }
);


/* ========================================
   YOUTUBE VIDEO PUBLISH
======================================== */

app.post(
  "/api/youtube/publish",
  upload.single("video"),
  async (req, res) => {

    try {

      if (!requireYouTubeConnection(req, res)) return;

      if (!req.file) {
        return res.status(400).json({
          ok: false,
          error: "No video file received."
        });
      }

      const file = req.file;

      if (!file.mimetype.startsWith("video/")) {
        return res.status(400).json({
          ok: false,
          error: "Only video files can be published."
        });
      }

      const title =
        String(req.body.title || "").trim();

      const description =
        String(req.body.description || "");

      let tags = [];

      try {
        tags = JSON.parse(req.body.tags || "[]");

        if (!Array.isArray(tags)) {
          tags = [];
        }

      } catch {
        tags = [];
      }

      tags = tags
        .map(tag => String(tag).trim())
        .filter(Boolean)
        .slice(0, 30);

      if (!title) {
        return res.status(400).json({
          ok: false,
          error: "Video title is required."
        });
      }

      if (title.length > 100) {
        return res.status(400).json({
          ok: false,
          error: "YouTube title cannot exceed 100 characters."
        });
      }

      if (description.length > 5000) {
        return res.status(400).json({
          ok: false,
          error: "YouTube description cannot exceed 5000 characters."
        });
      }

      const { youtube } = getYouTubeClient();

      console.log(
        "Starting YouTube upload:",
        file.originalname
      );

      const response = await youtube.videos.insert({
        part: [
          "snippet",
          "status"
        ],
        requestBody: {
          snippet: {
            title,
            description,
            tags
          },
          status: {
            privacyStatus: "private",
            selfDeclaredMadeForKids: false
          }
        },
        media: {
          mimeType: file.mimetype,
          body: require("stream").Readable.from(
            file.buffer
          )
        }
      });

      console.log(
        "YouTube upload completed:",
        response.data.id
      );

      res.json({
        ok: true,
        message: "Video uploaded successfully to YouTube.",
        video: {
          id: response.data.id,
          title: response.data.snippet?.title || title,
          privacyStatus:
            response.data.status?.privacyStatus ||
            "private"
        }
      });

    } catch (error) {

      console.error(
        "YouTube publish error:",
        error
      );

      res.status(500).json({
        ok: false,
        error:
          error.message ||
          "YouTube publishing failed."
      });

    }

  }
);


/* SERVER START */

async function startServer() {

  try {
    await initializeDatabase();
  } catch (error) {
    console.error(
      "Database initialization failed:",
      error.message
    );
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `Kali Command AI backend running on port ${PORT}`
    );

    console.log(
      `Persistent storage: ${Boolean(db)}`
    );
  });
}

startServer();
