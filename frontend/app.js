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


  // DESCRIPTION LAB
  const descriptionTopic = document.getElementById("descriptionTopic");
  const generateDescription = document.getElementById("generateDescription");
  const descriptionResults = document.getElementById("descriptionResults");

  if (generateDescription) {
    generateDescription.addEventListener("click", () => {
      const topic = descriptionTopic.value.trim();

      if (!topic) {
        descriptionResults.innerHTML = "<p>⚠️ Please enter your video topic first.</p>";
        return;
      }

      const description = `🔥 Welcome to this video about ${topic}!

In this video, you'll discover useful information, important points, and interesting insights about ${topic}.

📌 What you'll learn:
• The basics of ${topic}
• Important tips and key information
• Things beginners should know
• Useful ideas you can apply

👍 If you enjoyed this video, don't forget to Like, Share and Subscribe for more amazing content!

💬 Comment below and tell us what you think about ${topic}.

#YouTube #${topic.replace(/\s+/g, '')} #Trending`;

      descriptionResults.innerHTML = `
        <h3>📝 Generated Description</h3>
        <textarea class="generated-output" readonly>${description}</textarea>
        <button class="primary-btn copy-output">📋 Copy Description</button>
      `;

      descriptionResults.querySelector(".copy-output").addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(description);
          descriptionResults.querySelector(".copy-output").textContent = "✅ Copied!";
        } catch {
          alert(description);
        }
      });
    });
  }


  // KEYWORD LAB
  const keywordTopic = document.getElementById("keywordTopic");
  const generateKeywords = document.getElementById("generateKeywords");
  const keywordResults = document.getElementById("keywordResults");

  if (generateKeywords) {
    generateKeywords.addEventListener("click", () => {
      const topic = keywordTopic.value.trim();

      if (!topic) {
        keywordResults.innerHTML = "<p>⚠️ Please enter a topic first.</p>";
        return;
      }

      const clean = topic.toLowerCase();

      const keywords = [
        topic,
        `${topic} tutorial`,
        `${topic} explained`,
        `${topic} for beginners`,
        `best ${topic}`,
        `${topic} tips`,
        `${topic} guide`,
        `${topic} 2026`,
        `how to ${clean}`,
        `${topic} facts`,
        `${topic} tricks`,
        `${topic} viral video`
      ];

      const hashtags = [
        `#${topic.replace(/\s+/g, '')}`,
        "#YouTube",
        "#Trending",
        "#Viral",
        "#2026"
      ];

      keywordResults.innerHTML = `
        <h3>🏷️ Keyword Strategy</h3>
        <div class="keyword-list">
          ${keywords.map(k => `<span class="keyword-tag">${k}</span>`).join("")}
        </div>

        <h3>🔥 Suggested Hashtags</h3>
        <div class="keyword-list">
          ${hashtags.map(h => `<span class="keyword-tag">${h}</span>`).join("")}
        </div>

        <button class="primary-btn copy-keywords">📋 Copy All</button>
      `;

      keywordResults.querySelector(".copy-keywords").addEventListener("click", async () => {
        const all = [...keywords, ...hashtags].join(", ");

        try {
          await navigator.clipboard.writeText(all);
          keywordResults.querySelector(".copy-keywords").textContent = "✅ Copied!";
        } catch {
          alert(all);
        }
      });
    });
  }



  // GROWTH ENGINE
  const growthTopic = document.getElementById("growthTopic");
  const generateGrowth = document.getElementById("generateGrowth");
  const growthResults = document.getElementById("growthResults");

  if (generateGrowth) {
    generateGrowth.addEventListener("click", () => {
      const topic = growthTopic.value.trim();

      if (!topic) {
        growthResults.innerHTML =
          "<p>⚠️ Enter a channel or video topic first.</p>";
        return;
      }

      const strategy = [
        ["🎯 Niche", `Focus your content around ${topic} and keep the audience clear.`],
        ["📅 Consistency", "Publish on a realistic schedule and maintain a consistent format."],
        ["✨ Content", "Create a mix of searchable, educational and highly engaging videos."],
        ["🪝 Hook", "Make the first few seconds immediately explain why viewers should continue."],
        ["📝 Titles", "Use clear titles that accurately describe the video's main benefit."],
        ["🖼️ Thumbnail", "Use one strong visual idea with short, readable text."],
        ["📊 Analytics", "Review retention, CTR and watch time to decide what to improve."],
        ["🔄 Experiment", "Test different hooks, topics and formats instead of changing everything at once."]
      ];

      growthResults.innerHTML = `
        <h3>📈 Growth Strategy for ${topic}</h3>
        <div class="growth-list">
          ${strategy.map(([title, text]) => `
            <div class="growth-item">
              <strong>${title}</strong>
              <p>${text}</p>
            </div>
          `).join("")}
        </div>
      `;
    });
  }



  // CHANNEL DOCTOR
  const doctorTopic = document.getElementById("doctorTopic");
  const runDoctor = document.getElementById("runDoctor");
  const doctorResults = document.getElementById("doctorResults");

  if (runDoctor) {
    runDoctor.addEventListener("click", () => {
      const topic = doctorTopic.value.trim();

      if (!topic) {
        doctorResults.innerHTML =
          "<p>⚠️ Enter your channel topic first.</p>";
        return;
      }

      const checks = [
        ["🎯 Niche clarity", "Make sure your channel has a clear audience and topic."],
        ["📝 Titles", "Keep titles specific, readable and relevant to the actual video."],
        ["🖼️ Thumbnails", "Use a clear focal point and avoid overcrowding the design."],
        ["🪝 Viewer hook", "Make the opening immediately deliver context or value."],
        ["📅 Upload consistency", "Use a schedule you can realistically maintain."],
        ["📊 Analytics", "Track retention, CTR and watch time before making major changes."],
        ["💬 Engagement", "Give viewers a natural reason to comment or return."]
      ];

      doctorResults.innerHTML = `
        <h3>📺 Channel Check: ${topic}</h3>
        ${checks.map(([title, text]) => `
          <div class="growth-item">
            <strong>${title}</strong>
            <p>${text}</p>
          </div>
        `).join("")}
      `;
    });
  }



  // THUMBNAIL LAB
  const thumbnailTopic = document.getElementById("thumbnailTopic");
  const generateThumbnail = document.getElementById("generateThumbnail");
  const thumbnailResults = document.getElementById("thumbnailResults");

  if (generateThumbnail) {
    generateThumbnail.addEventListener("click", () => {
      const topic = thumbnailTopic.value.trim();

      if (!topic) {
        thumbnailResults.innerHTML =
          "<p>⚠️ Enter your video topic first.</p>";
        return;
      }

      thumbnailResults.innerHTML = `
        <h3>🖼️ Thumbnail Plan</h3>

        <div class="growth-item">
          <strong>🎯 Main Visual</strong>
          <p>Use one strong image or subject that immediately represents ${topic}.</p>
        </div>

        <div class="growth-item">
          <strong>✍️ Text Idea</strong>
          <p>Keep the thumbnail text very short, bold and easy to understand.</p>
        </div>

        <div class="growth-item">
          <strong>👀 Curiosity</strong>
          <p>Show a clear result, contrast or interesting moment without misleading the viewer.</p>
        </div>

        <div class="growth-item">
          <strong>📱 Mobile Check</strong>
          <p>Preview the thumbnail at a small size to make sure the main subject remains visible.</p>
        </div>
      `;
    });
  }



  // SMART SCHEDULER
  const scheduleTitle = document.getElementById("scheduleTitle");
  const scheduleDate = document.getElementById("scheduleDate");
  const saveSchedule = document.getElementById("saveSchedule");
  const scheduleResults = document.getElementById("scheduleResults");

  if (saveSchedule) {
    saveSchedule.addEventListener("click", () => {
      const title = scheduleTitle.value.trim();
      const date = scheduleDate.value;

      if (!title || !date) {
        scheduleResults.innerHTML =
          "<p>⚠️ Enter a video title and date/time.</p>";
        return;
      }

      const schedules = JSON.parse(
        localStorage.getItem("kaliSchedules") || "[]"
      );

      schedules.push({ title, date });

      localStorage.setItem(
        "kaliSchedules",
        JSON.stringify(schedules)
      );

      scheduleResults.innerHTML = `
        <h3>✅ Schedule Saved</h3>
        <div class="growth-item">
          <strong>🎬 ${title}</strong>
          <p>Planned for: ${new Date(date).toLocaleString()}</p>
          <small>Note: this saves the plan locally. YouTube publishing is not connected yet.</small>
        </div>
      `;

      scheduleTitle.value = "";
    });
  }



  // VIDEO LAB
  const videoTitle = document.getElementById("videoTitle");
  const videoNotes = document.getElementById("videoNotes");
  const prepareVideo = document.getElementById("prepareVideo");
  const videoResults = document.getElementById("videoResults");

  if (prepareVideo) {
    prepareVideo.addEventListener("click", () => {
      const title = videoTitle.value.trim();
      const notes = videoNotes.value.trim();

      if (!title) {
        videoResults.innerHTML =
          "<p>⚠️ Enter a video title first.</p>";
        return;
      }

      videoResults.innerHTML = `
        <h3>🎥 Video Preparation Plan</h3>

        <div class="growth-item">
          <strong>🎬 Title</strong>
          <p>${title}</p>
        </div>

        <div class="growth-item">
          <strong>📝 Content Check</strong>
          <p>${notes || "No notes provided. Add your main points before publishing."}</p>
        </div>

        <div class="growth-item">
          <strong>🪝 Opening Hook</strong>
          <p>Prepare a clear opening that immediately tells viewers what they will get from the video.</p>
        </div>

        <div class="growth-item">
          <strong>📱 Mobile Review</strong>
          <p>Check the final video, captions and thumbnail on a phone before publishing.</p>
        </div>

        <div class="growth-item">
          <strong>✅ Final Checklist</strong>
          <p>Review title, description, keywords, thumbnail, visibility and schedule before publishing.</p>
        </div>
      `;
    });
  }


});