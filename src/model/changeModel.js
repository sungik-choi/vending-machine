import { GIVE_CHANGES, GET_BACK_CHANGES } from "../action/changeAction.js";

/**
 * @classdesc ChangeModel WalletModel과 VendingMachineModel을 이어주는 Class입니다.
 * 자판기에서 반환되는 동전 데이터는 이 모델을 지나갑니다.
 * @class ChangeModel
 */
class ChangeModel {
  constructor(walletModel) {
    this.walletModel = walletModel;
  }

  /**
   * @desc 데이터를 변경 후, 구독자에게 데이터의 변경을 알려줍니다.
   * @param {Array} userAction 특정 행동을 정의한 Action을 인자로 받습니다.
   */
  dispatch(userAction) {
    const [action] = userAction;
    const { type, payload } = action;
    switch (type) {
      case GIVE_CHANGES:
        this.walletModel.dispatch.call(this.walletModel, [
          { type: GET_BACK_CHANGES, payload }
        ]);
        break;
      default:
        break;
    }
  }
}

export default ChangeModel;
