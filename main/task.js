class Task {
  constructor(title, date, description) {
    this.title = title;
    this.date = date;
    this.description = description;
  }

  createTaskElement(board) {
    // Criando a nova tarefa em HTML
    const task_object = document.createElement("li");
    const checkbox = document.createElement("input");
    const p = document.createElement("p");
    const time = document.createElement("time");
    const delete_task = document.createElement("button");

    const information_task = document.createElement("p");
    const time_tag = document.createElement("div");

    // Configurando os elementos
    task_object.className = "task";
    task_object.id = `task${Math.random().toString(36).substr(2, 9)}`; // ID único para cada tarefa
    // Acho melhor um ID incremental do que um ID aleatório, mas vou deixar aqui só pra lembrar de fazer isso depois

    checkbox.type = "checkbox";
    checkbox.className = "task_checkbox";

    p.className = "task_description";
    p.innerText = this.title;

    information_task.type = "text";
    information_task.innerText = this.description;
    information_task.className = "information_task";
    
    time.className = "task_date";
    time.dateTime = this.date;
    time.innerText = new Date(this.date).toLocaleDateString("pt-BR", {
        timeZone: "UTC",
    }); // Exibe a data formatada

    // Verificar se a tarefa está feita
    checkbox.addEventListener('change', function (ev) {
        let parent = ev.currentTarget.parentElement;
        let task_description = getElementByClassName(parent, "task_description");

        if (ev.currentTarget.checked) {
            task_description.id = "strikethrough";
        } else {
            task_description.id = "";
        }
    });

    delete_task.className = "bx bxs-trash alt";
    delete_task.id = "delete_task";

    // Evento de exclusão
    delete_task.addEventListener("mousedown", () => {
        task_object.remove(); // Remove a tarefa do DOM
        board.removeTask(this)
        console.log("Tarefa deletada!");
    });

    // Montando a estrutura HTML
    task_object.appendChild(checkbox);
    task_object.appendChild(p);
    task_object.appendChild(delete_task);
    task_object.appendChild(time);
    task_object.appendChild(information_task);

    const hoje = new Date();
    const dataHoje = hoje.toISOString().split('T')[0];

    const tarefaData = this.date.split('T')[0];

    if (tarefaData < dataHoje) {
        console.log("tarefa atrasada");
        time_tag.className = "tag_late";
        time_tag.innerText ="Atrasado";
        task_object.appendChild(time_tag);
    } else if (tarefaData === dataHoje) {
        console.log("tarefa para hoje");
        time_tag.className = "tag_duetoday";
        time_tag.innerText ="Para hoje";
        task_object.appendChild(time_tag);
    } else {
        console.log("tarefa dentro do prazo");
        time_tag.className = "tag_ontime";
        time_tag.innerText ="No prazo";
        task_object.appendChild(time_tag);
    }

    return task_object
  }
}