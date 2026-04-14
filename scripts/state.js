export const TASK_STATUS = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  PENDING: "pending",
  DONE: "done",
};

export const COLUMN_ORDER = [
  TASK_STATUS.TODO,
  TASK_STATUS.IN_PROGRESS,
  TASK_STATUS.PENDING,
  TASK_STATUS.DONE,
];

export const appState = {
  tasks: [],
};

export function getTasks() {
  return appState.tasks;
}

export function setTasks(tasks) {
  appState.tasks = tasks;
}

export function addTask(task) {
  appState.tasks.push(task);
}

export function updateTask(taskId, updatedData) {
  appState.tasks = appState.tasks.map((task) =>
    task.id === taskId ? { ...task, ...updatedData } : task
  );
}

export function removeTask(taskId) {
  appState.tasks = appState.tasks.filter((task) => task.id !== taskId);
}