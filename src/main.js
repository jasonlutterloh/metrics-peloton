import App from "./App.svelte";

const app = new App({
  target: document.body,
});

// Remove service worker functionality from local development
if (location.hostname != "localhost" && location.hostname != "127.0.0.1") {
  if ("serviceWorker" in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js");
    });
  }
}

export default app;
