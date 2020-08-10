document.addEventListener('DOMContentLoaded', () => {
  let gameContainer = document.querySelector(".game")
  let gameCells = gameContainer.children;
  let darkMode = document.getElementById("toggle")
  let body = document.querySelector('body')
  let rowSlider = document.getElementById("slider-row")
  let colSlider = document.getElementById("slider-col")
  let numCols = 10
  let numRows = 10
  let gameArr = []
  let snakeArr = []
  let currentCol = 2
  let currentRow = 2
  let appleCell
  let grow = false
  let moveId
  let direction = 1

  rowSlider.addEventListener("input", () => {
    let newValue = rowSlider.value
    let target = document.querySelector('.row')
    target.innerHTML = newValue
    numRows = newValue   
  })

  colSlider.addEventListener("input", () => {
    let newValue = colSlider.value
    let target = document.querySelector('.col')
    target.innerHTML = newValue
    numCols = newValue
    createGrid(colSlider.value, rowSlider.value)
  })

  createGrid(numCols, numRows)

  document.addEventListener('keyup', startGame)
  darkMode.addEventListener('click', () => {
    if (darkMode.checked) {
      body.style.background = "black"
      body.style.color = "white"
      gameContainer.style.borderColor = "white"      
    } else {
      body.style.background = "white"
      body.style.color = "black"
      gameContainer.style.borderColor = "black"  
    }
  })

  let cellWidth = document.querySelector(".game-cell").getBoundingClientRect().width
  gameContainer.style.width = (numCols * cellWidth) + "px" 
  snakeArr.push(gameArr[currentRow][currentCol])
  snakeArr[snakeArr.length-1].classList.add("snake")

  function startGame(e) {
    if (e.keyCode == 32) {
      document.removeEventListener('keyup', startGame)
      console.log("Game has started");
      moveId = setInterval(moveSnake, 125)
    }
  }

  function gameOver() {
    console.log("game over")
    clearInterval(moveId)
    document.removeEventListener('keydown', changeDirection)
  }

  function createGrid(Cols, Rows) {
    for (let i = 0; i < Rows; i++) {
      gameArr.push([])
      for (let j = 0; j < Cols; j++) {
        let cell = document.createElement("div")
        cell.classList.add("game-cell", "empty-cell", "row" + i, "col" + j)
        gameArr[i].push(cell)
        gameContainer.appendChild(cell)
      }
    }
  }

  function moveSnake() {
    grow = false
    appleCell = document.querySelector(".apple")
    if (appleCell == undefined) {
      createApple()
    }
    else if (appleCell == snakeArr[snakeArr.length-1]) {
      appleCell.classList.remove("apple")
      grow = true
    }
    document.addEventListener('keydown', changeDirection)
    switch (direction) {
      case 1:
        if (currentCol == numCols-1) {
          gameOver()
        } else {
          if (!grow) {
            removeSnake()
          }
          currentCol+=1
          checkCollision()
          addSnake()
        }
        break;
      case 2:
        if (currentRow == 0) {
          gameOver()
        } else {
          if (!grow) {
            removeSnake()
          }
          currentRow-=1   
          checkCollision()
          addSnake()
        }  
        break;
      case 3:
        if (currentCol == 0) {
          gameOver()
        } else {
          if (!grow) {
            removeSnake()
          }
          currentCol-=1
          checkCollision()
          addSnake()
        }
        break;
      case 4:
        if (currentRow == numRows-1) {
          gameOver()
        } else {
          if (!grow) {
            removeSnake()
          }
          currentRow+=1
          checkCollision()
          addSnake()
        }      
        break;
    }  
  }

  function addSnake() {
    snakeArr.push(gameArr[currentRow][currentCol])
    snakeArr[snakeArr.length-1].classList.remove("empty-cell")
    snakeArr[snakeArr.length-1].classList.add("snake")
  }

  function removeSnake() {
    snakeArr[0].classList.remove("snake")
    snakeArr[0].classList.add("empty-cell")
    snakeArr.shift()
  }

  function checkCollision() {
    for (let elem of snakeArr) {
      if (elem == gameArr[currentRow][currentCol]) {
        gameOver()
      }
    }
  }

  function createApple() {
    let emptyCells = document.querySelectorAll(".empty-cell")
    let rNum = Math.round(Math.random() * emptyCells.length)
    emptyCells[rNum].classList.add("apple")
    console.log();
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