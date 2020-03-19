import Model from "./model.js";
import { DECREASE_COIN } from "../action/coinAction.js";
import { NUM_TO_STR } from "../util/constants.js";
import { GET_BACK_CHANGES } from "../action/changeAction.js";

/**
 * @classdesc WalletModel 사용자가 현재 소유하고 있는 동전데이터를 모아놓은 모델 Class입니다.
 * WalletModel 속 데이터가 변하면, 구독자에게 데이터가 변한 사실을 알려줍니다.
 * @class WalletModel
 */
class WalletModel extends Model {
  constructor() {
    super();
    this.state = {
      ten: 4,
      fifty: 3,
      hundred: 6,
      fiveHundred: 4,
      thousand: 2,
      fiveThousand: 1,
      tenThousand: 1,
    };
  }

  /**
   * Coin개수가 0인지 확인하는 함수입니다.
   * @param {number} target 동전의 가치(e.g. 10원 -> 10)를 인자로 받습니다.
   * @return {boolean} target의 동전 개수가 0인지 여부를 반환합니다.
   */
  isCoinCountZero(target) {
    return this.state[NUM_TO_STR[`${target}`]] === 0;
  }

  addChangetoWallet(payload) {
    return {
      ten: this.state.ten + payload.ten,
      fifty: this.state.fifty + payload.fifty,
      hundred: this.state.hundred + payload.hundred,
      fiveHundred: this.state.fiveHundred + payload.fiveHundred,
      thousand: this.state.thousand + payload.thousand,
      fiveThousand: this.state.fiveThousand + payload.fiveThousand,
      tenThousand: this.state.tenThousand + payload.tenThousand,
    };
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
      case DECREASE_COIN:
        const targetPropertyName = NUM_TO_STR[`${payload}`];
        this.state = {
          ...this.state,
        };
        this.state[`${targetPropertyName}`] = this.state[`${targetPropertyName}`] - 1;
        break;
      case GET_BACK_CHANGES:
        this.state = this.addChangetoWallet(payload);
        break;
      default:
        break;
    }
    this.notify.call(this, [this.state]);
  }
}

export default WalletModel;
