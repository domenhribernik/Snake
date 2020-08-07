document.addEventListener('DOMContentLoaded', () => {
  let gameContainer = document.querySelector(".game")
  let numCols = 10;
  let numRows = 10;
  let gameArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      let cell = document.createElement("div")
      cell.classList.add("game-cell")
      gameContainer.appendChild(cell)
      //gameArr[i].push(j)
    }
  }
  //console.log(gameArr);
  let cellWidth = document.querySelector(".game-cell").getBoundingClientRect().width
  gameContainer.style.width = (numCols * cellWidth) + "px" 
})