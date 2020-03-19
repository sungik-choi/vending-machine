import MockItemData from "../util/mockItemData.js";
import { calculateCoinSum } from "../util/util.js";

/**
 * @classdesc ProductView 사용자에게 판매하는 데이터를 렌더링하는 Class입니다.
 * @class ProductView
 */
class ProductView {
  constructor(target, vendingMachineModel) {
    this.target = target;
    this.vendingMachineModel = vendingMachineModel;
    this.render = this.render.bind(this);
    this.vendingMachineModel.subscribe(this.render);
    this.hasRendered = false;
  }

  toogleSelectedProduct(sum) {
    const productElements = this.target.firstElementChild.children;
    const selectedClassName = "selected";
    Array.prototype.forEach.call(productElements, element => {
      const elementPrice = element.lastElementChild.innerHTML;
      if (elementPrice <= sum) {
        element.classList.add(selectedClassName);
      } else element.classList.remove(selectedClassName);
    });
  }

  /**
   * 화면에 상품 데이터를 렌더링합니다. 사용자의 동전 투입 금액에 따라 상품 데이터 표시 방법에 변경이 있습니다.
   * @param {Object} data 사용자에게 전시할, 상품 데이터를 담은 객체를 인자로 받습니다.
   */
  render(data) {
    const sum = calculateCoinSum(data);
    if (this.hasRendered) {
      this.toogleSelectedProduct(sum);
      return;
    }
    this.hasRendered = true;
    const liHtml = MockItemData.reduce((liChunk, item) => {
      const { id, name, price, icon } = item;
      let li = `<li class="product-item">`;
      li += `<span class="item-index">${id}</span><div class="item-name">${icon}</div><span class="item-price">${price}</span></li>`;
      liChunk += li;
      return liChunk;
    }, "");
    this.target.innerHTML = `<ul class="product-list">
      ${liHtml}
    </ul>`;
  }
}

export default ProductView;
