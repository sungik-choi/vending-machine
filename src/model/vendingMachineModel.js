import Model from "./model.js";
import { INCREASE_COIN } from "../action/coinAction.js";
import { NUMBER_INPUT } from "../action/numberButtonAction.js";
import { calculateCoinSum, calculateChanges } from "../util/util.js";
import { LOG_MESSAGE, SELECTED_NUMBER_MAX_LENGTH, NUM_TO_STR, STR_TO_NUM, TIMER_SEC } from "../util/constants.js";
import MockItemData from "../util/mockItemData.js";
import { GIVE_CHANGES } from "../action/changeAction.js";

/**
 * @classdesc VendingMachineModel 자판기에서 사용하는 데이터를 모아놓은 모델 Class입니다.
 * VendingMachineModel 속 데이터가 변하면, 구독자에게 데이터가 변한 사실을 알려줍니다.
 * @class VendingMachineModel
 */
class VendingMachineModel extends Model {
  constructor(changeModel) {
    super();
    this.state = {
      ten: 0,
      fifty: 0,
      hundred: 0,
      fiveHundred: 0,
      thousand: 0,
      fiveThousand: 0,
      tenThousand: 0,
      logs: [LOG_MESSAGE.startMessage],
      selectedNumber: "",
    };
    this.changeModel = changeModel;
    this.timer = null;
  }

  /**
   * 선택된 번호가 있는지 확인하는 함수입니다.
   * @return {boolean} 모델이 보관하고 있는 state 중 선택된 번호(selectedNumber)가 있는지 여부를 확인합니다.
   */
  hasSelectedNumber() {
    return this.state.selectedNumber.length !== 0;
  }

  /**
   * 선택된 번호가 2자리를 넘는지 확인하는 함수입니다.
   * @return {boolean} 모델이 보관하고 있는 state 중 선택된 번호(selectedNumber)가 허용된 길이를 초과하는지 확인합니다.
   */
  hasSelectedNumberReachedLimit() {
    return this.state.selectedNumber.length >= SELECTED_NUMBER_MAX_LENGTH;
  }

  hasProperSelectedNumber(num) {
    return MockItemData.some(data => data.id === num);
  }

  hasEnoughMoney(item, money) {
    return item.price <= money;
  }

  findTargetNameAndLog(targetNumber) {
    const rightFulString = NUM_TO_STR[`${targetNumber}`];
    return [rightFulString, LOG_MESSAGE[`${rightFulString}`]];
  }

  selectSubmitLogMessage(num, item) {
    if (!this.hasProperSelectedNumber(num)) {
      return LOG_MESSAGE.notRightIndex;
    }
    if (!this.hasEnoughMoney(item, calculateCoinSum(this.state))) {
      return LOG_MESSAGE.notEnoughMoney(item.price);
    }
    return this.purchaseSelectedProduct(item);
  }

  initializeCoin() {
    return {
      ...this.state,
      ten: 0,
      fifty: 0,
      hundred: 0,
      fiveHundred: 0,
      thousand: 0,
      fiveThousand: 0,
      tenThousand: 0,
    };
  }

  getChangeFromStatus() {
    const change = { ...this.state };
    delete change.logs;
    delete change.selectedNumber;
    return change;
  }

  purchaseSelectedProduct(item) {
    clearTimeout(this.timer);
    const insertedCoin = this.getChangeFromStatus();
    const change = calculateChanges(insertedCoin, item.price);
    this.getBackChange(change);
    return LOG_MESSAGE.purchase(item.name);
  }

  getBackChange(change) {
    this.changeModel.dispatch([{ type: GIVE_CHANGES, payload: change }]);
    this.state = this.initializeCoin();
    this.notify.call(this, [this.state]);
  }

  getBackChangeAfterTimer() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      const change = this.getChangeFromStatus();
      this.state = {
        ...this.state,
        selectedNumber: "",
        logs: [...this.state.logs, LOG_MESSAGE.timeout(TIMER_SEC)],
      };
      this.getBackChange(change);
    }, TIMER_SEC * 1000);
  }

  dispatchTypeIncreaseCoin(payload) {
    const [targetPropertyName, logMessage] = this.findTargetNameAndLog(payload);
    this.state = {
      ...this.state,
      logs: [...this.state.logs, logMessage],
    };
    this.state[`${targetPropertyName}`] = this.state[`${targetPropertyName}`] + 1;
    this.getBackChangeAfterTimer();
  }

  dispatchTypeNumberInput(payload) {
    if (payload === STR_TO_NUM.submit || payload === STR_TO_NUM.cancel) {
      const selectedNumber = "";
      let logMessage = "";
      if (payload === STR_TO_NUM.submit) {
        const selectedNum = parseInt(this.state.selectedNumber);
        const selectedItem = MockItemData[selectedNum - 1];
        logMessage = this.selectSubmitLogMessage(selectedNum, selectedItem);
      }
      if (payload === STR_TO_NUM.cancel) {
        logMessage = LOG_MESSAGE.cancel;
      }
      this.state = { ...this.state, selectedNumber, logs: [...this.state.logs, logMessage] };
    } else if (!this.hasSelectedNumberReachedLimit()) {
      this.state = {
        ...this.state,
        selectedNumber: this.state.selectedNumber + payload,
      };
    }
  }

  /**
   * @desc 데이터를 변경 후, 구독자에게 데이터의 변경을 알려줍니다.
   * @param {Array} userAction 특정 행동을 정의한 Action을 인자로 받습니다.
   */
  dispatch(userAction) {
    if (!Array.isArray(userAction)) {
      this.notify.call(this, [this.state]);
      return;
    }
    const [action] = userAction;
    const { type, payload } = action;
    switch (type) {
      case INCREASE_COIN:
        this.dispatchTypeIncreaseCoin(payload);
        break;
      case NUMBER_INPUT:
        this.dispatchTypeNumberInput(payload);
        break;
      default:
        break;
    }
    this.notify.call(this, [this.state]);
  }
}

export default VendingMachineModel;
