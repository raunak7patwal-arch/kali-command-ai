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
  const titleTopic = document.getElementById("titleTopic");
  const titleResults = document.getElementById("titleResults");

  if (generateTitles) {
    generateTitles.addEventListener("click", async () => {
      const topic = titleTopic.value.trim();

      if (!topic) {
        titleResults.innerHTML = "<p>⚠️ Enter your video topic first.</p>";
        return;
      }

      generateTitles.disabled = true;
      generateTitles.textContent = "🧠 Generating...";

      const answer = await askAI(
        `Generate 10 YouTube title ideas for this topic: ${topic}.
Make them engaging, accurate, and suitable for YouTube.
Return only a numbered list.`
      );

      titleResults.innerHTML = `
        <h3>✨ AI Title Suggestions</h3>
        <div class="growth-item"><p>${answer.replace(/\n/g, "<br>")}</p></div>
      `;

      generateTitles.disabled = false;
      generateTitles.textContent = "✨ Generate Titles";
    });
  }

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


  
  // REAL AI DESCRIPTION
  const generateDescription = document.getElementById("generateDescription");
  const descriptionTopic = document.getElementById("descriptionTopic");
  const descriptionResults = document.getElementById("descriptionResults");

  if (generateDescription) {
    generateDescription.addEventListener("click", async () => {
      const topic = descriptionTopic.value.trim();

      if (!topic) {
        descriptionResults.innerHTML = "<p>⚠️ Enter your video topic first.</p>";
        return;
      }

      generateDescription.disabled = true;
      generateDescription.textContent = "🧠 Generating...";

      const answer = await askAI(
        `Write an engaging, accurate YouTube description for this video topic:
${topic}

Include a short hook, useful description, natural keywords, and a simple call to action. Do not make false claims.`
      );

      descriptionResults.innerHTML = `
        <h3>📝 AI Description</h3>
        <div class="growth-item"><p>${answer.replace(/\n/g, "<br>")}</p></div>
      `;

      generateDescription.disabled = false;
      generateDescription.textContent = "📝 Generate Description";
    });
  }

  // REAL AI KEYWORDS
  const generateKeywords = document.getElementById("generateKeywords");
  const keywordTopic = document.getElementById("keywordTopic");
  const keywordResults = document.getElementById("keywordResults");

  if (generateKeywords) {
    generateKeywords.addEventListener("click", async () => {
      const topic = keywordTopic.value.trim();

      if (!topic) {
        keywordResults.innerHTML = "<p>⚠️ Enter your video topic first.</p>";
        return;
      }

      generateKeywords.disabled = true;
      generateKeywords.textContent = "🧠 Generating...";

      const answer = await askAI(
        `Generate 20 relevant YouTube keywords for this topic:
${topic}

Return a clean numbered list. Avoid misleading or unrelated keywords.`
      );

      keywordResults.innerHTML = `
        <h3>🏷️ AI Keywords</h3>
        <div class="growth-item"><p>${answer.replace(/\n/g, "<br>")}</p></div>
      `;

      generateKeywords.disabled = false;
      generateKeywords.textContent = "🏷️ Generate Keywords";
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
  const generateGrowth = document.getElementById("generateGrowth");
  const growthTopic = document.getElementById("growthTopic");
  const growthResults = document.getElementById("growthResults");

  if (generateGrowth) {
    generateGrowth.addEventListener("click", async () => {
      const topic = growthTopic ? growthTopic.value.trim() : "";

      if (!topic) {
        growthResults.innerHTML = "<p>⚠️ Enter your channel/content topic first.</p>";
        return;
      }

      generateGrowth.disabled = true;
      generateGrowth.textContent = "🧠 Building...";

      const answer = await askAI(
        `Create a practical YouTube growth strategy for:
${topic}

Give content ideas, upload consistency advice, audience strategy, title/thumbnail advice and measurable goals.`
      );

      growthResults.innerHTML = `
        <h3>📈 AI Growth Strategy</h3>
        <div class="growth-item"><p>${answer.replace(/\n/g, "<br>")}</p></div>
      `;

      generateGrowth.disabled = false;
      generateGrowth.textContent = "📈 Build Growth Strategy";
    });
  }

  // CHANNEL DOCTOR
  const runDoctor = document.getElementById("runDoctor");
  const doctorInput = document.getElementById("doctorInput");
  const doctorResults = document.getElementById("doctorResults");

  if (runDoctor) {
    runDoctor.addEventListener("click", async () => {
      const info = doctorInput ? doctorInput.value.trim() : "";

      runDoctor.disabled = true;
      runDoctor.textContent = "🧠 Checking...";

      const answer = await askAI(
        `Act as a YouTube channel advisor.
Analyze this channel information:
${info || "No channel information provided."}

Give a concise health check, problems to fix, opportunities and 5 actionable recommendations.`
      );

      doctorResults.innerHTML = `
        <h3>📺 AI Channel Check</h3>
        <div class="growth-item"><p>${answer.replace(/\n/g, "<br>")}</p></div>
      `;

      runDoctor.disabled = false;
      runDoctor.textContent = "📺 Run Channel Check";
    });
  }

  
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
/* REAL AI CONNECTION */
async function askAI(prompt) {
  try {
    const response = await fetch("http://127.0.0.1:3000/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(data.error || "AI request failed");
    }

    return data.answer;
  } catch (error) {
    console.error("AI Error:", error);
    return "⚠️ AI connection failed: " + error.message;
  }
}
