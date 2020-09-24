import CalculateService from "./calculate.service";

//jest.mock("./calculate.service");

it("correct base calculation", () => {
  const result = CalculateService.calculate("110", false, false, 10.11, 5, 2);
  expect(result).toBe(15.165);
});

it("correct custom1 calculation", () => {
  const result = CalculateService.calculate("111", true, false, 10.11, 5, 2);
  expect(result).toBe(20.7255);
});

it("correct custom2 calculation", () => {
  const result = CalculateService.calculate("101", false, true, 10.12, 5, 3);
  expect(result).toBe(13.626);
});

it("custom1 with custom2", () => {
  const result = CalculateService.calculate("110", true, true, 10.13, 5, 3);
  expect(result).toBe(9.117);
});

it("null if option is not allowed", () => {
  const result = CalculateService.calculate("000", false, false, 10.13, 5, 3);
  expect(result).toBeNull();
});
