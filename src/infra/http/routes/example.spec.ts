import { test, expect } from "vitest";

test("1 + 1 deve ser 2", () => {
  expect(1 + 1).toBe(2);
});

test("soma de números negativos", () => {
  expect(-5 + -3).toBe(-8);
});

test("soma com zero", () => {
  expect(10 + 0).toBe(10);
  expect(0 + 7).toBe(7);
});

test("soma de números grandes", () => {
  expect(1000 + 2000).toBe(3000);
});
