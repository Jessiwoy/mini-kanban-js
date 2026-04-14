import { TASK_STATUS } from "./state.js";

export function generateId() {
  return `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export function sanitizeText(text) {
  return text.trim().replace(/\s+/g, " ");
}

export function isValidTaskTitle(title) {
  const sanitizedTitle = sanitizeText(title);
  return sanitizedTitle.length > 0;
}

export function canMoveTask(currentStatus, nextStatus) {
  if (currentStatus === TASK_STATUS.DONE) {
    return false;
  }

  if (
    currentStatus === TASK_STATUS.PENDING &&
    nextStatus === TASK_STATUS.DONE
  ) {
    return false;
  }

  return true;
}