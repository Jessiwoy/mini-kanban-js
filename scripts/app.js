import { appState, TASK_STATUS } from "./state.js";
import { generateId, isValidTaskTitle, canMoveTask } from "./utils.js";

console.log("Estado inicial da aplicação:", appState);
console.log("Exemplo de ID gerado:", generateId());
console.log("Título válido:", isValidTaskTitle("  Estudar JavaScript  "));
console.log(
  "Movimento permitido de Pendente para Concluído:",
  canMoveTask(TASK_STATUS.PENDING, TASK_STATUS.DONE)
);