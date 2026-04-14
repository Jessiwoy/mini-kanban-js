import { addTask, TASK_STATUS } from "./state.js";
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