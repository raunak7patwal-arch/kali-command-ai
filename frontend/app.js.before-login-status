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
     AI BRAIN — FULL VIDEO PIPELINE
  ================================= */

  const brainVideo = document.getElementById("brainVideo");
  const startBrain = document.getElementById("startBrain");

  let preparedVideoFile = null;
  let preparedAnalysis = null;

  function formatBytes(bytes) {
    if (!bytes) return "0 Bytes";
    const units = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + " " + units[i];
  }

  function formatTime(seconds) {
    if (!isFinite(seconds) || seconds < 0) return "Calculating...";
    if (seconds < 60) return Math.ceil(seconds) + " sec";
    const m = Math.floor(seconds / 60);
    const sec = Math.ceil(seconds % 60);
    return m + " min " + sec + " sec";
  }

  if (startBrain) {

    startBrain.addEventListener("click", () => {

      if (!brainVideo || !brainVideo.files || !brainVideo.files.length) {
        setResult(
          "brainResults",
          "<h3>⚠️ Video Required</h3><p>पहले एक वीडियो select करो।</p>"
        );
        return;
      }

      const file = brainVideo.files[0];
      preparedVideoFile = file;

      if (!file.type.startsWith("video/")) {
        setResult(
          "brainResults",
          "<h3>⚠️ Invalid File</h3><p>कृपया valid video file select करो।</p>"
        );
        return;
      }

      const backendBase =
        window.API_BASE_URL || "https://kali-command-ai.onrender.com";

      const formData = new FormData();
      formData.append("video", file);

      const xhr = new XMLHttpRequest();

      let uploadStart = Date.now();
      let lastLoaded = 0;
      let lastTime = uploadStart;
      let retryCount = 0;
      const maxRetries = 1;

      startBrain.disabled = true;
      startBrain.textContent = "⏳ Processing...";

      setResult(
        "brainResults",
        `
        <h3>🧠 AI VIDEO PIPELINE</h3>

        <p><strong>🎬 File:</strong> ${escapeHtml(file.name)}</p>
        <p><strong>📦 Size:</strong> ${formatBytes(file.size)}</p>

        <hr>

        <p id="brainStage"><strong>Stage:</strong> Preparing upload</p>
        <p id="brainProgressText"><strong>Progress:</strong> 0.0%</p>
        <p id="brainSpeed"><strong>Speed:</strong> Calculating...</p>
        <p id="brainEta"><strong>Estimated time:</strong> Calculating...</p>

        <progress
          id="brainProgress"
          value="0"
          max="100"
          style="width:100%;height:24px"
        ></progress>
        `
      );

      xhr.upload.addEventListener("progress", (event) => {

        if (!event.lengthComputable) return;

        const now = Date.now();
        const elapsed = (now - uploadStart) / 1000;

        const percent =
          (event.loaded / event.total * 100);

        const deltaBytes = event.loaded - lastLoaded;
        const deltaTime = (now - lastTime) / 1000;

        let speed = 0;

        if (deltaTime > 0) {
          speed = deltaBytes / deltaTime;
        }

        lastLoaded = event.loaded;
        lastTime = now;

        if (speed <= 0 && elapsed > 0) {
          speed = event.loaded / elapsed;
        }

        const remainingBytes =
          event.total - event.loaded;

        const eta =
          speed > 0
            ? remainingBytes / speed
            : Infinity;

        const progressText =
          document.getElementById("brainProgressText");

        const progressBar =
          document.getElementById("brainProgress");

        const speedText =
          document.getElementById("brainSpeed");

        const etaText =
          document.getElementById("brainEta");

        const stage =
          document.getElementById("brainStage");

        if (progressText) {
          progressText.innerHTML =
            "<strong>Progress:</strong> " +
            percent.toFixed(1) + "%";
        }

        if (progressBar) {
          progressBar.value = percent;
        }

        if (speedText) {
          speedText.innerHTML =
            "<strong>Speed:</strong> " +
            formatBytes(speed) + "/sec";
        }

        if (etaText) {
          etaText.innerHTML =
            "<strong>Estimated time:</strong> " +
            formatTime(eta);
        }

        if (stage) {
          stage.innerHTML =
            "<strong>Stage:</strong> Uploading video to AI pipeline";
        }

      });

      xhr.upload.addEventListener("load", () => {

        const stage =
          document.getElementById("brainStage");

        const progressText =
          document.getElementById("brainProgressText");

        const etaText =
          document.getElementById("brainEta");

        if (stage) {
          stage.innerHTML =
            "<strong>Stage:</strong> 🤖 Gemini AI is creating publishing strategy";
        }

        if (progressText) {
          progressText.innerHTML =
            "<strong>Progress:</strong> 100.0%";
        }

        if (etaText) {
          etaText.innerHTML =
            "<strong>Estimated time:</strong> AI processing...";
        }

      });

      xhr.addEventListener("load", () => {

        startBrain.disabled = false;
        startBrain.textContent = "🧠 Analyze With AI Brain";

        let data;

        try {
          data = JSON.parse(xhr.responseText);
        } catch {
          setResult(
            "brainResults",
            "<h3>⚠️ Server Error</h3><p>Server ने invalid response भेजा।</p>"
          );
          return;
        }

        if (xhr.status < 200 || xhr.status >= 300 || !data.ok) {

          setResult(
            "brainResults",
            `
            <h3>⚠️ Pipeline Failed</h3>
            <p>${escapeHtml(data.error || "Unknown error")}</p>
            <button class="primary-btn" onclick="document.getElementById('startBrain').click()">
              🔄 Retry
            </button>
            `
          );

          return;
        }

        preparedAnalysis = data.analysis;

        const tags =
          Array.isArray(data.analysis.tags)
            ? data.analysis.tags.join(", ")
            : "";

        setResult(
          "brainResults",
          `
          <h3>✅ AI PIPELINE COMPLETE — 100.0%</h3>

          <p><strong>🎬 Video:</strong> ${escapeHtml(data.file.name)}</p>
          <p><strong>📦 Size:</strong> ${escapeHtml(data.file.sizeMB)} MB</p>

          <hr>

          <h3>✏️ Review Publishing Details</h3>

          <label><strong>✨ Title</strong></label>
          <input
            id="publishTitle"
            type="text"
            value="${escapeHtml(data.analysis.title || "")}"
            style="width:100%;padding:12px;margin:8px 0"
          >

          <label><strong>📝 Description</strong></label>
          <textarea
            id="publishDescription"
            style="width:100%;min-height:150px;padding:12px;margin:8px 0"
          >${escapeHtml(data.analysis.description || "")}</textarea>

          <label><strong>🏷️ Tags (comma separated)</strong></label>
          <textarea
            id="publishTags"
            style="width:100%;min-height:80px;padding:12px;margin:8px 0"
          >${escapeHtml(tags)}</textarea>

          <h3>📊 AI Strategy</h3>
          <div class="ai-answer">
            ${escapeHtml(data.analysis.strategy || "Strategy ready.").replace(/\n/g, "<br>")}
          </div>

          <hr>

          <button
            class="primary-btn"
            id="publishToYouTube"
            style="margin-top:15px"
          >
            🚀 Publish to YouTube
          </button>

          <p id="publishStatus" style="margin-top:12px"></p>
          `
        );

        const publishButton =
          document.getElementById("publishToYouTube");

        if (publishButton) {

          publishButton.addEventListener("click", async () => {

            const title =
              document.getElementById("publishTitle")?.value.trim();

            const description =
              document.getElementById("publishDescription")?.value || "";

            const tagsText =
              document.getElementById("publishTags")?.value || "";

            const status =
              document.getElementById("publishStatus");

            if (!title) {
              if (status) {
                status.textContent =
                  "⚠️ Title खाली नहीं हो सकता।";
              }
              return;
            }

            if (!preparedVideoFile) {
              if (status) {
                status.textContent =
                  "⚠️ Video file नहीं मिला। दोबारा select करो।";
              }
              return;
            }

            const tags = tagsText
              .split(",")
              .map(tag => tag.trim())
              .filter(Boolean)
              .slice(0, 30);

            publishButton.disabled = true;

            if (status) {
              status.textContent =
                "🔍 Checking YouTube connection...";
            }

            try {

              const connectionResponse =
                await fetch(
                  backendBase + "/api/youtube/status"
                );

              const connectionData =
                await connectionResponse.json();

              if (!connectionData.connected) {

                if (status) {
                  status.innerHTML =
                    `⚠️ YouTube connected नहीं है। पहले channel connect करो।`;
                }

                publishButton.disabled = false;
                return;
              }

              if (status) {
                status.textContent =
                  "🚀 Publishing system तैयार है...";
              }

              if (status) {
                status.innerHTML = `
                  <strong>🚀 Starting YouTube upload...</strong><br>
                  <span id="publishProgressText">Preparing: 0.0%</span><br>
                  <span id="publishSpeed">Speed: Calculating...</span><br>
                  <span id="publishEta">Estimated time: Calculating...</span><br>
                  <progress
                    id="publishProgress"
                    value="0"
                    max="100"
                    style="width:100%;height:22px;margin-top:10px"
                  ></progress>
                `;
              }

              const publishData = new FormData();

              publishData.append(
                "video",
                preparedVideoFile
              );

              publishData.append(
                "title",
                title
              );

              publishData.append(
                "description",
                description
              );

              publishData.append(
                "tags",
                JSON.stringify(tags)
              );

              const publishXhr =
                new XMLHttpRequest();

              const publishStart =
                Date.now();

              let previousLoaded = 0;
              let previousTime = publishStart;

              publishXhr.upload.addEventListener(
                "progress",
                function(event) {

                  if (!event.lengthComputable) return;

                  const percent =
                    event.loaded /
                    event.total *
                    100;

                  const now = Date.now();

                  const timeDiff =
                    (now - previousTime) / 1000;

                  const bytesDiff =
                    event.loaded -
                    previousLoaded;

                  let speed = 0;

                  if (timeDiff > 0) {
                    speed =
                      bytesDiff / timeDiff;
                  }

                  previousLoaded =
                    event.loaded;

                  previousTime = now;

                  const remaining =
                    event.total -
                    event.loaded;

                  const eta =
                    speed > 0
                      ? remaining / speed
                      : Infinity;

                  const progressText =
                    document.getElementById(
                      "publishProgressText"
                    );

                  const progress =
                    document.getElementById(
                      "publishProgress"
                    );

                  const speedText =
                    document.getElementById(
                      "publishSpeed"
                    );

                  const etaText =
                    document.getElementById(
                      "publishEta"
                    );

                  if (progressText) {
                    progressText.textContent =
                      "Uploading to YouTube: " +
                      percent.toFixed(1) + "%";
                  }

                  if (progress) {
                    progress.value = percent;
                  }

                  if (speedText) {
                    speedText.textContent =
                      "Speed: " +
                      formatBytes(speed) +
                      "/sec";
                  }

                  if (etaText) {
                    etaText.textContent =
                      "Estimated time: " +
                      formatTime(eta);
                  }

                }
              );

              publishXhr.upload.addEventListener(
                "load",
                function() {

                  const progressText =
                    document.getElementById(
                      "publishProgressText"
                    );

                  if (progressText) {
                    progressText.textContent =
                      "100.0% — YouTube is processing...";
                  }

                }
              );

              publishXhr.addEventListener(
                "load",
                function() {

                  publishButton.disabled = false;

                  let publishResponse;

                  try {

                    publishResponse =
                      JSON.parse(
                        publishXhr.responseText
                      );

                  } catch {

                    if (status) {
                      status.innerHTML =
                        "⚠️ Invalid response from publishing server.";
                    }

                    return;
                  }

                  if (
                    publishXhr.status < 200 ||
                    publishXhr.status >= 300 ||
                    !publishResponse.ok
                  ) {

                    if (status) {
                      status.innerHTML =
                        "⚠️ Publishing failed: " +
                        escapeHtml(
                          publishResponse.error ||
                          "Unknown error"
                        );
                    }

                    return;
                  }

                  const videoId =
                    publishResponse.video?.id;

                  if (status) {

                    status.innerHTML = `
                      <h3>✅ VIDEO UPLOADED SUCCESSFULLY!</h3>

                      <p>
                        <strong>Title:</strong>
                        ${escapeHtml(
                          publishResponse.video?.title ||
                          title
                        )}
                      </p>

                      <p>
                        <strong>Privacy:</strong>
                        ${escapeHtml(
                          publishResponse.video?.privacyStatus ||
                          "private"
                        )}
                      </p>

                      ${
                        videoId
                        ? `<p>
                            <strong>Video ID:</strong>
                            ${escapeHtml(videoId)}
                          </p>`
                        : ""
                      }

                      <p>
                        🎉 Your video has been sent to your authorized YouTube channel.
                      </p>
                    `;

                  }

                }
              );

              publishXhr.addEventListener(
                "error",
                function() {

                  publishButton.disabled = false;

                  if (status) {
                    status.innerHTML =
                      "⚠️ Network error while publishing to YouTube.";
                  }

                }
              );

              publishXhr.open(
                "POST",
                backendBase +
                "/api/youtube/publish"
              );

              publishXhr.send(
                publishData
              );

            } catch (error) {

              console.error(error);

              if (status) {
                status.textContent =
                  "⚠️ Connection error: " + error.message;
              }

            } finally {

              publishButton.disabled = false;

            }

          });

        }

      });

      xhr.addEventListener("error", () => {

        startBrain.disabled = false;
        startBrain.textContent =
          "🧠 Analyze With AI Brain";

        setResult(
          "brainResults",
          `
          <h3>⚠️ Network Error</h3>
          <p>Backend से connection नहीं हो पाया।</p>
          <button class="primary-btn" onclick="document.getElementById('startBrain').click()">
            🔄 Retry Upload
          </button>
          `
        );

      });

      xhr.open(
        "POST",
        backendBase + "/api/brain/analyze"
      );

      xhr.send(formData);

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

/* ==========================================
   YOUTUBE CONNECT BUTTON
   ========================================== */
document.addEventListener("DOMContentLoaded", function () {
  const connectChannel = document.getElementById("connectChannel");

  if (connectChannel) {
    connectChannel.addEventListener("click", function () {
      const backend =
        window.API_BASE_URL ||
        "https://kali-command-ai.onrender.com";

      window.location.href = backend + "/auth/youtube";
    });

    console.log("✓ YouTube Connect button activated");
  }
});
