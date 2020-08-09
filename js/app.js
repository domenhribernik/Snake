document.addEventListener('DOMContentLoaded', () => {
  let gameContainer = document.querySelector(".game")
  let numCols = 10;
  let numRows = 10;
  let gameArr = []
  
  function createGrid(Cols, Rows) {
    for (let i = 0; i < Rows; i++) {
      gameArr.push([])
      for (let j = 0; j < Cols; j++) {
        let cell = document.createElement("div")
        cell.classList.add("game-cell")
        cell.classList.add("row" + i)
        cell.classList.add("col" + j)
        gameArr[i].push(cell)
        gameContainer.appendChild(cell)
      }
    }
  }
  createGrid(numCols, numRows)

  let cellWidth = document.querySelector(".game-cell").getBoundingClientRect().width
  gameContainer.style.width = (numCols * cellWidth) + "px" 
  gameArr[2][2].classList.add("snake")
  console.log(gameArr[2][2])
})