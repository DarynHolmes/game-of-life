import { expect, test } from 'vitest'
import { nextGen } from './population.js'

test('Any live cell with fewer than two live neighbors dies', () => {
  // Given
  const cells = [
    [1, 0, 0], 
    [0, 0, 0], 
    [0, 0, 0]
  ]
  const expected = [
    [0, 0, 0], 
    [0, 0, 0], 
    [0, 0, 0]
  ]
  
  // When 
  const actual = nextGen(cells) // magic
  
  // Then
  expect(actual[0][0]).toBe(expected[0][0])
  expect(actual).toStrictEqual(expected)
})

// Failing test, make it pass, refactor 
// TDD
test('Any live cell with two live neighbors on the top row lives on to the next generation', () => {
  // Given
  const cells = [
    [1, 1, 1], 
    [0, 0, 0], 
    [0, 0, 0]
  ]
  const expected = [
    [0, 1, 0], 
    [0, 0, 0], 
    [0, 0, 0]
  ]
  // When 
  const actual = nextGen(cells) // magic
  // Then
  expect(actual[0][1]).toBe(1)
  expect(actual[0][0]).toBe(0)
  expect(actual[0][2]).toBe(0)
  expect(actual).toStrictEqual(expected)
})

test('Any live cell with two live neighbors anywhere lives on to the next generation', () => {
  // Given
  const cells = [
    [1, 0, 0], 
    [0, 1, 0], 
    [0, 0, 1]
  ]
  const expected = [
    [0, 0, 0], 
    [0, 1, 0], 
    [0, 0, 0]
  ]
  // When 
  const actual = nextGen(cells) // magic
  // Then
  expect(actual[1][1]).toBe(1)
  expect(actual[0][0]).toBe(0)
  expect(actual).toStrictEqual(expected)
})