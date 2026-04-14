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
  updateThemeToggleLabel(theme);
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

export function updateThemeToggleLabel(theme) {
  const themeToggleButton = document.querySelector(".theme-toggle");

  if (!themeToggleButton) {
    return;
  }

  themeToggleButton.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  themeToggleButton.setAttribute(
    "aria-label",
    theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"
  );
}