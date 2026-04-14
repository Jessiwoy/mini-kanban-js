import { renderBoard } from "./render.js";
import { createTask } from "./tasks.js";

const taskForm = document.querySelector(".task-form");
const taskTitleInput = document.querySelector("#task-title");

function handleCreateTask(event) {
  event.preventDefault();

  if (!taskTitleInput) {
    return;
  }

  const result = createTask(taskTitleInput.value);

  if (!result.success) {
    alert(result.message);
    return;
  }

  taskTitleInput.value = "";
  renderBoard();
  taskTitleInput.focus();
}

if (taskForm) {
  taskForm.addEventListener("submit", handleCreateTask);
}

renderBoard();