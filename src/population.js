
const  getCellValue = (population, row, col) =>  population[row]?.[col] ?? 0

export const nextGen = (population) => Array.from(
    { length: population.length }, 
    (_, row) => Array.from({ length: population.length }, 
      (_, col) => {
        const leftNeighbor = getCellValue(population, row, col - 1)
        const rightNeighbor = getCellValue(population, row, col + 1)
        
        let topLeftNeighbor = getCellValue(population, row - 1, col - 1)
        let topCenterNeighbor = getCellValue(population, row - 1, col)
        let topRightNeighbor = getCellValue(population, row - 1, col + 1)

        let bottomLeftNeighbor = getCellValue(population, row + 1, col - 1)
        let bottomCenterNeighbor = getCellValue(population, row + 1, col)
        let bottomRightNeighbor = getCellValue(population, row + 1, col + 1)

        const neighborCount = leftNeighbor + rightNeighbor + 
                              topLeftNeighbor + topCenterNeighbor + topRightNeighbor + 
                              bottomLeftNeighbor + bottomCenterNeighbor + bottomRightNeighbor
        

        if (population[row][col] === 0) {
          return neighborCount === 3 ? 1 : 0
        }  
                              
        return (neighborCount === 2 || neighborCount === 3) ? 1 : 0 
    }))