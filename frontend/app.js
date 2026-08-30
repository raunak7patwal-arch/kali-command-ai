document.addEventListener("DOMContentLoaded", () => {

  const pages = document.querySelectorAll(".page");
  const navButtons = document.querySelectorAll(".nav-btn");
  const pageTitle = document.getElementById("pageTitle");
  const pageSubtitle = document.getElementById("pageSubtitle");

  const pageInfo = {
    dashboard: ["Command Center", "Your AI-powered YouTube workspace"],
    "ai-brain": ["AI Brain", "Autonomous video intelligence"],
    publisher: ["Auto Publisher", "Prepare authorized uploads"],
    titles: ["Title Lab", "Generate smarter video titles"],
    description: ["Description Lab", "Create optimized descriptions"],
    keywords: ["Keyword Lab", "Discover content opportunities"],
    doctor: ["Channel Doctor", "Channel health and improvements"],
    analytics: ["Analytics Lab", "Understand performance"],
    growth: ["Growth Engine", "Build your content strategy"],
    thumbnail: ["Thumbnail Lab", "Improve thumbnail strategy"],
    scheduler: ["Smart Scheduler", "Plan your uploads"],
    "video-lab": ["Video Lab", "Prepare your videos"],
    settings: ["Settings", "Configure your workspace"]
  };

  function goToPage(pageId) {
    const target = document.getElementById(pageId);
    if (!target) return;

    pages.forEach(page => page.classList.remove("active-page"));
    target.classList.add("active-page");

    navButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.page === pageId);
    });

    if (pageInfo[pageId]) {
      pageTitle.textContent = pageInfo[pageId][0];
      pageSubtitle.textContent = pageInfo[pageId][1];
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navButtons.forEach(button => {
    button.addEventListener("click", () => {
      goToPage(button.dataset.page);
    });
  });

  document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", () => {
      goToPage(button.dataset.go);
    });
  });


  // TITLE LAB
  const titleTopic = document.getElementById("titleTopic");
  const generateTitles = document.getElementById("generateTitles");
  const titleResults = document.getElementById("titleResults");

  if (generateTitles) {
    generateTitles.addEventListener("click", () => {

      const topic = titleTopic.value.trim();

      if (!topic) {
        titleResults.innerHTML =
          "<p>⚠️ Please describe your video topic first.</p>";
        return;
      }

      const titles = [
        `🔥 ${topic} – What You Need to Know!`,
        `I Tried ${topic}... Here's What Happened 😱`,
        `${topic}: The Complete Guide for Beginners`,
        `Top 10 Things You Didn't Know About ${topic}`,
        `Is ${topic} Actually Worth It? 🤯`,
        `The Truth About ${topic} Nobody Tells You`,
        `${topic} Explained in Simple Words`,
        `Watch This Before You Try ${topic}! ⚠️`
      ];

      titleResults.innerHTML = `
        <h3>✨ Generated Title Ideas</h3>
        <div class="title-list">
          ${titles.map((title, index) =>
            `<button class="generated-title" data-title="${encodeURIComponent(title)}">
              ${index + 1}. ${title}
            </button>`
          ).join("")}
        </div>
        <p class="copy-hint">Tap a title to copy it.</p>
      `;

      document.querySelectorAll(".generated-title").forEach(button => {
        button.addEventListener("click", async () => {
          const text = decodeURIComponent(button.dataset.title);

          try {
            await navigator.clipboard.writeText(text);
            button.textContent = "✅ Copied!";
            setTimeout(() => button.textContent = text, 1200);
          } catch {
            alert(text);
          }
        });
      });
    });
  }


  // AI BRAIN - SAFE LOCAL DEMO
  const brainVideo = document.getElementById("brainVideo");
  const startBrain = document.getElementById("startBrain");
  const brainResults = document.getElementById("brainResults");

  if (startBrain) {
    startBrain.addEventListener("click", () => {

      if (!brainVideo.files || !brainVideo.files.length) {
        brainResults.innerHTML =
          "<p>⚠️ Please select a video first.</p>";
        return;
      }

      const file = brainVideo.files[0];

      brainResults.innerHTML = `
        <h3>🧠 Analysis Started</h3>
        <p><strong>Video:</strong> ${file.name}</p>
        <p><strong>Size:</strong> ${(file.size / (1024 * 1024)).toFixed(2)} MB</p>

        <div class="analysis-status">
          🎬 Video selected successfully<br>
          🧠 AI analysis engine ready<br>
          ✨ Publishing strategy will require an AI backend/API connection
        </div>
      `;
    });
  }


  // CONNECT CHANNEL
  const connectChannel = document.getElementById("connectChannel");

  if (connectChannel) {
    connectChannel.addEventListener("click", () => {
      alert(
        "YouTube connection is not configured yet. " +
        "We will add secure Google OAuth before connecting any channel."
      );
    });
  }


  // Basic local security behavior
  window.addEventListener("error", () => {
    console.warn("Application error handled safely.");
  });

});

