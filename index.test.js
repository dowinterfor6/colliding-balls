const solution = require("./index");

describe("Ball collision", () => {
  it("should pass [1, -1, 1], [3, 2, 5] test case", () => {
    const directions = [1, -1, 1];
    const strengths = [3, 2, 5];

    expect(solution(directions, strengths)).toEqual([0, 2]);
  });

  it("should pass [-1, 1, -1], [2, 3, 4] test case", () => {
    const directions = [-1, 1, -1];
    const strengths = [2, 3, 4];

    expect(solution(directions, strengths)).toEqual([0, 2]);
  });

  it("should pass [1, -1, -1], [2, 1, 3] test case", () => {
    const directions = [1, -1, -1];
    const strengths = [2, 1, 3];

    expect(solution(directions, strengths)).toEqual([2]);
  });
});