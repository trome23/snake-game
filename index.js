const grid = document.querySelector(".grid")
const startBtn = document.querySelector("#start-btn")
const score = document.querySelector("#score")
const width = 10
let squares = []
let currentSnake = [2,1,0]
let direction = 1
let appleIndex = 0

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
        console.log(tail)
        //grow snake array
        currentSnake.push(tail)
        //create new apple
        createApples()
        //add one to the score

        //speed up our snake


    }


    squares[currentSnake[0]].classList.add("snake") //<== add styling so we can see it move
}
move()

let timerID = setInterval(move, 1000)  //<==setting speed of snake in milliseconds and calling move() function

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

