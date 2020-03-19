import { calculateCoinSum } from "../src/util/util";

test("코인 합 계산 테스트 1 - 코인 합 11920원", () => {
  const inputCoins = {
    ten: 2,
    fifty: 0,
    hundred: 4,
    fiveHundred: 1,
    thousand: 1,
    fiveThousand: 0,
    tenThousand: 1
  };
  const sum = calculateCoinSum(inputCoins);
  expect(sum).toBe(11920);
});

test("코인 합 계산 테스트 2 - 코인 합 0원", () => {
  const inputCoins = {
    ten: 0,
    fifty: 0,
    hundred: 0,
    fiveHundred: 0,
    thousand: 0,
    fiveThousand: 0,
    tenThousand: 0
  };
  const sum = calculateCoinSum(inputCoins);
  expect(sum).toBe(0);
});

test("코인 합 계산 테스트 3 어떤 property가 존재하지 않을 때 - 코인 합 860원", () => {
  const inputCoins = {
    ten: 1,
    fifty: 1,
    hundred: 3,
    fiveHundred: 1
  };
  const sum = calculateCoinSum(inputCoins);
  expect(sum).toBe(860);
});

test("코인 합 계산 테스트 4 빈 객체일 때 - 코인 합 0원", () => {
  const inputCoins = {};
  const sum = calculateCoinSum(inputCoins);
  expect(sum).toBe(0);
});
