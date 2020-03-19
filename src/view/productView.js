import MockItemData from "../util/mockItemData.js";
import { EWA, calculateCoinSum } from "../util/util.js";
import { LOG_MESSAGE, ANIMATION_DURATION_TIME } from "../util/constants.js";

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
    this.productList = [];
  }

  toggleSelectedProduct(sum) {
    const selectedClassName = "selected";
    Array.prototype.forEach.call(this.productList, element => {
      const productPrice = element.querySelector(".item-price");
      if (productPrice.innerHTML <= sum) {
        element.classList.add(selectedClassName);
      } else element.classList.remove(selectedClassName);
    });
  }

  togglePurchasedProduct(data) {
    if (data.selectedNumber !== "") return;
    const purchasedProduct = this.getPurchasedProduct(data);
    const purchasedClassName = "purchased";
    for (let index = 0; index < this.productList.length; index += 1) {
      const productName = this.productList[index].querySelector(".item-name");
      if (productName.innerHTML === purchasedProduct) {
        this.productList[index].classList.add(purchasedClassName);
        setTimeout(() => {
          this.productList[index].classList.remove(purchasedClassName);
        }, ANIMATION_DURATION_TIME * 1000);
        break;
      }
    }
  }

  getPurchasedProduct(data) {
    const latestLog = data.logs[data.logs.length - 1];
    for (let index = 0; index < MockItemData.length; index += 1) {
      if (latestLog === LOG_MESSAGE.purchase(MockItemData[index].name)) return MockItemData[index].icon;
    }
    return "";
  }

  /**
   * 화면에 상품 데이터를 렌더링합니다. 사용자의 동전 투입 금액에 따라 상품 데이터 표시 방법에 변경이 있습니다.
   * @param {Object} data 사용자에게 전시할, 상품 데이터를 담은 객체를 인자로 받습니다.
   */
  render(data) {
    const sum = calculateCoinSum(data);
    if (this.hasRendered) {
      this.toggleSelectedProduct(sum);
      this.togglePurchasedProduct(data);
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
    this.productList = EWA(".product-item");
  }
}

export default ProductView;
