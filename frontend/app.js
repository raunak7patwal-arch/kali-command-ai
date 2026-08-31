document.addEventListener("DOMContentLoaded", () => {

  const API_URL = (window.API_BASE_URL || "https://kali-command-ai.onrender.com") + "/api/ai";

  /* ================================
     HELPER FUNCTIONS
  ================================= */

  function setResult(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  async function askGemini(prompt) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    let data;

    try {
      data = await response.json();
    } catch {
      throw new Error("Invalid response from AI backend.");
    }

    if (!response.ok || !data.ok) {
      throw new Error(
        data.error ||
        "Gemini AI request failed."
      );
    }

    return data.answer;
  }

  async function runAI({
    button,
    resultId,
    loadingText,
    prompt
  }) {

    if (!button) return;

    const oldText = button.textContent;

    button.disabled = true;
    button.textContent = loadingText;

    setResult(
      resultId,
      "<p>🤖 Gemini AI is thinking...</p>"
    );

    try {

      const answer = await askGemini(prompt);

      setResult(
        resultId,
        `
          <h3>🤖 AI Result</h3>
          <div class="ai-answer">
            ${escapeHtml(answer).replace(/\n/g, "<br>")}
          </div>
        `
      );

    } catch (error) {

      console.error(error);

      setResult(
        resultId,
        `
          <h3>⚠️ AI Error</h3>
          <p>${escapeHtml(error.message)}</p>
        `
      );

    } finally {

      button.disabled = false;
      button.textContent = oldText;

    }
  }


  /* ================================
     NAVIGATION
  ================================= */

  const pageTitle = document.getElementById("pageTitle");
  const pageSubtitle = document.getElementById("pageSubtitle");

  const pageInfo = {
    dashboard: [
      "Command Center",
      "Your AI-powered YouTube workspace"
    ],
    "ai-brain": [
      "AI Brain",
      "Autonomous video intelligence"
    ],
    titles: [
      "Title Lab",
      "Generate smarter video titles"
    ],
    description: [
      "Description Lab",
      "Create optimized descriptions"
    ],
    keywords: [
      "Keyword Lab",
      "Discover content opportunities"
    ],
    doctor: [
      "Channel Doctor",
      "Channel health and improvements"
    ],
    growth: [
      "Growth Engine",
      "Build your content strategy"
    ],
    thumbnail: [
      "Thumbnail Lab",
      "Improve thumbnail strategy"
    ],
    scheduler: [
      "Smart Scheduler",
      "Plan your uploads"
    ],
    "video-lab": [
      "Video Lab",
      "Prepare your videos"
    ]
  };

  document.querySelectorAll("[data-page]").forEach(button => {

    button.addEventListener("click", () => {

      const pageId = button.dataset.page;

      document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
      });

      const targetPage =
        document.getElementById(pageId);

      if (targetPage) {
        targetPage.classList.add("active");
      }

      if (pageInfo[pageId] && pageTitle && pageSubtitle) {
        pageTitle.textContent = pageInfo[pageId][0];
        pageSubtitle.textContent = pageInfo[pageId][1];
      }

    });

  });


  /* ================================
     TITLE LAB → REAL GEMINI
  ================================= */

  const titleTopic =
    document.getElementById("titleTopic");

  const generateTitles =
    document.getElementById("generateTitles");

  if (generateTitles) {

    generateTitles.addEventListener("click", async () => {

      const topic =
        titleTopic ? titleTopic.value.trim() : "";

      if (!topic) {
        setResult(
          "titleResults",
          "<p>⚠️ Please enter your video topic first.</p>"
        );
        return;
      }

      await runAI({
        button: generateTitles,
        resultId: "titleResults",
        loadingText: "🤖 Generating...",
        prompt: `
You are an expert YouTube title strategist.

Create 10 highly clickable but honest YouTube video titles.

VIDEO TOPIC:
${topic}

Rules:
- Do not use misleading clickbait.
- Make titles interesting and natural.
- Optimize for curiosity and clarity.
- Number each title.
- Return only the titles.
        `
      });

    });

  }


  /* ================================
     DESCRIPTION LAB → REAL GEMINI
  ================================= */

  const descriptionTopic =
    document.getElementById("descriptionTopic");

  const generateDescription =
    document.getElementById("generateDescription");

  if (generateDescription) {

    generateDescription.addEventListener("click", async () => {

      const topic =
        descriptionTopic
          ? descriptionTopic.value.trim()
          : "";

      if (!topic) {
        setResult(
          "descriptionResults",
          "<p>⚠️ Please enter your video topic first.</p>"
        );
        return;
      }

      await runAI({
        button: generateDescription,
        resultId: "descriptionResults",
        loadingText: "🤖 Writing...",
        prompt: `
You are an expert YouTube content writer.

Write a high-quality YouTube video description.

VIDEO TOPIC:
${topic}

Include:
- An engaging opening
- Clear explanation of the video's value
- Natural SEO-friendly wording
- A short call to action

Do not invent facts.

Make the result ready to copy and paste.
        `
      });

    });

  }


  /* ================================
     KEYWORD LAB → REAL GEMINI
  ================================= */

  const keywordTopic =
    document.getElementById("keywordTopic");

  const generateKeywords =
    document.getElementById("generateKeywords");

  if (generateKeywords) {

    generateKeywords.addEventListener("click", async () => {

      const topic =
        keywordTopic
          ? keywordTopic.value.trim()
          : "";

      if (!topic) {
        setResult(
          "keywordResults",
          "<p>⚠️ Please enter your video topic first.</p>"
        );
        return;
      }

      await runAI({
        button: generateKeywords,
        resultId: "keywordResults",
        loadingText: "🤖 Researching...",
        prompt: `
You are a YouTube SEO assistant.

Generate useful keyword ideas for this YouTube video topic:

${topic}

Return:
1. Primary keywords
2. Long-tail keywords
3. Related search phrases
4. Suggested hashtags

Do not claim you have real-time search volume data.
Keep keywords relevant and natural.
        `
      });

    });

  }


  /* ================================
     GROWTH ENGINE → REAL GEMINI
  ================================= */

  const generateGrowth =
    document.getElementById("generateGrowth");

  if (generateGrowth) {

    generateGrowth.addEventListener("click", async () => {

      const growthTopicInput =
        document.getElementById("growthTopic");

      const topic =
        growthTopicInput
          ? growthTopicInput.value.trim()
          : "General YouTube channel growth";

      await runAI({
        button: generateGrowth,
        resultId: "growthResults",
        loadingText: "🤖 Building Strategy...",
        prompt: `
You are an experienced YouTube growth strategist.

Create a practical growth strategy.

CHANNEL OR TOPIC:
${topic}

Include:

1. Content niche strategy
2. Video ideas
3. Upload consistency strategy
4. Title strategy
5. Thumbnail strategy
6. First 30 seconds strategy
7. Audience retention ideas
8. How to review performance
9. A simple 30-day action plan

Do not promise guaranteed views or subscribers.
Give realistic and actionable advice.
        `
      });

    });

  }


  /* ================================
     CHANNEL DOCTOR → REAL GEMINI
  ================================= */

  const runDoctor =
    document.getElementById("runDoctor");

  if (runDoctor) {

    runDoctor.addEventListener("click", async () => {

      const doctorInput =
        document.getElementById("doctorInput");

      const channelInfo =
        doctorInput
          ? doctorInput.value.trim()
          : "";

      const info =
        channelInfo ||
        "No specific channel statistics were provided.";

      await runAI({
        button: runDoctor,
        resultId: "doctorResults",
        loadingText: "🤖 Diagnosing...",
        prompt: `
You are a YouTube Channel Doctor.

Analyze the following channel information:

${info}

Give a practical diagnostic report containing:

1. Possible strengths
2. Possible weaknesses
3. Content problems
4. Title problems
5. Thumbnail problems
6. Audience retention improvements
7. Upload strategy improvements
8. Top 5 priority actions

Important:
If actual analytics are not provided, clearly say that your analysis is based only on the information supplied.
Do not invent channel statistics.
        `
      });

    });

  }


  /* ================================
     AI BRAIN
  ================================= */

  const brainVideo =
    document.getElementById("brainVideo");

  const startBrain =
    document.getElementById("startBrain");

  if (startBrain) {

    startBrain.addEventListener("click", () => {

      if (
        !brainVideo ||
        !brainVideo.files ||
        !brainVideo.files.length
      ) {
        setResult(
          "brainResults",
          "<p>⚠️ Please select a video first.</p>"
        );
        return;
      }

      const file = brainVideo.files[0];

      setResult(
        "brainResults",
        `
          <h3>🧠 AI Brain</h3>
          <p><strong>Selected:</strong>
          ${escapeHtml(file.name)}</p>
          <p>Video upload analysis can be connected in the next step.</p>
        `
      );

    });

  }


  /* ================================
     THUMBNAIL LAB
  ================================= */

  const generateThumbnail =
    document.getElementById("generateThumbnail");

  if (generateThumbnail) {

    generateThumbnail.addEventListener("click", () => {

      setResult(
        "thumbnailResults",
        `
          <h3>🖼️ Thumbnail Plan</h3>
          <ol>
            <li>Use one clear main subject.</li>
            <li>Keep text short.</li>
            <li>Make the idea understandable quickly.</li>
            <li>Avoid unnecessary small details.</li>
            <li>Match the thumbnail to the title.</li>
          </ol>
        `
      );

    });

  }


  /* ================================
     SMART SCHEDULER
  ================================= */

  const saveSchedule =
    document.getElementById("saveSchedule");

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

      setResult(
        "scheduleResults",
        `
          <h3>⏰ Schedule Saved</h3>
          <p>✅ Schedule information was saved on this device.</p>
        `
      );

    });

  }


  /* ================================
     VIDEO LAB
  ================================= */

  const prepareVideo =
    document.getElementById("prepareVideo");

  if (prepareVideo) {

    prepareVideo.addEventListener("click", () => {

      setResult(
        "videoResults",
        `
          <h3>🎥 Video Preparation Plan</h3>
          <ol>
            <li>Choose a clear topic.</li>
            <li>Create a strong title.</li>
            <li>Prepare a relevant thumbnail.</li>
            <li>Write a useful description.</li>
            <li>Add relevant keywords.</li>
            <li>Review the opening of the video.</li>
            <li>Check everything before publishing.</li>
          </ol>
        `
      );

    });

  }


  console.log(
    "Kali Command AI frontend loaded successfully."
  );

});


