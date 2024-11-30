const board_list = document.getElementById("wrapper");

// Default Boards

let current_board_index // Placeholder but will work for now (inneficient for higher counts of boards)

function createBoard(name) {
  let board = new Board(name, boardElementList.length);
  boardInformationList.push(board); // Adiciona na lista de boards

  let boardElement = board.createBoardElement()
  boardElementList.push(boardElement); // Adiciona a lista 

  board_list.appendChild(boardElement) // Adiciona ao HTML
}

createBoard("A Fazer");
createBoard("Fazendo");
createBoard("Feito");

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
