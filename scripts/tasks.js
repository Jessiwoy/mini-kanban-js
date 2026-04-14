import {
  addTask,
  getTasks,
  removeTask,
  setTasks,
  TASK_STATUS,
  updateTask,
} from "./state.js";
import { saveTasks, loadTasks } from "./storage.js";
import { canMoveTask, generateId, isValidTaskTitle, sanitizeText } from "./utils.js";

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

export function moveTask(taskId, nextStatus) {
  const tasks = getTasks();
  const task = tasks.find((currentTask) => currentTask.id === taskId);

  if (!task) {
    return {
      success: false,
      message: "Tarefa não encontrada.",
    };
  }

  if (!canMoveTask(task.status, nextStatus)) {
    return {
      success: false,
      message:
        task.status === TASK_STATUS.PENDING && nextStatus === TASK_STATUS.DONE
          ? "Tarefas pendentes precisam voltar para Em andamento antes de concluir."
          : "Essa tarefa não pode mais ser movida.",
    };
  }

  if (task.status === nextStatus) {
    return {
      success: true,
      unchanged: true,
    };
  }

  updateTask(taskId, { status: nextStatus });
  saveTasks(getTasks());

  return {
    success: true,
  };
}