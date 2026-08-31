/*
  PUBLIC API CONFIGURATION

  For local testing:
  window.API_BASE_URL = "http://127.0.0.1:3000";

  For production, replace this with:
  window.API_BASE_URL = "https://YOUR-DOMAIN.example";
*/

window.API_BASE_URL =
  window.location.protocol === "capacitor:"
    ? "https://YOUR-DOMAIN.example"
    : "http://127.0.0.1:3000";
