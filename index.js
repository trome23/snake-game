const grid = document.querySelector(".grid")
const startBtn = document.querySelector("#start-btn")
const score = document.querySelector("#score")
let squares = []
let currentSnake = [2,1,0]
let direction = 1
let width = 10

function createGrid() {
    //creating 100 divs 
    for (let i = 0; i < 100; i++) {
        const square = document.createElement("div")  //<== creating element using js
        
        square.classList.add('squareStyle')  //<== adding a class, to style to each newly created div

        grid.appendChild(square)  //<== put div elements into our grid

        squares.push(square)  //<== push square element into an array
    }

}
createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function move() {
    //how to know if snake is hitting any of the 4 walls
    if (
        (currentSnake[0] + 10 >= 100 && direction === 10) ||
        (currentSnake[0] % 10 === 0 && direction === -1) ||
        (currentSnake[0] % 10 >= 9 && direction === +1) ||
        (currentSnake[0] - 10 < 0 && direction === -10) 
    )
    return clearInterval(timerID)
    //remove last element from current snake array
    const tail = currentSnake.pop()   
    //remove styling from last element
    squares[tail].classList.remove('snake')
    //add square to direction snake is moving
    currentSnake.unshift(currentSnake[0] + direction)
    //add styling so we can see it move
    squares[currentSnake[0]].classList.add('snake')
}
move()

let timerID = setInterval(move, 1000)

function control(e) {
    //grabbing event keys and setting the direction based on 'keydown' eventlistener
    if(e.key === 'ArrowRight' ) {
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

