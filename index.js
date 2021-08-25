const grid = document.querySelector(".grid")
const startBtn = document.querySelector("#start-btn")
const scoreBoard = document.querySelector("#score")
const width = 10
let squares = []
let currentSnake = [2,1,0]
let direction = 1
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.7
let timerID = 0

function createGrid() {
    //creating 100 divs 
    for (let i = 0; i < width*width; i++) {
        const square = document.createElement("div")  //<== creating element using js
        
        square.classList.add('squareStyle')  //<== adding a class, to style each newly created div

        grid.appendChild(square)  //<== put div elements into our grid

        squares.push(square)  //<== push square element into an array
    }
}
createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function startGame() {
    //remove snake from grid
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    //remove apple
    squares[appleIndex].classList.remove("apple")
    clearInterval(timerID)
    currentSnake = [2,1,0]
    score = 0
    //clear score and set back to 0 in DOM
    scoreBoard.textContent = 0
    direction = 1
    intervalTime = 1000
    createApples()
    //add class of snake to new currentSnake
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerID = setInterval(move, intervalTime)  //<==setting speed of snake in milliseconds and calling move() function
}

function move() {
    //how to know if snake is hitting any of the 4 walls
    if (
        (currentSnake[0] + width >= width*width && direction === width) || //<== hitting bottom
        (currentSnake[0] % width === 0 && direction === -1) || //<== hitting left
        (currentSnake[0] % width === width-1 && direction === 1) || //<== hitting right
        (currentSnake[0] - width < 0 && direction === -width) || //<== hitting top
        squares[currentSnake[0] + direction].classList.contains("snake") //hitting itself
    )
    return clearInterval(timerID) //<== stop snake from moving


    const tail = currentSnake.pop() //<==remove last element from current snake array
    squares[tail].classList.remove('snake')  //<==remove styling from last element
    currentSnake.unshift(currentSnake[0] + direction) //<== add square to direction snake is moving

    //snake eating the apple
    if (squares[currentSnake[0]].classList.contains("apple")) {
        //remove the class 'apple'
        squares[currentSnake[0]].classList.remove("apple")
        //grow snake by adding class of snake to it
        squares[tail].classList.add("snake")
        //grow snake array
        currentSnake.push(tail)
        //create new apple
        createApples()
        //add one to the score
        score++
        //display score
        scoreBoard.textContent = score
        //speed up our snake
        clearInterval(timerID)
        intervalTime = intervalTime * speed
        timerID = setInterval(move, intervalTime)
    }

    squares[currentSnake[0]].classList.add("snake") //<== add styling so we can see it move
}

function createApples() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length) //<== creates random # for apple on the grid
    } while (squares[appleIndex].classList.contains("snake"))  // <== do not create apples where the snake is
    squares[appleIndex].classList.add("apple")  //<== create apple in random spot w/o snake in it
}
createApples()

function control(e) {
    if(e.key === 'ArrowRight' ) {     //<==grabbing event keys and setting the direction based on 'keydown' eventlistener
        direction = 1
    } else if(e.key === 'ArrowUp') {
        direction = - width
    } else if(e.key === 'ArrowLeft') {
        direction = -1
    } else if(e.key === 'ArrowDown') {
        direction = + width
    }
}

document.addEventListener('keydown', control)
startBtn.addEventListener('click', startGame)

