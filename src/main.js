

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext("2d");

const population = [
  [1, 0, 0], 
  [0, 0, 0], 
  [0, 0, 0]
]

let x = 0;
let y = 0;

const size = 300 / population.length

drawCells()

x = 0
y = 0

// get the next generation
population[0][0] = 0

setTimeout(drawCells, 1000)

function drawCells() {
    population.forEach(row => {
      row.forEach(cell => {
          ctx.fillStyle = cell === 1 ? "black" : "white";
          ctx.fillRect(x, y, size, size);
          x = x + size
      })
    x = 0
    y += size
  })
}





