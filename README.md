# 웹 자판기

![screenshot](https://user-images.githubusercontent.com/58209009/76308550-ee55cf80-62c2-11ea-81cd-d8db2ca9ad83.png)

## 마크업 구조

![structure](https://user-images.githubusercontent.com/58209009/76302739-6bc81280-62b8-11ea-8c24-856b788949ba.png)

- 상품 화면: `div.product`
  - 상품 리스트: `ul.product-list`
  - 상품 개별 리스트: `li.product-item`
    - 상품 번호: `item-index`
    - 상품 이름(이모지): `item-name`
    - 상품 가격: `item-price`
- 상품 선택 화면: `div.selector`
  - 가격 및 금액 출력창: `div.price-window`
  - 숫자 버튼 리스트: `ul.select-button-list`
  - 취소, 입력 버튼 클래스: `button.command`
  - 이벤트 출력 창: `div.message-window`
  - 이벤트 메세지 리스트: `ol.message`
- 지갑 화면: `div.wallet`
  - 총 금액: `div.wallet-sum`

## CSS

- SASS 사용해서 스타일 시트 작성 후 `node-sass`를 통해 CSS로 변환
- `grid`, `flex` 사용

## JavaScript

```js
// Main.js
import ProductView from "./view/productView.js";
import SelectView from "./view/selectView.js";
import WalletView from "./view/walletView.js";
import WalletModel from "./model/walletModel.js";
import VendingMachineModel from "./model/vendingMachineModel.js";
import { EW } from "./util/util.js";

const walletModel = new WalletModel();
const vendingMachineModel = new VendingMachineModel();

const product = EW(".product");
const selector = EW(".selector");
const wallet = EW(".wallet");

const productView = new ProductView(product, vendingMachineModel);
const selectView = new SelectView(selector, vendingMachineModel);
const walletView = new WalletView(wallet, vendingMachineModel, walletModel);
```

1. WalletModel 클래스를 new 로 새로운 객체를 만들어 리턴
2. WalletModel 객체 생성자 내부의 super() 코드 탐색
3. Model 생성자 내부의 models 프로퍼티 정의
4. WalletModel 객체 생성자 내부의 프로퍼티 정의
5. new VendingMachineModel(); (1과 동일)
6. VendingMachineModel 로 2 ~ 4번 과정 진행
7. EW 를 사용해 도큐먼트의 엘리멘트들 변수에 담기
8. new ProductView(엘리멘트, VendingMachineModel)
9. ProductView 객체 생성자 내부 프로퍼티 설정
10. this.render.bind(this) 로 this 를 ProductView 로 묶기
11. this.vendingMachineModel.subscribe(this.render) 모델(옵저버)에 렌더 함수를 등록(구독)한다.
12. Model의 subscribe 메서드로 들어가, 내부 models Set에 render 함수(this는 바인드 된 상태)를 등록
13. new SelectView(엘리멘트, VendingMachineModel)
14. SelectView 객체 생성자 내부 프로퍼티 설정
15. 10 ~ 12번 과정을 SelectView 를 this 로 진행
16. 생성자 마지막 this.vendingMachineModel.dispatch({}) 로 빈 객체 인자로 전달
17. VendingMachineModel.dispatch(userAction) 실행
18. if문 내부로 들어가 vendingMachineModel.notify(data); 실행
19. Model.notify() 로 vendingMachineModel 의 프로퍼티 models 를 돌며, 구독되어 있는 함수
    1. render(data) -> bind(ProductView)
    2. render(data) -> bind(SelectView)
    3. 위 함수 두개를 forEach문을 돌며 실행한다.

20. new WalletView(엘리먼트, vendingMachineModel, walletModel)
21. WalletModel 생성자 내부로 들어가서 render와 buttonClickHandler에 bind this
22. vendingMachineModel 정의. 내부의 models 정의
23. this.vendingMachineModel에 subscribe(this.render) -> model에 add
24. 다음 행의 dispatch 실행
25. dispatch 내부의 Model.notify(data) 실행
26. render(data) -> bind(WalletView) 실행, 이벤트 등록

