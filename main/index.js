const task_list = document.getElementById("board0");
const add_button = document.getElementById("button");
const task_name_input = document.getElementById("task_name_input");
const task_date_input = document.getElementById("task_date_input");

let boards = []; //Uma board é um conjunto de tasks
boards.push(new Board("A Fazer"));

function create_task_object(text, date) {
  if (text === "" || date === "") {
    return; // Não cria se a descrição ou a data estiverem vazias
  }

  // Reset the input
  task_name_input.value = "";
  task_date_input.value = "";

  // Adiciona o elemento a lista, criando o elemento na board 0
  task_list.appendChild(boards[0].createTask(text, date));

  //Verifica a data da tarefa
  const hoje = new Date();
  const dataHoje = hoje.toISOString().split('T')[0]; 

  const tarefaData = date.split('T')[0]; 

  if (tarefaData < dataHoje) {
      console.log("tarefa atrasada");
  } else if (tarefaData === dataHoje) {
      console.log("tarefa para hoje");
  } else {
      console.log("tarefa dentro do prazo");
  }
}

add_button.onclick = function () {
  create_task_object(task_name_input.value, task_date_input.value);
};

// Carregando Tasks

// Logo antes de fechar a janela, salvar os dados
window.addEventListener("beforeunload", function (e) {
  localStorage.setItem(
    "Boards",
    JSON.stringify(boards),
  );
});

// Assim que abrir a janela
window.addEventListener("load", function (e) {
  // lê uma lista de tasks salvas como uma string JSON e converte ela em Array
  let task_list = JSON.parse(localStorage.getItem("Boards"));

  // Itera por cada task salva e cria ela
  for (let i = 0; i < task_list.length; i++) {
    create_task_object(task_list[i].description, task_list[i].date);
  }
});

// Completando tasks
const checkboxes = document.querySelectorAll(".task_checkbox");

// Adiciona o evento 'change' para cada checkbox
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", (event) => {
    if (event.target.checked) {
      console.log("Uma checkbox foi marcada!");
      task_list.style.float = task_list.style.float === "right";
    }
  });
});
