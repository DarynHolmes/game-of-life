
function getNeighborCount(cells, rowIndex, cellIndex) {
    const row = cells[rowIndex]
    const topLeft = rowIndex === 0 || cellIndex === 0 ? 0 : cells[rowIndex - 1][cellIndex - 1] 
    const topCenter = rowIndex === 0 ? 0 : cells[rowIndex - 1][cellIndex]
    const topRight = rowIndex === 0 || cellIndex === row.length - 1 ? 0 : cells[rowIndex - 1][cellIndex + 1]

    const bottomLeft = rowIndex === row.length - 1 || cellIndex === 0 ? 0 : cells[rowIndex + 1][cellIndex - 1]
    const bottomCenter = rowIndex === row.length - 1 ? 0 : cells[rowIndex + 1][cellIndex]
    const bottomRight = rowIndex === row.length - 1  || cellIndex === row.length - 1 ? 0 : cells[rowIndex + 1][cellIndex + 1]

    const centerLeft = cellIndex === 0 ? 0 : cells[rowIndex][cellIndex - 1]
    const centerRight =  cellIndex === row.length - 1 ? 0 : cells[rowIndex][cellIndex + 1]
    
    return topLeft + topCenter + topRight + bottomLeft + bottomCenter + bottomRight + centerLeft + centerRight
}

export function nextGen(cells) {
  const newCells = []
  cells.forEach((row, rowIndex) => {
    const newRow = []
    row.forEach((cell, cellIndex) => {
      if (!cell) {
        newRow.push(0)
      } else {
        const neighborCount = getNeighborCount(cells, rowIndex, cellIndex)
        const cell = neighborCount === 2 ? 1 : 0
        newRow.push(cell)
      }
    })
    newCells.push(newRow)
  })
  return newCells
}