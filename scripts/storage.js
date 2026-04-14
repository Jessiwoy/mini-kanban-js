const TASKS_STORAGE_KEY = "mini-kanban:tasks";
const THEME_STORAGE_KEY = "mini-kanban:theme";

export function saveTasks(tasks) {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

export function loadTasks() {
  const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);

  if (!storedTasks) {
    return [];
  }

  try {
    const parsedTasks = JSON.parse(storedTasks);

    if (!Array.isArray(parsedTasks)) {
      return [];
    }

    return parsedTasks;
  } catch (error) {
    console.error("Erro ao carregar tarefas do localStorage:", error);
    return [];
  }
}

export function saveTheme(theme) {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function loadTheme() {
  return localStorage.getItem(THEME_STORAGE_KEY);
}