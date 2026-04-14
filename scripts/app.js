import { renderBoard, createEditForm } from "./render.js";
import {
  createTask,
  deleteTask,
  editTask,
  initializeTasks,
  moveTask,
} from "./tasks.js";
import { getTasks } from "./state.js";

const taskForm = document.querySelector(".task-form");
const taskTitleInput = document.querySelector("#task-title");
const board = document.querySelector(".board");

function handleCreateTask(event) {
  event.preventDefault();

  const result = createTask(taskTitleInput.value);

  if (!result.success) {
    alert(result.message);
    return;
  }

  taskTitleInput.value = "";
  taskTitleInput.focus();
  renderBoard();
}

function handleBoardClick(event) {
  const button = event.target.closest("button");
  if (!button) return;

  const action = button.dataset.action;
  const card = button.closest(".task-card");
  if (!card) return;

  const taskId = card.dataset.taskId;

  if (action === "delete") {
    if (confirm("Deseja excluir esta tarefa?")) {
      deleteTask(taskId);
      renderBoard();
    }
  }

  if (action === "edit") {
    startEditing(card, taskId);
  }

  if (action === "cancel") {
    renderBoard();
  }
}

function startEditing(card, taskId) {
  const tasks = getTasks();
  const task = tasks.find((currentTask) => currentTask.id === taskId);

  if (!task) return;

  const editForm = createEditForm(task);
  card.replaceWith(editForm);
}

function handleEditSubmit(event) {
  if (!event.target.classList.contains("task-edit-form")) return;

  event.preventDefault();

  const form = event.target;
  const input = form.querySelector("input");
  const card = form.closest(".task-card");

  if (!input || !card) return;

  const taskId = card.dataset.taskId;
  const result = editTask(taskId, input.value);

  if (!result.success) {
    alert(result.message);
    return;
  }

  renderBoard();
}

function handleDragStart(event) {
  const card = event.target.closest(".task-card");

  if (!card || !card.draggable) {
    return;
  }

  event.dataTransfer.setData("text/plain", card.dataset.taskId);
  event.dataTransfer.effectAllowed = "move";

  card.classList.add("task-card--dragging");
}

function handleDragEnd(event) {
  const card = event.target.closest(".task-card");

  if (card) {
    card.classList.remove("task-card--dragging");
  }

  clearDropHighlights();
}

function handleDragOver(event) {
  const columnBody = event.target.closest(".column__body");

  if (!columnBody) {
    return;
  }

  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function handleDragEnter(event) {
  const columnBody = event.target.closest(".column__body");

  if (!columnBody) {
    return;
  }

  columnBody.classList.add("column__body--drag-over");
}

function handleDragLeave(event) {
  const columnBody = event.target.closest(".column__body");

  if (!columnBody) {
    return;
  }

  const relatedTarget = event.relatedTarget;

  if (relatedTarget && columnBody.contains(relatedTarget)) {
    return;
  }

  columnBody.classList.remove("column__body--drag-over");
}

function handleDrop(event) {
  const columnBody = event.target.closest(".column__body");

  if (!columnBody) {
    return;
  }

  event.preventDefault();

  const taskId = event.dataTransfer.getData("text/plain");
  const nextStatus = columnBody.dataset.columnBody;

  columnBody.classList.remove("column__body--drag-over");

  if (!taskId || !nextStatus) {
    return;
  }

  const result = moveTask(taskId, nextStatus);

  if (!result.success) {
    alert(result.message);
  }

  renderBoard();
}

function clearDropHighlights() {
  const highlightedColumns = document.querySelectorAll(".column__body--drag-over");

  highlightedColumns.forEach((column) => {
    column.classList.remove("column__body--drag-over");
  });
}

if (taskForm) {
  taskForm.addEventListener("submit", handleCreateTask);
}

if (board) {
  board.addEventListener("click", handleBoardClick);
  board.addEventListener("submit", handleEditSubmit);
  board.addEventListener("dragstart", handleDragStart);
  board.addEventListener("dragend", handleDragEnd);
  board.addEventListener("dragover", handleDragOver);
  board.addEventListener("dragenter", handleDragEnter);
  board.addEventListener("dragleave", handleDragLeave);
  board.addEventListener("drop", handleDrop);
}

initializeTasks();
renderBoard();