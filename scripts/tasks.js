import { addTask, updateTask, removeTask, TASK_STATUS } from "./state.js";
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

  return { success: true };
}

export function deleteTask(taskId) {
  removeTask(taskId);
}