require("dotenv").config({ path: "backend/.env" });

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { GoogleGenAI } = require("@google/genai");
const { google } = require("googleapis");
const multer = require("multer");

const app = express();
const PORT = Number(process.env.PORT || 3000);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 500 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only video files are allowed."));
    }
  }
});

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(helmet({
  crossOriginResourcePolicy: false
}));

app.use(rateLimit({
  windowMs: 60 * 1000,
  max: 60
}));

/* ========================================
   CONFIGURATION
======================================== */

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

/* ========================================
   TEMPORARY TOKEN STORAGE
   For local development/testing only.
======================================== */

let youtubeTokens = null;

/* ========================================
   HEALTH
======================================== */

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "Kali Command AI Backend",
    geminiConfigured: geminiConfigured(),
    googleOAuthConfigured: googleConfigured(),
    hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
    hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    hasGoogleRedirectUri: !!process.env.GOOGLE_REDIRECT_URI,
    youtubeConnected: Boolean(youtubeTokens)
  });
});

/* ========================================
   GEMINI AI
======================================== */

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

    const answer =
      response.text ||
      "The AI returned an empty response.";

    res.json({
      ok: true,
      answer
    });

  } catch (error) {

    console.error("Gemini error:", error);

    res.status(500).json({
      ok: false,
      error: error.message || "AI request failed."
    });

  }
});


/* ========================================
   OAUTH SAFE DIAGNOSTICS
======================================== */

app.get("/api/oauth/diagnostics", async (req, res) => {
  const clientId = (process.env.GOOGLE_CLIENT_ID || "").trim();
  const clientSecret = (process.env.GOOGLE_CLIENT_SECRET || "").trim();
  const redirectUri = (process.env.GOOGLE_REDIRECT_URI || "").trim();

  const problems = [];
  const warnings = [];

  if (!clientId) problems.push("GOOGLE_CLIENT_ID is missing");
  if (!clientSecret) problems.push("GOOGLE_CLIENT_SECRET is missing");
  if (!redirectUri) problems.push("GOOGLE_REDIRECT_URI is missing");

  if (clientId && !clientId.endsWith(".apps.googleusercontent.com")) {
    warnings.push("Client ID does not look like a standard Google OAuth Web Client ID");
  }

  if (redirectUri) {
    try {
      const u = new URL(redirectUri);

      if (u.protocol !== "https:" && u.hostname !== "localhost") {
        problems.push("Production redirect URI should use HTTPS");
      }

      if (u.pathname !== "/oauth2callback") {
        warnings.push("Redirect path is not /oauth2callback; verify it matches Google Cloud exactly");
      }
    } catch {
      problems.push("GOOGLE_REDIRECT_URI is not a valid URL");
    }
  }

  res.json({
    ok: problems.length === 0,
    configured: {
      clientIdPresent: Boolean(clientId),
      clientSecretPresent: Boolean(clientSecret),
      redirectUriPresent: Boolean(redirectUri)
    },
    clientIdPreview: clientId
      ? clientId.slice(0, 12) + "..." +
        clientId.slice(-28)
      : null,
    redirectUri,
    problems,
    warnings,
    nextStep:
      problems.length
        ? "Fix the configuration problems listed above."
        : "Configuration looks structurally valid. If Google still returns invalid_client, verify that CLIENT_ID and CLIENT_SECRET belong to the exact same OAuth client."
  });
});


/* ========================================
   YOUTUBE GOOGLE LOGIN
======================================== */

app.get("/auth/youtube", (req, res) => {

  if (!googleConfigured()) {
    return res.status(503).send(
      "Google OAuth is not configured."
    );
  }

  const oauth2Client = createOAuthClient();

  const scopes = [
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/youtube.upload"
  ];

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes
  });

  res.redirect(authUrl);
});

/* ========================================
   OAUTH CALLBACK
======================================== */

