import {
  elems,
  dataAboutProducts,
  totalPrice,
  totalCountProduct,
  totalPriceWithoutDiscont,
  totalDiscont,
  OutputNumber,
  countInBasket,
  writeOffPayment,
} from "./variables.js";
import { productsData } from "./store.js";

let sumPrice = 0; //сумма чека
let sumCountProducts = 0; //кол-во товара
let sumPriceWithoutDiscont = 0;

productsData.forEach((item, index) => {
  sumPrice += item.price * item.countForOrder;
  totalPrice.textContent = OutputNumber(sumPrice);
  sumCountProducts += item.countForOrder;
  totalCountProduct.textContent = sumCountProducts;
  sumPriceWithoutDiscont += item.priceWithoutDiscont * item.countForOrder;
  totalPriceWithoutDiscont.textContent = OutputNumber(sumPriceWithoutDiscont);
  totalDiscont.textContent = OutputNumber(sumPriceWithoutDiscont - sumPrice);
  countInBasket.textContent = productsData.length;
});
const MakeAnOrder = () => {
  sumPrice = 0;
  let sumCount = 0;
  let sumPriceWithoutDiscont = 0;

  productsData.forEach((item, index) => {
    if (dataAboutProducts[index].checkbox) {
      sumPrice += productsData[index].price * dataAboutProducts[index].count;
      sumCount += dataAboutProducts[index].count;
      sumPriceWithoutDiscont +=
        productsData[index].priceWithoutDiscont *
        dataAboutProducts[index].count;
    }
  });
  totalPrice.textContent = OutputNumber(sumPrice);
  totalCountProduct.textContent = sumCount;
  totalPriceWithoutDiscont.textContent = OutputNumber(sumPriceWithoutDiscont);
  totalDiscont.textContent = OutputNumber(sumPriceWithoutDiscont - sumPrice);
  if (writeOffPayment.checked) {
    document.querySelector(".total-btn").textContent = `Оплатить ${OutputNumber(
      sumPrice
    )} сом`;
  } else {
    document.querySelector(".total-btn").textContent = "Заказать";
  }
};
let config = {
  childList: true,
  attributes: true,
  characterData: true,
  subtree: true,
  characterDataOldValue: true,
};

//отслеживание изненений товаров
let observer = new MutationObserver(MakeAnOrder);
observer.observe(elems, config);

//кнопка Заказать в чеке
writeOffPayment.addEventListener("click", (event) => {
  if (writeOffPayment.checked) {
    document.querySelector(".total-btn").textContent = `Оплатить ${OutputNumber(
      sumPrice
    )} сом`;
  } else {
    document.querySelector(".total-btn").textContent = "Заказать";
  }
});
