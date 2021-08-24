const grid = document.querySelector(".grid")
const startBtn = document.querySelector("#start-btn")
const score = document.querySelector("#score")
let squares = []
let currentSnake = [2,1,0]
let direction = 1

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
