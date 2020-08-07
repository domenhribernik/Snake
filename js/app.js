document.addEventListener('DOMContentLoaded', () => {
  let gameContainer = document.querySelector(".game")
  let numCols = 10;
  let numRows = 10;
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      let cell = document.createElement("div")
      cell.classList.add("game-cell")
      gameContainer.appendChild(cell)

      // var btn = document.createElement("BUTTON");
      // btn.innerHTML = "CLICK ME";
      // document.body.appendChild(btn);   
    }
  }
})