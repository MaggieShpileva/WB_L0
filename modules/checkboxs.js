import { productsData } from "./store.js";
import {
  OutputNumber,
  selectAll,
  totalCountProduct,
  totalDiscont,
  totalPrice,
  totalPriceWithoutDiscont,
  writeOffPayment,
} from "./variables.js";
import { productsCount, dataAboutProducts } from "./variables.js";
selectAll.addEventListener("change", (event) => {
  let sumPrice = 0;
  let sumCount = 0;
  let sumPriceWithoutDiscont = 0;
  if (selectAll.checked) {
    productsCount.forEach((item, index) => {
      item.querySelector(".main-selected-products-input").checked = true;
      dataAboutProducts[index].checkbox = true;

      sumPrice += productsData[index].price * dataAboutProducts[index].count;
      sumCount += dataAboutProducts[index].count;
      sumPriceWithoutDiscont +=
        productsData[index].priceWithoutDiscont *
        dataAboutProducts[index].count;
      totalPrice.textContent = OutputNumber(sumPrice);
      totalCountProduct.textContent = sumCount;
      totalPriceWithoutDiscont.textContent = OutputNumber(
        sumPriceWithoutDiscont
      );
      totalDiscont.textContent = OutputNumber(
        sumPriceWithoutDiscont - sumPrice
      );
    });
  } else {
    productsCount.forEach((item, index) => {
      item.querySelector(".main-selected-products-input").checked = false;
      dataAboutProducts[index].checkbox = false;
      totalPrice.textContent = 0;
      totalCountProduct.textContent = 0;
      totalPriceWithoutDiscont.textContent = 0;
      totalDiscont.textContent = 0;
    });
  }
});

productsCount.forEach((item, index) => {
  const checkbox = item.querySelector(".main-selected-products-input");
  dataAboutProducts[index].checkbox = checkbox.checked;

  checkbox.addEventListener("change", () => {
    dataAboutProducts[index].checkbox = checkbox.checked;
    let allCheck = [];
    for (let index in dataAboutProducts) {
      allCheck[index] = dataAboutProducts[index].checkbox;
    }
    let check = allCheck.every((el) => {
      return el == true;
    });
    check ? (selectAll.checked = true) : (selectAll.checked = false);
    let sumPrice = 0;
    let sumCount = 0;
    let sumPriceWithoutDiscont = 0;
    for (let key in dataAboutProducts) {
      if (dataAboutProducts[key].checkbox) {
        sumPrice += productsData[key].price * dataAboutProducts[key].count;
        sumCount += dataAboutProducts[key].count;
        sumPriceWithoutDiscont +=
          productsData[key].priceWithoutDiscont * dataAboutProducts[key].count;
      }
      totalPrice.textContent = OutputNumber(sumPrice);
      totalCountProduct.textContent = sumCount;
      totalPriceWithoutDiscont.textContent = OutputNumber(
        sumPriceWithoutDiscont
      );
      totalDiscont.textContent = OutputNumber(
        sumPriceWithoutDiscont - sumPrice
      );
      if (writeOffPayment.checked) {
        document.querySelector(
          ".total-btn"
        ).textContent = `Оплатить ${OutputNumber(sumPrice)} сом`;
      } else {
        document.querySelector(".total-btn").textContent = "Заказать";
      }
    }
  });
});
