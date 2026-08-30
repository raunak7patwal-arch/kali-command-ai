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
