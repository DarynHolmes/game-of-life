import { nextGen } from "./population.js";
import { loadStructure } from "./structures.js";



const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext("2d");


let tickSpeed = 300;
let gameInterval;
let drawMode = true;
let population = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
]





const size = 800 / population.length


drawCells()

function drawCells() {

  for (let row = 0; row < population.length; row++) {

    for (let col = 0; col < population[row].length; col++) {
      let x = col * size
      let y = row * size
      const cell = population[row][col]
      ctx.fillStyle = cell === 1 ? "black" : "white";
      ctx.fillRect(x, y, size, size);
    }
  }
}


/////////RUN BUTTON
let running = false;
const btn = document.querySelector(".run-btn");
btn.addEventListener('click', function () {
  if (running) {
    running = false;
    btn.innerText = "Run";
    btn.style.backgroundColor = "Green";
    clearInterval(gameInterval);
  }
  else {
    running = true;
    btn.innerText = "Pause";
    btn.style.backgroundColor = "#8B100A";
    startGame();
  }
})




//////////Interactive

canvas.addEventListener('click', function (e) {
  if (!drawMode) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  let col = Math.floor(x / size);
  let row = Math.floor(y / size);
  population[row][col] = population[row][col] === 1 ? 0 : 1;
  drawCells();
})


////////SLIDER

document.querySelector(".slider").addEventListener('input', evt => {

  // this is used to invert slider value
  let value = 100 - evt.target.value;
  console.log(value);
  tickSpeed = value * 10;
  console.log(tickSpeed)
  if (running)
    startGame();
});

function startGame() {
  if (gameInterval)
    clearInterval(gameInterval);
  gameInterval = setInterval(() => {
    if (running) {
      population = nextGen(population)
      drawCells()
    }
  }, tickSpeed)
}


/////////selecting Premade Structure
const structureSelector = document.querySelector("#structure-selector");
let selectedStructure = 'glider';
structureSelector.addEventListener('change', () => {
  selectedStructure = structureSelector.value;
})
const structureButton = document.querySelector("#structure-button")
structureButton.addEventListener('click', () => {

  if (drawMode) {
    drawMode = false;
    structureButton.innerText = 'Draw pixels';
  } else {
    drawMode = true;
    structureButton.innerText = 'Draw Structure';
  }

})




/////// pre made Structures

canvas.addEventListener('click', function (e) {
  if (!selectedStructure) return;
  if (drawMode) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  let cStart = Math.floor(x / size);
  let rStart = Math.floor(y / size);
  loadStructure(population, selectedStructure, rStart, cStart);
  drawCells();


})



///////Reset Button
const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener('click', function () {
  for (let row = 0; row < population.length; row++) {
    for (let col = 0; col < population[row].length; col++) {
      population[row][col] = 0;
    }
  }
  drawCells();
})















