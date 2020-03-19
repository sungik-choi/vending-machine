import ChangeModel from "./model/changeModel.js";
import ProductView from "./view/productView.js";
import SelectView from "./view/selectView.js";
import VendingMachineModel from "./model/vendingMachineModel.js";
import WalletModel from "./model/walletModel.js";
import WalletView from "./view/walletView.js";
import { EW } from "./util/util.js";

const walletModel = new WalletModel();
const changeModel = new ChangeModel(walletModel);
const vendingMachineModel = new VendingMachineModel(changeModel);

const product = EW(".product");
const selector = EW(".selector");
const wallet = EW(".wallet");

const productView = new ProductView(product, vendingMachineModel);
const selectView = new SelectView(selector, vendingMachineModel);
const walletView = new WalletView(wallet, vendingMachineModel, walletModel);
