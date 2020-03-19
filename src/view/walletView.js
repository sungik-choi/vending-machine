import { INCREASE_COIN, DECREASE_COIN } from "../action/coinAction.js";
import { calculateCoinSum } from "../util/util.js";
import { BUTTON_ID, STR_TO_NUM } from "../util/constants.js";

/**
 * @classdesc WalletView 사용자가 가지고 있는 동전의 개수를 보여주는 Class입니다.
 * @class WalletView
 */
class WalletView {
  constructor(target, vendingMachineModel, walletModel) {
    this.target = target;
    this.walletModel = walletModel;
    this.buttonClickHandler = this.buttonClickHandler.bind(this);
    this.render = this.render.bind(this);
    this.vendingMachineModel = vendingMachineModel;
    this.walletModel.subscribe(this.render);
    this.walletModel.dispatch({});
  }

  /**
   * 해당 View Class의 Button id에 해당하는 숫자값을 찾아 반환합니다.
   * @param {string} id Event(사용자가 숫자를 클릭하는 이벤트)가 발생한 부분의 id를 인자로 받습니다.
   * @return {number} 인자로 받은 id를 알맞은 숫자로 반환합니다.
   */
  getRightfulCoinWorth(id) {
    switch (id) {
      case BUTTON_ID.TEN_WON:
        return STR_TO_NUM.ten;
      case BUTTON_ID.FIFTY_WON:
        return STR_TO_NUM.fifty;
      case BUTTON_ID.HUNDRED_WON:
        return STR_TO_NUM.hundred;
      case BUTTON_ID.FIVE_HUNDRED_WON:
        return STR_TO_NUM.fiveHundred;
      case BUTTON_ID.THOUSAND_WON:
        return STR_TO_NUM.thousand;
      case BUTTON_ID.FIVE_THOUSAND_WON:
        return STR_TO_NUM.fiveThousand;
      case BUTTON_ID.TEN_THOUSAND_WON:
        return STR_TO_NUM.tenThousand;
      default:
    }
  }

  /**
   * 해당 View Class의 Button click 이벤트가 발생할 때, 이를 담당하는 Callback 함수입니다.
   * @param {Document.event} event 해당 View Class가 렌더링한 부분에서 발생하는 click event를 인자로 받습니다.
   */
  buttonClickHandler(event) {
    const { target } = event;
    const coinWorth = this.getRightfulCoinWorth(target.id);
    if (!coinWorth) return;
    if (!this.walletModel.isCoinCountZero(coinWorth)) {
      this.walletModel.dispatch.call(this.walletModel, [
        { type: DECREASE_COIN, payload: coinWorth }
      ]);
      this.vendingMachineModel.dispatch.call(this.vendingMachineModel, [
        { type: INCREASE_COIN, payload: coinWorth }
      ]);
    }
  }

  /**
   * 해당 View Class에 필요한 event를 달아줍니다.
   */
  addEvents() {
    this.target.addEventListener("click", this.buttonClickHandler);
  }

  /**
   * 해당 View Class에 필요없는 event를 없애줍니다.
   */
  removeEvents() {
    this.target.removeEventListener("click", this.buttonClickHandler);
  }

  /**
   * 화면에 사용자가 가지고 있는 동전 데이터를 렌더링합니다.
   * @param {Object} data 사용자가 가지고 있는 동전 데이터를 담은 객체를 인자로 받습니다.
   */
  render(data) {
    const {
      ten,
      fifty,
      hundred,
      fiveHundred,
      thousand,
      fiveThousand,
      tenThousand
    } = data;
    const sum = calculateCoinSum(data);

    this.removeEvents();
    this.target.innerHTML = `<ul>
          <li>
            <button id=${BUTTON_ID.TEN_WON}>10원</button>
            <div><span>${ten}</span></div>
          </li>
          <li>
            <button id=${BUTTON_ID.FIFTY_WON}>50원</button>
            <div><span>${fifty}</span></div>
          </li>
          <li>
            <button id=${BUTTON_ID.HUNDRED_WON}>100원</button>
            <div><span>${hundred}</span></div>
          </li>
          <li>
            <button id=${BUTTON_ID.FIVE_HUNDRED_WON}>500원</button>
            <div><span>${fiveHundred}</span></div>
          </li>
          <li>
            <button id=${BUTTON_ID.THOUSAND_WON}>1000원</button>
            <div><span>${thousand}</span></div>
          </li>
          <li>
            <button id=${BUTTON_ID.FIVE_THOUSAND_WON}>5000원</button>
            <div><span>${fiveThousand}</span></div>
          </li>
          <li>
            <button id=${BUTTON_ID.TEN_THOUSAND_WON}>10000원</button>
            <div><span>${tenThousand}</span></div>
          </li>
        </ul>
        <div class="wallet-sum"><b>${sum}원</b></div>`;
    this.addEvents();
  }
}

export default WalletView;
