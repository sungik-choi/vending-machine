import { CHANGES_CALCULATE_ORDER_LIST } from "./constants.js";

/**
 * @function EW
 * @desc document.querySelector를 프로젝트 내에서 짧게 활용하기 위해서 함수를 제작했습니다.
 * @param {string} target target에 해당하는 DOM Element를 반환합니다.
 */
export const EW = target => document.querySelector(target);

/**
 * @function EWA
 * @desc document.querySelectorAll를 프로젝트 내에서 짧게 활용하기 위해서 함수를 제작했습니다.
 * @param {string} target target에 해당하는 모든 DOM Element를 반환합니다.
 */
export const EWA = target => document.querySelectorAll(target);

/**
 * @function calculateCoinSum
 * @desc 동전 개수를 기반으로 동전 가치의 총합을 구합니다.
 * @param {object} data 동전 개수를 가지고 있는 data를 받습니다.
 * @return 동전의 총합을 반환합니다.
 */
export const calculateCoinSum = data => {
  const { ten, fifty, hundred, fiveHundred, thousand, fiveThousand, tenThousand } = data;

  const sum =
    (ten ? ten * 10 : 0) +
    (fifty ? fifty * 50 : 0) +
    (hundred ? hundred * 100 : 0) +
    (fiveHundred ? fiveHundred * 500 : 0) +
    (thousand ? thousand * 1000 : 0) +
    (fiveThousand ? fiveThousand * 5000 : 0) +
    (tenThousand ? tenThousand * 10000 : 0);

  return sum;
};

/**
 * @function calculateChanges
 * @desc 가지고 있는 동전의 개수와 사고자 하는 물품의 가치를 입력하면 잔돈 객체를 동전 개수 형태로 반환합니다.
 * @param {object} inputCoins 동전 개수를 모은 객체를 인자로 받습니다.
 * @param {number} beveragePrice 음료수 가격을 인자로 받습니다.
 * @return 잔돈을 모은 동전 객체를 반환합니다. inputCoin과 다른 새로운 객체입니다.
 */
export const calculateChanges = (inputCoins, beveragePrice) => {
  const changeCoins = { ...inputCoins };
  let beverageChange = beveragePrice;

  for (const [value, str] of CHANGES_CALCULATE_ORDER_LIST) {
    if (beverageChange < 0) {
      break;
    }
    beverageChange -= value * changeCoins[`${str}`];
    changeCoins[`${str}`] = 0;
  }

  if (beverageChange < 0) {
    beverageChange *= -1;
    while (beverageChange > 0) {
      for (const [value, str] of CHANGES_CALCULATE_ORDER_LIST) {
        if (beverageChange >= value) {
          beverageChange -= parseInt(value);
          changeCoins[`${str}`] += 1;
          break;
        }
      }
    }
  }
  return changeCoins;
};
