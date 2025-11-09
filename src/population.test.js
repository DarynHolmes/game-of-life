import { expect, test } from 'vitest'
import { nextGen } from './population.js'

// TDD
// write a failing test, make it pass, refactor 
// red, green, refactor 

test('Any live cell with fewer than two live neighbors dies', () => {
  // Given
  const cells = [
    [1, 0, 0], 
    [0, 0, 1], 
    [0, 0, 1]
  ]
  // When 
  const actual = nextGen(cells) // magic
  // Then
  expect(actual[0][0]).toBe(0)
  expect(actual[1][2]).toBe(0)
  expect(actual[2][2]).toBe(0)
  expect(actual.length).toBe(cells.length)
  expect(actual[0].length).toBe(cells[0].length)
})

test('Any live cell with two horizontal live neighbors lives on to the next generation', () => {
  // Given
  const cells = [
    [1, 1, 1], 
    [0, 0, 0], 
    [0, 0, 0]
  ]
  // When 
  const actual = nextGen(cells) // magic
  // Then
  expect(actual[0][1]).toBe(1)
})

test('Any live cell with three live neighbors lives on to the next generation', () => {
  // Given
  const cells = [
    [1, 1, 1], 
    [0, 1, 0], 
    [0, 0, 0]
  ]
  // When 
  const actual = nextGen(cells) // magic
  // Then
  expect(actual[0][1]).toBe(1)
  expect(actual[0][0]).toBe(1)
  expect(actual[0][2]).toBe(1)
  expect(actual[1][1]).toBe(1)

})


test('Any live cell with more than three live neighbors die', () => {
  // Given
  const cells = [
    [1, 1, 1], 
    [0, 1, 0], 
    [0, 0, 1]
  ]
  // When 
  const actual = nextGen(cells) // magic
  // Then
  expect(actual[1][1]).toBe(0)
})


test('Any dead cell with exactly three live neighbors becomes a live cell', () => {
  // Given
  const cells = [
    [0, 1, 0], 
    [1, 1, 0], 
    [0, 1, 0]
  ]
  // When 
  const actual = nextGen(cells) // magic
  // Then
  expect(actual[1][0]).toBe(1)
})


test('Any dead cell with exactly two live neighbors remains dead', () => {
  // Given
  const cells = [
    [0, 1, 0], 
    [0, 1, 0], 
    [0, 0, 0]
  ]
  // When 
  const actual = nextGen(cells) // magic
  // Then
  expect(actual[1][0]).toBe(0)
})