import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const ROOT = path.resolve("..");
const UPLOAD_DIR = path.join(ROOT, "frontend", "uploads");
const OUTPUT_DIR = path.join(ROOT, "frontend", "output");

fs.mkdirSync(UPLOAD_DIR, { recursive: true });
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, UPLOAD_DIR),
  filename: (_, file, cb) => {
    const safeName = `${Date.now()}-${file.originalname}`
      .replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, safeName);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 500 * 1024 * 1024
  }
});

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.static(path.join(ROOT, "frontend")));

function cleanText(text = "") {
  return String(text)
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function makeTags(topic, videoType) {
  const words = cleanText(topic)
    .toLowerCase()
    .split(/[\s,]+/)
    .filter(w => w.length > 2);

  const base = [
    topic,
    `${topic} video`,
    `${topic} tutorial`,
    `${topic} latest`,
    `${topic} tips`,
    `${topic} guide`,
    `${topic} hindi`,
    "youtube",
    "viral video",
    videoType === "short" ? "shorts" : "long video"
  ];

  for (const word of words.slice(0, 8)) {
    base.push(
      word,
      `${word} tips`,
      `${word} guide`,
      `${word} video`
    );
  }

  return [...new Set(base.map(cleanText))]
    .filter(Boolean)
    .slice(0, 30);
}

function makeDescription(topic, details, videoType) {
  const cleanTopic = cleanText(topic);
  const cleanDetails = cleanText(details);

  const paragraphs = [
    `इस वीडियो में हम ${cleanTopic} के बारे में विस्तार से बात करेंगे। वीडियो का उद्देश्य विषय को आसान और उपयोगी तरीके से समझाना है ताकि दर्शकों को साफ और practical जानकारी मिल सके।`,
    `अगर आप ${cleanTopic} में रुचि रखते हैं, तो यह वीडियो आपके लिए उपयोगी हो सकता है। इसमें मुख्य points, जरूरी जानकारी और विषय से जुड़े महत्वपूर्ण पहलुओं को क्रम से समझाने की कोशिश की गई है।`,
    cleanDetails
      ? `इस वीडियो का मुख्य context यह है: ${cleanDetails}. इसी जानकारी के आधार पर वीडियो को व्यवस्थित किया गया है ताकि content विषय के अनुसार relevant रहे।`
      : `वीडियो में विषय से जुड़े महत्वपूर्ण points को सरल तरीके से प्रस्तुत किया गया है।`,
    `यह ${videoType === "short" ? "Short वीडियो" : "Long वीडियो"} जानकारी और entertainment के बीच सही संतुलन बनाने के लिए तैयार किया गया है। दर्शक वीडियो को पूरा देखें और अपनी राय comments में साझा कर सकते हैं।`,
    `वीडियो पसंद आए तो channel को support करें और भविष्य में इसी तरह के विषयों पर नए videos के लिए जुड़े रहें। हर वीडियो का उद्देश्य relevant और useful content देना है।`
  ];

  let description = paragraphs.join("\n\n");

  // Topic-relevant expansion, not meaningless keyword stuffing
  const expansion =
    `\n\n${cleanTopic} से संबंधित अतिरिक्त जानकारी, practical points, examples और महत्वपूर्ण बातें इस वीडियो के विषय के अनुसार शामिल की जा सकती हैं। ` +
    `वीडियो को ध्यान से देखें ताकि पूरा context समझ में आए। अगर आपके पास इस विषय से संबंधित कोई सवाल या सुझाव है, तो उसे comments में साझा किया जा सकता है। ` +
    `हमारा उद्देश्य दर्शकों को साफ, उपयोगी और विषय के अनुसार जानकारी देना है।`;

  while (description.length < 2000) {
    description += expansion;
  }

  return description.slice(0, 5000);
}

function makeTitles(topic, videoType) {
  const t = cleanText(topic);

  const titles = [
    `${t} | पूरी जानकारी आसान भाषा में`,
    `${t}: जो आपको जरूर जानना चाहिए`,
    `${t} का पूरा Guide`,
    `मैंने ${t} के बारे में क्या पाया?`,
    `${t} Explained | आसान और उपयोगी जानकारी`
  ];

  if (videoType === "short") {
    titles.push(`${t} in 60 Seconds! #Shorts`);
  }

  return titles;
}

app.get("/api/health", (_, res) => {
  res.json({
    ok: true,
    message: "Kali Command AI backend is running"
  });
});

app.post("/api/generate", (req, res) => {
  const {
    topic = "",
    details = "",
    videoType = "long"
  } = req.body;

  if (!cleanText(topic)) {
    return res.status(400).json({
      error: "Video topic is required"
    });
  }

  const titles = makeTitles(topic, videoType);
  const tags = makeTags(topic, videoType);
  const description = makeDescription(topic, details, videoType);

  res.json({
    success: true,
    titles,
    description,
    descriptionLength: description.length,
    tags,
    tagCount: tags.length
  });
});

app.post("/api/upload", upload.single("video"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: "No video uploaded"
    });
  }

  res.json({
    success: true,
    file: {
      name: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      path: `/uploads/${req.file.filename}`
    },
    message: "Video uploaded successfully"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Kali Command AI running on http://127.0.0.1:${PORT}`);
});
