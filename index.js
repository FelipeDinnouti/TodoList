const task_list = document.getElementById("task_list");
const add_button = document.getElementById("button");
const task_name_input = document.getElementById("task_name_input");
const task_date_input = document.getElementById("task_date_input");

function create_task_object(text, date) {
    if (text === "" || date === "") {
        return; // Não cria se a descrição ou a data estiverem vazias
    }

    // Criando a nova tarefa 
    const task_object = document.createElement("li");
    const checkbox = document.createElement("input");
    const p = document.createElement("p");
    const time = document.createElement("time");

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

    //Verificar se a tarefa está feita
    checkbox.addEventListener('change', (event) => {
      if (event.target.checked) {
          console.log("Tarefa feita")
      } else {
          console.log("Tarefa pendente")
      }
    });

    // Mudando as propriedades para se encaixar no desejado
    checkbox.type = "checkbox";
    checkbox.className = "task_checkbox";

    p.className = "task_description";
    time.className = "task_date";
    time.dateTime = date;
    time.innerText = new Date(date).toLocaleDateString(); // Exibe a data formatada
    p.innerText = text;

    task_object.className = "task";

    // Append child adiciona um elemento como "filho" de outro elemento
    // other_element.appendChild(element)
    task_object.appendChild(checkbox);
    task_object.appendChild(p);
    task_object.appendChild(time);

    // Adiciona o elemento a lista
    task_list.appendChild(task_object);
}

add_button.onclick = function() {
    create_task_object(task_name_input.value, task_date_input.value);
    // Reset the input
    task_name_input.value = ""
    task_date_input.value = ""
}

const checkboxes = document.querySelectorAll('.task_checkbox');

// Adiciona o evento 'change' para cada checkbox
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', (event) => {
    if (event.target.checked) {
      console.log('Uma checkbox foi marcada!');
      task_list.style.float = task_list.style.float === 'right';
    }
  });
});