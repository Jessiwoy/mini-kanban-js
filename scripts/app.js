import { renderBoard, createEditForm } from "./render.js";
import { createTask, deleteTask, editTask, initializeTasks } from "./tasks.js";
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

if (taskForm) {
  taskForm.addEventListener("submit", handleCreateTask);
}

if (board) {
  board.addEventListener("click", handleBoardClick);
  board.addEventListener("submit", handleEditSubmit);
}

initializeTasks();
renderBoard();