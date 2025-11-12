export const structures = {
  glider: [
    [0, 0, 1],
    [1, 0, 1],
    [0, 1, 1]
  ],
  beehive: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [0, 1, 1, 0]
  ],
  boat: [
    [1, 1, 0],
    [1, 0, 1],
    [0, 1, 0]
  ],
  blinker: [
    [1, 1, 1]
  ],
  toad: [
    [0, 1, 1, 1],
    [1, 1, 1, 0]
  ],
  beacon: [
    [1, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 1, 1],
    [0, 0, 1, 1]
  ]

}


export function loadStructure(population, name, rStart, cStart) {
  const structure = structures[name];
  const structureRows = structure.length;
  const structureCols = structure[0].length;
  if (rStart + structureRows > population.length ||
    cStart + structureCols > population[0].length) {
    return;
  }


  for (let row = 0; row < structure.length; row++) {
    for (let col = 0; col < structure[row].length; col++) {
      population[rStart + row][cStart + col] = structure[row][col];
    }
  }
}