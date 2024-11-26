class Board {
    constructor(title, index) {
        this.title = title;
        this.task_list = [];
        this.index = index;
    }

    getAsElement() {
        return document.getElementById("board" + this.index);  // Usando this.index
    }

    createTaskElement(evt) {
        const index = evt.currentTarget.board_index;

        function getElementClassName(parent, target) {
            for (let i = 0; i < parent.childNodes.length; i++) {
                if (parent.childNodes[i].className === target) {
                    return parent.childNodes[i];
                }
            }
        }

        const board_object = document.getElementById(`board${index}`);
        const task_list_element = getElementClassName(board_object, "task_list");
        const task_list = getElementClassName(board_object, "task_list");

        let input = getElementClassName(board_object, "input");
        let inputs_group = getElementClassName(input, "inputs_group");

        // Localiza os inputs dentro de inputs_group
        let task_name_input = getElementClassName(inputs_group, "task_name_input");
        let task_date_input = getElementClassName(inputs_group, "task_date_input");
        let task_information_input = getElementClassName(input, "task_information_input");

        let description = task_name_input.value;
        let date = task_date_input.value;
        let information = task_information_input.value;

        if (description === "" || date === "" || information === "") {
            return alert("Por favor insira todos os campos!"); // Não cria se o título, a data, ou a descrição estiverem vazios
        }

        // Reseta o input
        task_name_input.value = "";
        task_date_input.value = "";
        task_information_input.value = "";

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

        checkbox.type = "checkbox";
        checkbox.className = "task_checkbox";

        p.className = "task_description";
        p.innerText = description;

        information_task.type = "text";
        information_task.innerText = information;
        information_task.className = "information_task";
        
        time.className = "task_date";
        time.dateTime = date;
        time.innerText = new Date(date).toLocaleDateString("pt-BR", {
            timeZone: "UTC",
        }); // Exibe a data formatada

        // Verificar se a tarefa está feita
        checkbox.addEventListener('change', function (ev) {
            let parent = ev.currentTarget.parentElement;
            let task_description = getElementClassName(parent, "task_description");

            if (ev.currentTarget.checked) {
                task_description.id = "strikethrough";
            } else {
                task_description.id = "";
            }

            // Mover para a board "Feito" quando a checkbox for marcada
            if (ev.currentTarget.checked) {
                const doneBoard = boards.find(board => board.title === "Feito");
                doneBoard.getAsElement().querySelector(".task_list").appendChild(task_object);
            }
        });

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
        task_object.appendChild(information_task);

        const hoje = new Date();
        const dataHoje = hoje.toISOString().split('T')[0];

        const tarefaData = date.split('T')[0];

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

       // Adiciona a tarefa ao array
        this.task_list.push({
            description,
            date,
            information,
            element: task_object, // Referência ao elemento DOM
        });

        // Ordena o array por data
        this.task_list.sort((a, b) => new Date(a.date) - new Date(b.date));

        task_list_element.innerHTML = ""; // Remove apenas as tarefas
        this.task_list.forEach(task => {
            task_list_element.appendChild(task.element); // Adiciona novamente as tarefas ordenadas
        });


        console.log("Nova tarefa criada:", description, date, information);
    }

    createBoardElement() {
        const board_object = document.createElement("div");
        const board_title = document.createElement("p");
        const task_list = document.createElement("ul");

        const input = document.createElement("div"); // Div principal
        const inputs_group = document.createElement("div"); // Div para agrupar inputs
        const text_input = document.createElement("input");  // Título da task
        const date_input = document.createElement("input"); // Data da task
        const button = document.createElement("button"); // Botão para adicionar a task
        const information_input = document.createElement("input");  // Descrição da task

        board_object.className = "board";
        board_object.id = `board${this.index}`;

        board_title.className = "board_title";
        board_title.innerText = this.title;

        task_list.className = "task_list";

        input.className = "input";
        inputs_group.className = "inputs_group";

        text_input.type = "text";
        text_input.placeholder = "Título...";
        text_input.className = "task_name_input";

        date_input.type = "date";
        date_input.className = "task_date_input";

        button.className = "task_button";
        button.innerText = "+";

        information_input.type = "text";
        information_input.placeholder = "Descrição da tarefa...";
        information_input.className = "task_information_input";

        // Adiciona os elementos ao DOM
        board_object.appendChild(board_title);
        board_object.appendChild(task_list);
        board_object.appendChild(input);

        // Adiciona inputs_group e information_input à div input
        input.appendChild(inputs_group);
        input.appendChild(information_input);

        // Adiciona os inputs à div inputs_group
        inputs_group.appendChild(text_input);
        inputs_group.appendChild(date_input);
        inputs_group.appendChild(button);

        // Adiciona evento ao botão
        button.addEventListener("click", this.createTaskElement.bind(this), false);
        button.board_index = this.index;

        return board_object;
    }
}
