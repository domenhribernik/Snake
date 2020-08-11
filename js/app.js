document.addEventListener('DOMContentLoaded', () => {
  let gameContainer = document.querySelector(".game")
  let rowSlider = document.getElementById("slider-row")
  let colSlider = document.getElementById("slider-col")
  let rowSliderNum = document.querySelector('.row')
  let colSliderNum = document.querySelector('.col')
  let gameCells = gameContainer.children;
  let darkMode = document.getElementById("toggle")
  let body = document.querySelector('body')
  let text = document.querySelector('.text')
  let restartButton = document.getElementById('restart')
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

  window.onresize = () => {
    
    if (window.innerWidth < 600) {
      numCols = 10
      numRows = 10
      rowSlider.value = 10
      colSlider.value = 10
      rowSliderNum.innerHTML = 10
      colSliderNum.innerHTML = 10
      createGrid(numCols, numRows)
    }
  }
   
  rowSlider.addEventListener("input", rowChange)
  colSlider.addEventListener("input", colChange)

  function rowChange() {
    let newValue = rowSlider.value
    rowSliderNum.innerHTML = newValue
    numRows = newValue
    createGrid(numCols, numRows)
  }
  function colChange() {
    let newValue = colSlider.value
    colSliderNum.innerHTML = newValue
    numCols = newValue
    createGrid(numCols, numRows)
  }

  createGrid(numCols, numRows)
  document.addEventListener('keyup', startGame)
  restartButton.addEventListener('click', restartGame)
  
  darkMode.addEventListener('click', darkModeCheck)

  function darkModeCheck() {
    if (darkMode.checked) {
      body.classList.add("darkmode")
      restartButton.style.background = "black"
      document.querySelector(".icon").style.color = "white"
      if (appleCell != undefined) {
        appleCell.classList.remove("apple")
        appleCell.classList.add("dark-apple")
      }
      gameContainer.style.borderColor = "white"
      for (let i = 0; i < gameCells.length; i++) {
        gameCells[i].style.borderColor = "black"      
      }    
      for (let i = 0; i < snakeArr.length; i++) {
        snakeArr[i].classList.add("dark-snake")
        snakeArr[i].classList.remove("snake")     
      }
    } else {
      body.classList.remove("darkmode")
      restartButton.style.background = "white"
      document.querySelector(".icon").style.color = "black"
      if (appleCell != undefined) {
        appleCell.classList.remove("dark-apple")
        appleCell.classList.add("apple")
      }
      gameContainer.style.borderColor = "black"  
      for (let i = 0; i < gameCells.length; i++) {
        gameCells[i].style.borderColor = "white"
      }   
      for (let i = 0; i < snakeArr.length; i++) {
        snakeArr[i].classList.add("snake")
        snakeArr[i].classList.remove("dark-snake")     
      }
    }
  }

  function startGame(e) {
    if (e.keyCode == 32) {
      document.removeEventListener('keyup', startGame)
      rowSlider.disabled = true;
      colSlider.disabled = true;
      restartButton.removeEventListener('click', restartGame)
      console.log("Game has started");
      moveId = setInterval(moveSnake, 125)
      console.log(moveId);
    }
  }

  function gameOver() {
    console.log("game over")
    text.textContent = "Game Over!";
    clearInterval(moveId)
    if (darkMode.checked) {
      appleCell.classList.remove("dark-apple")
      text.style.color = "white"
    }
    else {
      appleCell.classList.remove("apple")
      text.style.color = "black"
    }
    text.style.zIndex = 1
    appleCell = undefined
    destroyId = setInterval(destroySnake, 100)
    document.removeEventListener('keydown', changeDirection)
    restartButton.addEventListener('click', restartGame)
  }

  function destroySnake() {
    if (darkMode.checked) {
      snakeArr[snakeArr.length-1].classList.remove("dark-snake")
    }
    else {
      snakeArr[snakeArr.length-1].classList.remove("snake")
    }
    snakeArr.pop()
    if(snakeArr.length == 0) {
      clearInterval(destroyId)
    }
  }

  function restartGame() {
    if (darkMode.checked) {
      if (appleCell != undefined) {
        appleCell.classList.remove("dark-apple")
      }
      text.style.color = "white"
    }
    else {
      if (appleCell != undefined) {
        appleCell.classList.remove("apple")
      }
      text.style.color = "black"
    }
    text.textContent = "Press space to start the game";
    text.style.zIndex = 1
    appleCell = undefined
    rowSlider.value = 10
    colSlider.value = 10
    rowSliderNum.textContent = 10
    colSliderNum.textContent = 10
    numCols = 10
    numRows = 10
    gameArr = []
    snakeArr = []
    currentCol = 2
    currentRow = 2
    grow = false
    direction = 1
    rowSlider.disabled = false;
    colSlider.disabled = false;
    createGrid(numCols, numRows)
    document.addEventListener('keyup', startGame)
    console.log("this works");
  }

  function createGrid(Cols, Rows) {
    gameArr = []
    snakeArr = []
    gameContainer.innerHTML = ""

    for (let i = 0; i < Rows; i++) {
      gameArr.push([])
      for (let j = 0; j < Cols; j++) {
        let cell = document.createElement("div")
        cell.classList.add("game-cell", "empty-cell", "row" + i, "col" + j)
        if (darkMode.checked) {
          cell.style.borderColor = "black"
        }
        gameArr[i].push(cell)
        gameContainer.appendChild(cell)
      }
    }
    let cellWidth = document.querySelector(".game-cell").getBoundingClientRect().width
    gameContainer.style.width = (numCols * cellWidth) + "px" 
    gameContainer.style.height = (numRows * cellWidth) + "px" 
    snakeArr.push(gameArr[currentRow][currentCol])
    if (darkMode.checked) {
      snakeArr[snakeArr.length-1].classList.add("dark-snake")
    }
    else {
      snakeArr[snakeArr.length-1].classList.add("snake")
    }
  }

  function moveSnake() {
    grow = false
    if (darkMode.checked) {
      appleCell = document.querySelector(".dark-apple")
      text.style.color = "black"
    }
    else {
      appleCell = document.querySelector(".apple")
      text.style.color = "white"
    }
    if (text.style.zIndex != -1) {
      text.style.zIndex = -1
    }

    if (appleCell == undefined) {
      createApple()
    }
    else if (appleCell == snakeArr[snakeArr.length-1]) {
      if (darkMode.checked) {
        appleCell.classList.remove("dark-apple")
      }
      else {
        appleCell.classList.remove("apple")
      }
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
    if (darkMode.checked) {
      snakeArr[snakeArr.length-1].classList.add("dark-snake")
    }
    else {
      snakeArr[snakeArr.length-1].classList.add("snake")
    }
  }

  function removeSnake() {
    if (darkMode.checked) {
      snakeArr[0].classList.remove("dark-snake")
    }
    else {
      snakeArr[0].classList.remove("snake")
    }
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
    if (darkMode.checked) {
      emptyCells[rNum].classList.add("dark-apple")
    }
    else {
      emptyCells[rNum].classList.add("apple")
    }
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