import {
  addTask,
  getTasks,
  removeTask,
  setTasks,
  TASK_STATUS,
  updateTask,
} from "./state.js";
import { saveTasks, loadTasks } from "./storage.js";
import { generateId, isValidTaskTitle, sanitizeText } from "./utils.js";

export function createTask(title) {
  if (!isValidTaskTitle(title)) {
    return {
      success: false,
      message: "O título da tarefa é obrigatório.",
    };
  }

  const newTask = {
    id: generateId(),
    title: sanitizeText(title),
    status: TASK_STATUS.TODO,
    createdAt: new Date().toISOString(),
  };

  addTask(newTask);
  saveTasks(getTasks());

  return {
    success: true,
    task: newTask,
  };
}

export function editTask(taskId, newTitle) {
  if (!isValidTaskTitle(newTitle)) {
    return {
      success: false,
      message: "O título não pode ser vazio.",
    };
  }

  updateTask(taskId, {
    title: sanitizeText(newTitle),
  });

  saveTasks(getTasks());

  return { success: true };
}

export function deleteTask(taskId) {
  removeTask(taskId);
  saveTasks(getTasks());
}

export function initializeTasks() {
  const storedTasks = loadTasks();
  setTasks(storedTasks);
}