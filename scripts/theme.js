import { loadTheme, saveTheme } from "./storage.js";

const DEFAULT_THEME = "dark";

export function getInitialTheme() {
  const storedTheme = loadTheme();

  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme;
  }

  return DEFAULT_THEME;
}

export function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  updateThemeToggleState(theme);
}

export function toggleTheme() {
  const currentTheme = document.body.getAttribute("data-theme");
  const nextTheme = currentTheme === "light" ? "dark" : "light";

  applyTheme(nextTheme);
  saveTheme(nextTheme);
}

export function initializeTheme() {
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);
}

export function updateThemeToggleState(theme) {
  const themeToggleButton = document.querySelector(".theme-toggle");

  if (!themeToggleButton) {
    return;
  }

  const isLightTheme = theme === "light";

  themeToggleButton.setAttribute(
    "aria-label",
    isLightTheme ? "Ativar tema escuro" : "Ativar tema claro"
  );

  themeToggleButton.setAttribute("aria-pressed", String(isLightTheme));
}