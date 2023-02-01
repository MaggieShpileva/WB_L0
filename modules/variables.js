//получение всех продуктов
export const elems = document.getElementById("elem");
export let productsCount = elems.childNodes;
export const selectAll = document.getElementById("select-all");
export const totalPrice = document.querySelector(".total-title-totalsum");
export const countsProducts = document.querySelectorAll(".input-click-input");
export const totalCountProduct = document.querySelector(
  ".total-product-p-count"
);
export const priceWithoutDiscont = document.querySelectorAll(
  ".product-price-discount-p"
);
export const totalPriceWithoutDiscont = document.querySelector(
  ".total-price-without-discont"
);
export const totalDiscont = document.querySelector(".total-discont");
export const payButtonTotal = document.getElementById("pay-1");
export const payButtonBlock = document.getElementById("pay-2");
export const deliveryButtonTotal = document.querySelector(".total-change-btn");
export const deliveryButtonBlock = document.getElementById("delivery-2");
export const modalWindowPay = document.getElementById("box");
export const modalWindowDelivety = document.getElementById("box-delivery");
export const payWindowClose = document.getElementById("pay-window-close");
export const deliveryWindowClose = document.getElementById(
  "delivery-window-close"
);
export const missingBlocks = document.querySelectorAll(
  ".main-selected-products-missing"
);
export const deliveryBtnSelect = document.getElementById("delivery-btn-select");
export const payWindow = document.querySelector(".payment-modal-window");
export const btnSelect = document.getElementById("btn-select");
export const countInBasket = document.querySelector(".count-product-in-basket");
export const writeOffPayment = document.querySelector(".write-off-payment");
export const btnDeliveryToPoint = document.getElementById("delivery-to-point");
export const btnDeliveryCourier = document.getElementById("delivery-courier");
export const adresses = document.querySelectorAll(".delivery-adress");
export const adressRadio = document.querySelectorAll(".delivery-radio");
export const selectedNumCart = document.getElementById("selected-num-cart");
export const totalSelectedNumCart = document.getElementById(
  "total-selected-num-cart"
);
export const inputName = document.querySelector(".input-name");
export const inputSurname = document.querySelector(".input-surname");
export const inputEmail = document.querySelector(".input-email");
export const inputTel = document.querySelector(".input-telefon");
export const inputInn = document.querySelector(".input-inn");

export let dataAboutProducts = new Map();
export let dataPerson = new Map(); // данные о пользователе

export const OutputNumber = (num) => {
  num = String(Math.round(num));
  return num.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ");
};
