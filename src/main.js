import { nextGen } from "./population.js";


const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext("2d");


let tickSpeed = 300;
let population = [
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], 
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], 
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], 
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,], 
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0,], 
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], 
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,], 
  [0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0,], 
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], 
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0,], 
  [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], 
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], 
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,], 
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,], 
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], 
]

const size = 800 / population.length


drawCells()

setInterval(() => {
  if(running){
    population = nextGen(population)
    drawCells()
  }


}, tickSpeed)

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
btn.addEventListener('click', function(){
  if(running){
    running = false;
    btn.innerText = "RUN";
    btn.style.backgroundColor = "Green";
  }
  else{
    running = true;
    btn.innerText = "PAUSE";
    btn.style.backgroundColor = "#8B100A";
  }
})




//////////Interactive

canvas.addEventListener('click',function(e){
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  let col = Math.floor(x / size);
  let row = Math.floor(y / size);
  population[row][col] = population[row][col] === 1 ? 0 : 1;
  drawCells(); 
})


////////SLIDER

document.querySelector(".slider").addEventListener('input', evt =>{

  // this is used to invert slider value
  let value = 100 - evt.target.value ;
  console.log(value);
  tickSpeed = value * tickSpeed;
  console.log(tickSpeed)
});

////////SLIDER IS NOT WORKING 
// current problems
// tickspeeds get bigger and bigger
// also interval need to be stopped before updating tickSpeed (dont know how to do this)