/* ==========================================
   UNIVERSAL BUTTON & NAVIGATION FIX
   ========================================== */

(function () {
  console.log("Universal button system loaded");

  function openPage(pageName) {
    if (!pageName) return;

    const target = document.getElementById(pageName);

    if (!target) {
      console.warn("Page not found:", pageName);
      return;
    }

    // सभी pages hide
    document.querySelectorAll(".page").forEach(function(page) {
      page.classList.remove("active-page");
      page.style.display = "none";
    });

    // Target page show
    target.classList.add("active-page");
    target.style.display = "block";

    // Navigation active state
    document.querySelectorAll(".nav-btn").forEach(function(btn) {
      btn.classList.remove("active");
    });

    document.querySelectorAll(
      '.nav-btn[data-page="' + pageName + '"]'
    ).forEach(function(btn) {
      btn.classList.add("active");
    });

    // Page title update
    const navButton = document.querySelector(
      '.nav-btn[data-page="' + pageName + '"]'
    );

    const title = document.getElementById("pageTitle");

    if (navButton && title) {
      const text = navButton.textContent
        .replace(/[^\w\s]/g, "")
        .trim();

      if (text) title.textContent = text;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    console.log("Opened page:", pageName);
  }

  // पूरे document के लिए CLICK DELEGATION
  document.addEventListener("click", function(event) {

    // Navigation buttons
    const nav = event.target.closest(".nav-btn[data-page]");

    if (nav) {
      event.preventDefault();
      event.stopPropagation();

      const page = nav.getAttribute("data-page");
      openPage(page);
      return;
    }

    // Dashboard quick buttons
    const go = event.target.closest("[data-go]");

    if (go) {
      event.preventDefault();
      event.stopPropagation();

      const page = go.getAttribute("data-go");
      openPage(page);
      return;
    }

  }, true);

  // बाहर से भी page खोलने के लिए
  window.openCommandPage = openPage;

  console.log("✓ All navigation buttons repaired");

})();