/* ===== EXTRA YOUTUBE TOOLS ===== */
document.addEventListener("DOMContentLoaded", () => {

  function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  function setResult(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  /* DESCRIPTION LAB */
  const generateDescription = document.getElementById("generateDescription");

  if (generateDescription) {
    generateDescription.addEventListener("click", () => {
      const topic = getValue("descriptionTopic");

      if (!topic) {
        setResult("descriptionResults",
          "<p>⚠️ पहले अपने वीडियो का topic लिखो।</p>");
        return;
      }

      setResult("descriptionResults", `
        <h3>📝 Optimized Description</h3>
        <p><strong>${topic}</strong></p>
        <p>इस वीडियो में हम ${topic} के बारे में आसान और interesting तरीके से जानेंगे। वीडियो को अंत तक देखें और अपने विचार comments में बताएं!</p>
        <p>👍 Like करें | 💬 Comment करें | 🔔 Subscribe करें</p>
        <p>#YouTube #${topic.replace(/\s+/g, "")} #Trending</p>
      `);
    });
  }

  /* KEYWORD LAB */
  const generateKeywords = document.getElementById("generateKeywords");

  if (generateKeywords) {
    generateKeywords.addEventListener("click", () => {
      const topic = getValue("keywordTopic");

      if (!topic) {
        setResult("keywordResults",
          "<p>⚠️ पहले अपना वीडियो topic लिखो।</p>");
        return;
      }

      const words = topic
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);

      const keywords = [
        topic,
        `${topic} tutorial`,
        `${topic} explained`,
        `${topic} hindi`,
        `best ${topic}`,
        `${topic} tips`,
        `${topic} guide`,
        ...words
      ];

      const unique = [...new Set(keywords)];

      setResult("keywordResults", `
        <h3>🏷️ Keyword Ideas</h3>
        <p>${unique.map(k => `#${k.replace(/\s+/g, "")}`).join(" ")}</p>
        <p><strong>SEO Keywords:</strong></p>
        <p>${unique.join(", ")}</p>
      `);
    });
  }

  /* CHANNEL DOCTOR */
  const runDoctor = document.getElementById("runDoctor");

  if (runDoctor) {
    runDoctor.addEventListener("click", () => {
      setResult("doctorResults", `
        <h3>📺 Channel Health Check</h3>
        <p>✅ Check your thumbnail CTR</p>
        <p>✅ Improve your first 30 seconds</p>
        <p>✅ Use searchable titles</p>
        <p>✅ Add relevant keywords naturally</p>
        <p>✅ Upload consistently</p>
        <p>💡 Tip: Real channel analytics require YouTube API connection.</p>
      `);
    });
  }

  /* GROWTH ENGINE */
  const generateGrowth = document.getElementById("generateGrowth");

  if (generateGrowth) {
    generateGrowth.addEventListener("click", () => {
      setResult("growthResults", `
        <h3>📈 Growth Strategy</h3>
        <ol>
          <li>Choose one clear content niche.</li>
          <li>Create searchable + clickable titles.</li>
          <li>Make thumbnails easy to understand.</li>
          <li>Hook viewers in the first 30 seconds.</li>
          <li>Post consistently.</li>
          <li>Study retention and click-through rate.</li>
          <li>Repeat formats that genuinely perform well.</li>
        </ol>
      `);
    });
  }

  /* THUMBNAIL LAB */
  const generateThumbnail = document.getElementById("generateThumbnail");

  if (generateThumbnail) {
    generateThumbnail.addEventListener("click", () => {
      setResult("thumbnailResults", `
        <h3>🖼️ Thumbnail Plan</h3>
        <p><strong>1.</strong> Use one clear main subject.</p>
        <p><strong>2.</strong> Keep text short: 2–4 words.</p>
        <p><strong>3.</strong> Make the subject easy to recognize.</p>
        <p><strong>4.</strong> Avoid too many small details.</p>
        <p><strong>5.</strong> Make the thumbnail match the video title.</p>
      `);
    });
  }

  /* SMART SCHEDULER */
  const saveSchedule = document.getElementById("saveSchedule");

  if (saveSchedule) {
    saveSchedule.addEventListener("click", () => {

      const scheduleData = {
        savedAt: new Date().toLocaleString(),
        message: "Upload schedule saved locally"
      };

      localStorage.setItem(
        "kaliCommandAISchedule",
        JSON.stringify(scheduleData)
      );

      setResult("scheduleResults", `
        <h3>⏰ Schedule Saved</h3>
        <p>✅ आपकी schedule information इस device पर save कर दी गई है।</p>
      `);
    });
  }

  /* VIDEO LAB */
  const prepareVideo = document.getElementById("prepareVideo");

  if (prepareVideo) {
    prepareVideo.addEventListener("click", () => {
      setResult("videoResults", `
        <h3>🎥 Video Preparation Plan</h3>
        <ol>
          <li>Choose your video topic.</li>
          <li>Create a strong title.</li>
          <li>Prepare an attractive thumbnail.</li>
          <li>Write a clear description.</li>
          <li>Add relevant keywords.</li>
          <li>Check the first 30 seconds.</li>
          <li>Review everything before publishing.</li>
        </ol>
      `);
    });
  }

});
