class Board {
    constructor(title, index) {
        self.title = title
        self.task_list = []
        self.index = index
    }

    getAsElement() {
        return document.getElementById("board"+Number.toString(index));
    }

    checkboxChange(event) {
        if (event.target.checked) {
            console.log("Tarefa feita")
        } else {
            console.log("Tarefa pendente")
        }
    }

    createTaskElement(evt) {
        let index = evt.currentTarget.board_index;


        function getElementClassName(parent, target) {
            for (var i = 0; i < parent.childNodes.length; i++) {
                if (parent.childNodes[i].className === target) {
                    return parent.childNodes[i]
                }        
            }
        } 

        const board_object = document.getElementById(`board${index}`);
        const task_list = getElementClassName(board_object, "task_list")

        let input = getElementClassName(board_object, "input")
        let task_name_input = getElementClassName(input, "task_name_input");
        let task_date_input = getElementClassName(input, "task_date_input");

        let description = task_name_input.value;
        let date = task_date_input.value;

        if (description === "" || date === "") {
            return; // Não cria se a descrição ou a data estiverem vazias
        }

        // Reseta o input
        task_name_input.value = "";
        task_date_input.value = "";

        // Criando a nova tarefa em HTML
        const task_object = document.createElement("li");
        const checkbox = document.createElement("input");
        const p = document.createElement("p");
        const time = document.createElement("time");
        const button = document.createElement("button");
        const delete_task = document.createElement("delete_task");

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

         //Verificar se a tarefa estão feita
        checkbox.addEventListener('change', this.checkboxChange);

        task_list.appendChild(task_object); // Retorna a tarefa completa
        self.task_list.push(new TaskInformation());

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

    createBoardElement() {
        const board_object = document.createElement("div");
        const board_title = document.createElement("p");
        const task_list = document.createElement("ul");
        
        const input = document.createElement("div");
        const text_input = document.createElement("input");
        const date_input = document.createElement("input");
        const button = document.createElement("button");

        board_object.className = "board";
        board_object.id = `board${self.index}`
        
        board_title.className = "board_title";
        board_title.innerText = self.title;

        task_list.className = "task_list";

        input.className = "input";

        text_input.type = "text";
        text_input.className = "task_name_input";

        date_input.type = "date";
        date_input.className = "task_date_input";
        date_input.placeholder = "09092008";

        button.className = "task_button";
        button.innerText = "+";

        board_object.appendChild(board_title);
        board_object.appendChild(task_list);
        board_object.appendChild(input);
        input.appendChild(text_input);
        input.appendChild(date_input);
        input.appendChild(button);

        button.addEventListener("click", this.createTaskElement, false);
        button.board_index = self.index
        console.log(`setting event listener: ${self.index}`)

        return board_object;
    }
}