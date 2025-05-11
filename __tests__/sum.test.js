// __tests__/sum.test.js
import { sum } from '../code-to-unit-test/sum.js';

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

test('adds 1 + 2 to equal 3 using sum function', () => {
  expect(sum(1, 2)).toBe(3);
});

import { add, subtract } from './math.js';
test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});
test('subtracts 5 - 2 to equal 3', () => {
  expect(subtract(5, 2)).toBe(3);
});
