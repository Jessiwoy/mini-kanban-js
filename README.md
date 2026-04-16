🧩 Mini Kanban — Gerenciador de Tarefas

Aplicação web de gerenciamento de tarefas no estilo Kanban, desenvolvida com HTML, CSS e JavaScript Vanilla, com foco em boas práticas de engenharia de software, organização de código e experiência do usuário.

📌 Sobre o projeto

O Mini Kanban permite organizar tarefas em diferentes estados de progresso, simulando um fluxo real de trabalho.

O projeto foi desenvolvido com o objetivo de:

praticar manipulação de DOM
trabalhar com estado de aplicação sem frameworks
aplicar regras de negócio no front-end
construir uma interface moderna e responsiva
simular um produto real utilizável

🚀 Funcionalidades

📋 Gestão de tarefas
Criar tarefas (com título obrigatório)
Editar tarefas (título e observação)
Excluir tarefas com confirmação

📝 Observações
Tarefas podem conter observações adicionais
Observação é opcional e editável
Exibida conforme o estado da tarefa

🔄 Fluxo Kanban

Colunas:
A fazer
Em andamento
Pendente
Concluído

Regras de negócio:
Tarefas começam em A fazer
Tarefas pendentes não podem ir direto para concluído
Tarefas concluídas são estado final (não movem)

🖱️ Drag and Drop
Movimentação entre colunas com drag and drop nativo
Feedback visual de colunas válidas e inválidas
Bloqueio de movimentos inválidos

💾 Persistência
Dados salvos no localStorage
Mantém tarefas após recarregar a página

🎨 Tema
Tema claro e escuro
Alternância via switch com ícones
Persistência da preferência do usuário

📱 Responsividade
Mobile-first
Layout adaptado para tablet e desktop

🛠️ Tecnologias utilizadas
HTML5
CSS3 (com variáveis e temas)
JavaScript (ES6+)
LocalStorage API
Drag and Drop API nativa

🧠 Conceitos aplicados
Manipulação do DOM
Gerenciamento de estado sem frameworks
Separação de responsabilidades (render, state, utils)
Boas práticas de código (funções puras, reutilização)
Regras de negócio no front-end
UX/UI e microinterações
Persistência de dados no cliente

📂 Estrutura do projeto

mini-kanban-js/
│
├── index.html
├── styles/
│   └── main.css
│
├── scripts/
│   ├── app.js
│   ├── render.js
│   ├── tasks.js
│   ├── state.js
│   ├── storage.js
│   ├── utils.js
│   └── theme.js
│
└── README.md

▶️ Como executar o projeto

Clone o repositório:
git clone https://github.com/Jessiwoy/mini-kanban-js.git
Acesse a pasta:
cd mini-kanban-js
Abra o arquivo index.html no navegador
ou utilize uma extensão como Live Server no VS Code.


👩‍💻 Autora
Desenvolvido por Jessica Woytuski

📄 Licença
Este projeto é de uso livre para fins de estudo e portfólio.