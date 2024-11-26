const board_list = document.getElementById("wrapper");

// Default Boards

var todo_board = new Board("A Fazer", 0);

boards.push(todo_board);
board_list.appendChild(todo_board.createBoardElement());

var doing_board = new Board("Fazendo", 1);

boards.push(doing_board);
board_list.appendChild(doing_board.createBoardElement());

var done_board = new Board("Feito", 2);

boards.push(done_board);
board_list.appendChild(done_board.createBoardElement());


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