app.get("/oauth2callback", async (req, res) => {

  try {

    if (!googleConfigured()) {
      return res.status(503).send(
        "Google OAuth is not configured."
      );
    }

    const { code, error } = req.query;

    if (error) {
      return res.status(400).send(
        `Google authorization failed: ${error}`
      );
    }

    if (!code) {
      return res.status(400).send(
        "Authorization code missing."
      );
    }

    const oauth2Client = createOAuthClient();

    const { tokens } =
      await oauth2Client.getToken(code);

    youtubeTokens = tokens;

    res.send(`
      <html>
        <head>
          <meta name="viewport"
                content="width=device-width, initial-scale=1">
          <title>YouTube Connected</title>
        </head>

        <body style="
          font-family:Arial;
          background:#111;
          color:white;
          text-align:center;
          padding:40px;
        ">

          <h1>✅ YouTube Connected!</h1>

          <p>
            Authorization was successful.
          </p>

          <p>
            You can return to Kali Command AI.
          </p>

        </body>
      </html>
    `);

  } catch (error) {

    console.error("OAuth callback error:", error);

    res.status(500).send(
      "OAuth connection failed: " +
      error.message
    );

  }
});

/* ========================================
   CONNECTION STATUS
======================================== */

app.get("/api/youtube/status", (req, res) => {

  res.json({
    ok: true,
    googleOAuthConfigured: googleConfigured(),
    connected: Boolean(youtubeTokens)
  });

});

/* ========================================
   CHANNEL INFORMATION
======================================== */

app.get("/api/youtube/channel", async (req, res) => {

  try {

    if (!youtubeTokens) {
      return res.status(401).json({
        ok: false,
        error: "YouTube channel is not connected."
      });
    }

    const oauth2Client = createOAuthClient();

    oauth2Client.setCredentials(youtubeTokens);

    const youtube = google.youtube({
      version: "v3",
      auth: oauth2Client
    });

    const response = await youtube.channels.list({
      part: [
        "snippet",
        "statistics",
        "contentDetails"
      ],
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

        description:
          channel.snippet?.description,

        thumbnails:
          channel.snippet?.thumbnails,

        publishedAt:
          channel.snippet?.publishedAt,

        statistics:
          channel.statistics,

        uploadsPlaylist:
          channel.contentDetails
            ?.relatedPlaylists
            ?.uploads
      }
    });

  } catch (error) {

    console.error("YouTube channel error:", error);

    res.status(500).json({
      ok: false,
      error: error.message ||
        "Failed to load channel information."
    });

  }

});

/* ========================================
   DISCONNECT
======================================== */

app.post("/api/youtube/disconnect", (req, res) => {

  youtubeTokens = null;

  res.json({
    ok: true,
    message: "YouTube channel disconnected."
  });

});


/* ========================================
   AI BRAIN VIDEO UPLOAD
======================================== */

app.post("/api/brain/analyze", upload.single("video"), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        ok: false,
        error: "No video file was received."
      });
    }

    const file = req.file;

    const sizeMB = (
      file.size / (1024 * 1024)
    ).toFixed(2);

    const prompt = `
You are the AI Brain of a YouTube Command Center.

A user uploaded a video with these details:

Filename: ${file.originalname}
File type: ${file.mimetype}
File size: ${sizeMB} MB

Create a YouTube publishing strategy based on the available file metadata.

Return clearly labeled sections:

TITLE:
Provide one strong YouTube title.

DESCRIPTION:
Write an optimized YouTube description.

TAGS:
Provide relevant comma-separated tags.

CONTENT STRATEGY:
Briefly explain the likely content strategy.

IMPORTANT:
Do not claim you watched or visually analyzed the video unless actual video content was provided to you.
Base the result only on the available metadata.
`;

    let analysis = {
      title: "AI analysis ready",
      description:
        "Video received successfully. Connect Gemini AI for a generated publishing strategy.",
      tags: [],
      strategy:
        "File validation completed successfully."
    };

    if (geminiConfigured()) {

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt
      });

      analysis.raw =
        response.text ||
        "AI returned an empty response.";

    }

    res.json({
      ok: true,

      file: {
        name: file.originalname,
        type: file.mimetype,
        sizeBytes: file.size,
        sizeMB
      },

      analysis
    });

  } catch (error) {

    console.error("AI Brain upload error:", error);

    res.status(500).json({
      ok: false,
      error:
        error.message ||
        "Video upload analysis failed."
    });

  }
});


/* ========================================
   START SERVER
======================================== */

app.listen(PORT, "0.0.0.0", () => {

  console.log(
    `Kali Command AI backend running on port ${PORT}`
  );

  console.log(
    `Health: http://127.0.0.1:${PORT}/api/health`
  );

});
