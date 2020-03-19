import { EW, calculateCoinSum } from "../util/util.js";
import {
  MESSAGE_BOX_CLASS,
  MAX_MESSAGE_BOX_SCROLL_LENGTH,
  NUMBER_BUTTON_ID,
  STR_TO_NUM
} from "../util/constants.js";
import { NUMBER_INPUT } from "../action/numberButtonAction.js";

/**
 * @classdesc SelectView 사용자가 자판기와 interaction하는 결과를 보여주는 Class입니다.
 * 사용자는 자신의 선택을 로그(log)처럼 볼 수 있습니다.
 * 사용자가 고른 숫자를 볼 수 있습니다.
 * 사용자가 고른 음료수를 볼 수 있습니다.
 * @class SelectView
 */
class SelectView {
  constructor(target, vendingMachineModel) {
    this.target = target;
    this.vendingMachineModel = vendingMachineModel;
    this.numberButtonClickHandler = this.numberButtonClickHandler.bind(this);
    this.render = this.render.bind(this);
    this.vendingMachineModel.subscribe(this.render);
    this.vendingMachineModel.dispatch({});
  }

  /**
   *  사용자에게 보여주는 로그창의 스크롤을 맨 아래로 설정합니다.
   */
  setMessageWindowScollToBottom() {
    EW(`.${MESSAGE_BOX_CLASS}`).scrollTop = MAX_MESSAGE_BOX_SCROLL_LENGTH;
  }

  /**
   * 해당 View Class의 button id에 해당하는 숫자값을 찾아 반환합니다.
   * @param {string} id event(사용자가 숫자를 클릭하는 이벤트)가 발생한 부분의 id를 인자로 받습니다.
   * @return {number} 인자로 받은 id를 알맞은 숫자로 반환합니다.
   */
  getRightfulButtonWorth(id) {
    switch (id) {
      case NUMBER_BUTTON_ID.ZERO:
        return STR_TO_NUM[`${NUMBER_BUTTON_ID.ZERO}`];
      case NUMBER_BUTTON_ID.ONE:
        return STR_TO_NUM[`${NUMBER_BUTTON_ID.ONE}`];
      case NUMBER_BUTTON_ID.TWO:
        return STR_TO_NUM[`${NUMBER_BUTTON_ID.TWO}`];
      case NUMBER_BUTTON_ID.THREE:
        return STR_TO_NUM[`${NUMBER_BUTTON_ID.THREE}`];
      case NUMBER_BUTTON_ID.FOUR:
        return STR_TO_NUM[`${NUMBER_BUTTON_ID.FOUR}`];
      case NUMBER_BUTTON_ID.FIVE:
        return STR_TO_NUM[`${NUMBER_BUTTON_ID.FIVE}`];
      case NUMBER_BUTTON_ID.SIX:
        return STR_TO_NUM[`${NUMBER_BUTTON_ID.SIX}`];
      case NUMBER_BUTTON_ID.SEVEN:
        return STR_TO_NUM[`${NUMBER_BUTTON_ID.SEVEN}`];
      case NUMBER_BUTTON_ID.EIGHT:
        return STR_TO_NUM[`${NUMBER_BUTTON_ID.EIGHT}`];
      case NUMBER_BUTTON_ID.NINE:
        return STR_TO_NUM[`${NUMBER_BUTTON_ID.NINE}`];
      case NUMBER_BUTTON_ID.SUBMIT:
        return STR_TO_NUM[`${NUMBER_BUTTON_ID.SUBMIT}`];
      case NUMBER_BUTTON_ID.CANCEL:
        return STR_TO_NUM[`${NUMBER_BUTTON_ID.CANCEL}`];
      default:
    }
  }

  /**
   * 해당 View Class의 button click 이벤트가 발생할 때, 이를 담당하는 Callback 함수입니다.
   * @param {Document.event} event 해당 View Class가 렌더링한 부분에서 발생하는 Click Event를 인자로 받습니다.
   */
  numberButtonClickHandler(event) {
    const { target } = event;
    const buttonWorth = this.getRightfulButtonWorth(target.id);
    if (buttonWorth === undefined) return;
    this.vendingMachineModel.dispatch.call(this.vendingMachineModel, [
      { type: NUMBER_INPUT, payload: buttonWorth }
    ]);
  }

  /**
   * 해당 View Class에 필요한 event를 달아줍니다.
   */
  addEvents() {
    this.target.addEventListener("click", this.numberButtonClickHandler);
  }

  /**
   * 해당 View Class에 필요없는 event를 없애줍니다.
   */
  removeEvents() {
    this.target.removeEventListener("click", this.numberButtonClickHandler);
  }

  /**
   * 화면에 사용자와 자판기가 상호 작용한 데이터를 렌더링합니다.
   * 사용자가 선택한 숫자, 사용자가 선택한 음료수, 오류 메시지 등 사용자가 자판기와 나눴던 모든 행동들을 보여줍니다.
   * @param {Object} data 사용자에게 전시할, 사용자와 자판기 간 interaction 데이터를 담은 객체를 인자로 받습니다.
   */
  render(data) {
    const sum = calculateCoinSum(data);
    const { logs, selectedNumber } = data;
    this.removeEvents();
    this.target.innerHTML = `<div class="price-window"><div class="select-number">${selectedNumber}</div><b class="price-input">${sum}</b></div>
      <div class="select-button-wrap">
        <ul class="select-button-list">
          <li><button id=${NUMBER_BUTTON_ID.ONE}>1</button></li>
          <li><button id=${NUMBER_BUTTON_ID.TWO}>2</button></li>
          <li><button id=${NUMBER_BUTTON_ID.THREE}>3</button></li>
          <li><button id=${NUMBER_BUTTON_ID.FOUR}>4</button></li>
          <li><button id=${NUMBER_BUTTON_ID.FIVE}>5</button></li>
          <li><button id=${NUMBER_BUTTON_ID.SIX}>6</button></li>
          <li><button id=${NUMBER_BUTTON_ID.SEVEN}>7</button></li>
          <li><button id=${NUMBER_BUTTON_ID.EIGHT}>8</button></li>
          <li><button id=${NUMBER_BUTTON_ID.NINE}>9</button></li>
          <li><button class="command" id=${
            NUMBER_BUTTON_ID.CANCEL
          }>취소</button></li>
          <li><button id=${NUMBER_BUTTON_ID.ZERO}>0</button></li>
          <li><button class="command" id=${
            NUMBER_BUTTON_ID.SUBMIT
          }>입력</button></li>
        </ul>
      </div>
      <div class="message-window">
        <ol class=${MESSAGE_BOX_CLASS}>
        ${logs.reduce((liHTML, log) => (liHTML += `<li>${log}</li>`), "")}
        </ol>
      </div>`;

    this.setMessageWindowScollToBottom();
    this.addEvents();
  }
}

export default SelectView;
