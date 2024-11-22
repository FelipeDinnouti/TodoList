class Board {
    constructor(title, index) {
        self.title = title;
        self.task_list = [];
        self.index = index;
    }

    getAsElement() {
        return document.getElementById("board" + Number.toString(index));
    }

    createTaskElement(evt) {
        let index = evt.currentTarget.board_index;

        function getElementClassName(parent, target) {
            for (let i = 0; i < parent.childNodes.length; i++) {
                if (parent.childNodes[i].className === target) {
                    return parent.childNodes[i];
                }
            }
        }

        const board_object = document.getElementById(`board${index}`);
        const task_list = getElementClassName(board_object, "task_list");

        let input = getElementClassName(board_object, "input");
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
        const delete_task = document.createElement("button");

        // Configurando os elementos
        task_object.className = "task";

        checkbox.type = "checkbox";
        checkbox.className = "task_checkbox";

        p.className = "task_description";
        p.innerText = description;

        time.className = "task_date";
        time.dateTime = date;
        time.innerText = new Date(date).toLocaleDateString("pt-BR", {
            timeZone: "UTC",
        }); // Exibe a data formatada

        delete_task.className = "bx bxs-trash alt";
        delete_task.id = "delete_task";

        // Evento de exclusão
        delete_task.addEventListener("click", () => {
            task_object.remove(); // Remove a tarefa do DOM
            console.log("Tarefa deletada!");
        });

        // Montando a estrutura HTML
        task_object.appendChild(checkbox);
        task_object.appendChild(p);
        task_object.appendChild(delete_task);
        task_object.appendChild(time);

        // Adicionando a nova tarefa à lista
        task_list.appendChild(task_object);
        self.task_list.push({
            description,
            date,
        });

        console.log("Nova tarefa criada:", description, date);
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
        board_object.id = `board${self.index}`;

        board_title.className = "board_title";
        board_title.innerText = self.title;

        task_list.className = "task_list";

        input.className = "input";

        text_input.type = "text";
        text_input.className = "task_name_input";

        date_input.type = "date";
        date_input.className = "task_date_input";

        button.className = "task_button";
        button.innerText = "+";

        board_object.appendChild(board_title);
        board_object.appendChild(task_list);
        board_object.appendChild(input);
        input.appendChild(text_input);
        input.appendChild(date_input);
        input.appendChild(button);

        button.addEventListener("click", this.createTaskElement, false);
        button.board_index = self.index;

        return board_object;
    }
}
