import { calculateChanges, calculateCoinSum } from "../src/util/util.js";

let inputCoins;
beforeEach(() => {
  inputCoins = {
    ten: 4,
    fifty: 3,
    hundred: 6,
    fiveHundred: 4,
    thousand: 2,
    fiveThousand: 1,
    tenThousand: 1
  };
});

test("잔돈 반환 테스트 1 천원 단위 - 음료수 가격 5900원", () => {
  const sum = calculateCoinSum(inputCoins);
  const beverageValue = 5900;
  const changeCoins = calculateChanges(inputCoins, beverageValue);
  const changeSum = calculateCoinSum(changeCoins);
  expect(changeSum + beverageValue).toBe(sum);
});

test("잔돈 반환 테스트2 천원 단위 - 음료수 가격 4900원", () => {
  const sum = calculateCoinSum(inputCoins);
  const beverageValue = 4900;
  const changeCoins = calculateChanges(inputCoins, beverageValue);
  const changeSum = calculateCoinSum(changeCoins);
  expect(changeSum + beverageValue).toBe(sum);
});

test("잔돈 반환 테스트3 백원 단위- 음료수 가격 900원", () => {
  const sum = calculateCoinSum(inputCoins);
  const beverageValue = 900;
  const changeCoins = calculateChanges(inputCoins, beverageValue);
  const changeSum = calculateCoinSum(changeCoins);
  expect(changeSum + beverageValue).toBe(sum);
});

test("잔돈 반환 테스트4 만원 단위- 음료수 가격 12930원", () => {
  const sum = calculateCoinSum(inputCoins);
  const beverageValue = 12930;
  const changeCoins = calculateChanges(inputCoins, beverageValue);
  const changeSum = calculateCoinSum(changeCoins);
  expect(changeSum + beverageValue).toBe(sum);
});

test("잔돈 반환 테스트5 십원 단위- 음료수 가격 50원", () => {
  const sum = calculateCoinSum(inputCoins);
  const beverageValue = 50;
  const changeCoins = calculateChanges(inputCoins, beverageValue);
  const changeSum = calculateCoinSum(changeCoins);
  expect(changeSum + beverageValue).toBe(sum);
});
