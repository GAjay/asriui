import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { applySiteTheme, readSiteTheme } from "./useSiteTheme";
import "../src/styles/globals.css";
import "./landing.css";

applySiteTheme(readSiteTheme());

function registerServiceWorker() {
  if (!import.meta.env.PROD) return;

  void import("virtual:pwa-register").then(({ registerSW }) => {
    registerSW({ immediate: true });
  });
}

const scheduleServiceWorker = () => registerServiceWorker();

if (typeof window.requestIdleCallback === "function") {
  window.requestIdleCallback(scheduleServiceWorker);
} else {
  window.addEventListener("load", scheduleServiceWorker, { once: true });
}

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element #root not found");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
