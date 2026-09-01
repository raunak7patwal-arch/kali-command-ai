
const translations = {

  en: {

    subtitle: "AI Video Optimization Studio",

    welcome: "Welcome to Kali Command AI",

    heroText:
      "Create optimized titles, descriptions and relevant tags for your videos.",

    videoSetup: "🎥 Video Setup",

    selectVideo: "Select Video",

    videoTopic: "Video Topic",

    topicPlaceholder:
      "Example: Best Free Fire Gameplay Tips",

    videoDetails:
      "More Details About Your Video",

    detailsPlaceholder:
      "Explain what happens in your video...",

    videoType: "🎬 Video Type",

    longVideo: "Long Video",

    shortVideo: "YouTube Short",

    visibility: "🌍 Visibility",

    workingMode: "🤖 Working Mode",

    automatic: "AI Automatically",

    manual: "Manual",

    aiEdit: "AI Generate + Edit",

    generate: "Generate Video Package",

    titles: "🔥 Title Options",

    description: "📝 Description",

    tags: "🏷️ Relevant Tags"

  },


  hi: {

    subtitle: "AI वीडियो ऑप्टिमाइजेशन स्टूडियो",

    welcome: "Kali Command AI में आपका स्वागत है",

    heroText:
      "अपने वीडियो के लिए बेहतर Title, Description और Relevant Tags तैयार करें।",

    videoSetup: "🎥 वीडियो सेटअप",

    selectVideo: "वीडियो चुनें",

    videoTopic: "वीडियो का विषय",

    topicPlaceholder:
      "उदाहरण: Best Free Fire Gameplay Tips",

    videoDetails:
      "वीडियो के बारे में अधिक जानकारी",

    detailsPlaceholder:
      "बताएं कि वीडियो में क्या होता है...",

    videoType: "🎬 वीडियो का प्रकार",

    longVideo: "लॉन्ग वीडियो",

    shortVideo: "YouTube Short",

    visibility: "🌍 विजिबिलिटी",

    workingMode: "🤖 काम करने का तरीका",

    automatic: "AI ऑटोमैटिक",

    manual: "मैनुअल",

    aiEdit: "AI बनाए + Edit करें",

    generate: "वीडियो पैकेज बनाएं",

    titles: "🔥 टाइटल विकल्प",

    description: "📝 डिस्क्रिप्शन",

    tags: "🏷️ Relevant Tags"

  }

};


let currentLanguage =
  localStorage.getItem("language") || "en";


function changeLanguage(language) {

  currentLanguage = language;

  localStorage.setItem(
    "language",
    language
  );


  document.documentElement.lang = language;


  document.querySelectorAll("[data-i18n]")
    .forEach(element => {

      const key =
        element.dataset.i18n;

      if (translations[language][key]) {

        element.textContent =
          translations[language][key];

      }

    });


  document
    .querySelectorAll("[data-i18n-placeholder]")
    .forEach(element => {

      const key =
        element.dataset.i18nPlaceholder;

      if (translations[language][key]) {

        element.placeholder =
          translations[language][key];

      }

    });

}


document
  .getElementById("languageSelect")
  .addEventListener("change", event => {

    changeLanguage(event.target.value);

  });


document
  .getElementById("languageSelect").value =
  currentLanguage;


changeLanguage(currentLanguage);



const generateBtn =
  document.getElementById("generateBtn");

const statusBox =
  document.getElementById("status");

const results =
  document.getElementById("results");


const topicInput =
  document.getElementById("topic");

const detailsInput =
  document.getElementById("details");

const descriptionOutput =
  document.getElementById("descriptionOutput");


function getChecked(name) {

  return document.querySelector(
    `input[name="${name}"]:checked`
  )?.value;

}


function setStatus(message) {

  statusBox.textContent = message;

}


generateBtn.addEventListener(
  "click",
  async () => {

    const topic =
      topicInput.value.trim();

    const details =
      detailsInput.value.trim();


    if (!topic) {

      setStatus(
        currentLanguage === "hi"
          ? "❌ पहले वीडियो का विषय लिखें"
          : "❌ Please enter a video topic"
      );

      return;

    }


    const videoType =
      getChecked("videoType");


    const mode =
      getChecked("mode");


    generateBtn.disabled = true;


    setStatus(
      currentLanguage === "hi"
        ? "⚡ AI वीडियो पैकेज बना रहा है..."
        : "⚡ AI is generating your video package..."
    );


    try {

      const response =
        await fetch("/api/generate", {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            topic,

            details,

            videoType,

            mode,

            language: currentLanguage

          })

        });


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.error || "Error"
        );

      }


      const titlesBox =
        document.getElementById("titles");


      titlesBox.innerHTML = "";


      data.titles.forEach(title => {

        const div =
          document.createElement("div");


        div.className =
          "title-option";


        div.textContent = title;


        div.onclick = async () => {

          try {

            await navigator.clipboard.writeText(title);

            setStatus("✅ Title copied!");

          } catch {

            setStatus(title);

          }

        };


        titlesBox.appendChild(div);

      });


      descriptionOutput.value =
        data.description;


      document
        .getElementById("descriptionCount")
        .textContent =
        `${data.descriptionLength} characters`;


      const tagsBox =
        document.getElementById("tags");


      tagsBox.innerHTML = "";


      data.tags.forEach(tag => {

        const span =
          document.createElement("span");


        span.className = "tag";


        span.textContent =
          `#${tag.replace(/\s+/g, "")}`;


        tagsBox.appendChild(span);

      });


      results.classList.remove("hidden");


      setStatus(
        `✅ ${data.tagCount} tags generated`
      );

    }

    catch (error) {

      setStatus(
        `❌ ${error.message}`
      );

    }

    finally {

      generateBtn.disabled = false;

    }

  }

);
