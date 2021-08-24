const grid = document.querySelector(".grid")
const startBtn = document.querySelector("#start-btn")
const score = document.querySelector("#score")
let squares = []

function createGrid() {
    //creating 100 divs 
    for (let i = 0; i < 100; i++) {
        const square = document.createElement("div")  //<== creating element using js
        
        square.classList.add('squareStyle')  //<==adding a class, to style to each newly created div

        grid.appendChild(square)  //<==put div elements into our grid

        squares.push(square)  //<== push square element into an array
    }
    console.log(squares)

}

createGrid()
