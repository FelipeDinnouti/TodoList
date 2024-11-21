class Board {
    constructor(title) {
        self.title = title
        self.task_list = []
    }

    checkboxChange(event) {
        if (event.target.checked) {
            console.log("Tarefa feita")
        } else {
            console.log("Tarefa pendente")
        }
    }

    createTask(description,date) {
        self.task_list.push(new TaskInformation(description, date));

        // Criando a nova tarefa em HTML
        const task_object = document.createElement("li");
        const checkbox = document.createElement("input");
        const p = document.createElement("p");
        const time = document.createElement("time");
        const button = document.createElement("button");

        // Mudando as propriedades para se encaixar no desejado
        checkbox.type = "checkbox";
        checkbox.className = "task_checkbox";

        p.className = "task_description";
        p.innerText = description;

        time.className = "task_date";
        time.dateTime = date;
        time.innerText = new Date(date).toLocaleDateString("pt-BR", {
            timeZone: "UTC",
        }); // Exibe a data formatada

        button.className = "bx bxs-trash alt";
        button.id = "delete_task";

        task_object.className = "task";

        // Append child adiciona um elemento como "filho" de outro elemento
        // other_element.appendChild(element)
        task_object.appendChild(checkbox);
        task_object.appendChild(p);
        task_object.appendChild(button);
        task_object.appendChild(time);

         //Verificar se a tarefa está feita
        checkbox.addEventListener('change', this.checkboxChange);

        return task_object // Retorna a tarefa completa
    }
}