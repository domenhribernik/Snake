document.addEventListener('DOMContentLoaded', () => {
  let gameContainer = document.querySelector(".game")
  let numCols = 10
  let numRows = 10
  let gameArr = []
  let currentCol = 2
  let currentRow = 2
  let moveId
  let direction = 1
  
  createGrid(numCols, numRows)

  document.addEventListener('keyup', startGame)

  let cellWidth = document.querySelector(".game-cell").getBoundingClientRect().width
  gameContainer.style.width = (numCols * cellWidth) + "px" 
  gameArr[currentRow][currentCol].classList.add("snake")

  function startGame(e) {
    if (e.keyCode == 32) {
      document.removeEventListener('keyup', startGame)
      console.log("Game has started");
      moveId = setInterval(moveSnake, 200)
    }
  }

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

  function moveSnake() {
    document.addEventListener('keydown', changeDirection)
    switch (direction) {
      case 1:
        if (currentCol == numCols-1) {
          console.log("game over");
          clearInterval(moveId)
        } else {
          gameArr[currentRow][currentCol].classList.remove("snake")
          currentCol+=1
          gameArr[currentRow][currentCol].classList.add("snake")
        }
        break;
      case 2:
        if (currentRow == 0) {
          console.log("game over");
          clearInterval(moveId)
        } else {
          gameArr[currentRow][currentCol].classList.remove("snake")
          currentRow-=1
          gameArr[currentRow][currentCol].classList.add("snake")    
        }  
        break;
      case 3:
        if (currentCol == 0) {
          console.log("game over");
          clearInterval(moveId)
        } else {
          gameArr[currentRow][currentCol].classList.remove("snake")
          currentCol-=1
          gameArr[currentRow][currentCol].classList.add("snake")
        }
        break;
      case 4:
        if (currentRow == numRows-1) {
          console.log("game over");
          clearInterval(moveId)
        } else {
          gameArr[currentRow][currentCol].classList.remove("snake")
          currentRow+=1
          gameArr[currentRow][currentCol].classList.add("snake")
        }      
        break;
    }
    
  }

  function changeDirection(e) {
    if (e.keyCode == 68 && direction != 1 && direction != 3) {
      direction = 1
      console.log("D");
    }
    else if (e.keyCode == 87 && direction != 2 && direction != 4) {
      direction = 2
      console.log("W");
    }
    else if (e.keyCode == 65 && direction != 3 && direction != 1) {
      direction = 3
      console.log("A");
    }
    else if (e.keyCode == 83 && direction != 4 && direction != 2) {
      direction = 4
      console.log("S");
    }
  }
})