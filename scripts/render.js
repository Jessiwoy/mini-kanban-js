import { COLUMN_ORDER, getTasks, TASK_STATUS } from "./state.js";

const COLUMN_TITLES = {
  todo: "A fazer",
  in_progress: "Em andamento",
  pending: "Pendente",
  done: "Concluído",
};

export function renderBoard() {
  const tasks = getTasks();

  COLUMN_ORDER.forEach((status) => {
    renderColumn(status, tasks);
  });
}

function renderColumn(status, tasks) {
  const columnBody = document.querySelector(`[data-column-body="${status}"]`);
  const columnElement = document.querySelector(`[data-column-status="${status}"]`);

  if (!columnBody || !columnElement) return;

  const columnCount = columnElement.querySelector(".column__count");
  const filteredTasks = tasks.filter((task) => task.status === status);

  columnBody.innerHTML = "";

  if (filteredTasks.length === 0) {
    columnBody.innerHTML = `
      <p class="empty-state">Nenhuma tarefa por aqui.</p>
    `;
  } else {
    filteredTasks.forEach((task) => {
      const card = createTaskCard(task);
      columnBody.appendChild(card);
    });
  }

  if (columnCount) {
    columnCount.textContent = String(filteredTasks.length);
  }
}

function createTaskCard(task) {
  const article = document.createElement("article");
  article.className = "task-card";
  article.dataset.taskId = task.id;
  article.draggable = task.status !== TASK_STATUS.DONE;

  const shouldShowNote =
    task.status === TASK_STATUS.TODO || Boolean(task.note);

  if (task.status === TASK_STATUS.DONE) {
    article.classList.add("task-card--done");
  }

  article.innerHTML = `
    <div class="task-card__content">
      <h3 class="task-card__title">${task.title}</h3>
      ${
        shouldShowNote
          ? `<p class="task-card__note">${task.note || "Sem observações por enquanto."}</p>`
          : ""
      }
    </div>

    <div class="task-card__actions">
      <button type="button" data-action="edit">Editar</button>
      <button type="button" data-action="delete">Excluir</button>
    </div>
  `;

  return article;
}

export function createEditForm(task) {
  const article = document.createElement("article");
  article.className = "task-card task-card--editing";
  article.dataset.taskId = task.id;

  article.innerHTML = `
    <form class="task-edit-form">
      <input type="text" value="${task.title}" />

      <textarea placeholder="Observação (opcional)">${task.note || ""}</textarea>

      <div class="task-card__actions">
        <button type="submit">Salvar</button>
        <button type="button" data-action="cancel">Cancelar</button>
      </div>
    </form>
  `;

  return article;
}