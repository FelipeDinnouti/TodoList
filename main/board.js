class Board {
    constructor(title, index) {
        this.title = title;
        this.task_list = [];
        this.index = index;
    }

    findElement() {
        return document.getElementById("board" + this.index);  // Usando this.index
    }

    addTask(task) {
        this.task_list.push(task); // Adiciona o objeto abstrato a lista também
        console.log(this.task_list);

    }
    removeTask(task) {
        const index = this.task_list.indexOf(task);
        if (index != -1) {
            this.task_list.splice(index, 1);
        }

        console.log(this.task_list);
    }

    createTaskElement(evt) {
        const index = evt.currentTarget.board_index;

        const board_object = document.getElementById(`board${index}`);
        const task_list_element = getElementByClassName(board_object, "task_list");

        let input = getElementByClassName(board_object, "input");
        let inputs_group = getElementByClassName(input, "inputs_group");

        // Localiza os inputs dentro de inputs_group
        let task_name_input = getElementByClassName(inputs_group, "task_name_input");
        let task_date_input = getElementByClassName(inputs_group, "task_date_input");
        let task_information_input = getElementByClassName(input, "task_information_input");

        let title = task_name_input.value;
        let date = task_date_input.value;
        let description = task_information_input.value;

        if (title === "" || date === "" || description === "") {
            return alert("Por favor insira todos os campos!"); // Não cria se o título, a data, ou a descrição estiverem vazios
            // TODO: Faz ficar vermelho o que faltou
        }

        // Reseta o input
        task_name_input.value = "";
        task_date_input.value = "";
        task_information_input.value = "";

        let task = new Task(title, date, description);
        let task_element = task.createTaskElement(this);

        this.addTask(task);
        task_list_element.appendChild(task_element); // Adiciona ao HTML

        // Draggin
        makeDragable(board_object, task_element);

        console.log("Nova tarefa criada:", title, date, description);
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
