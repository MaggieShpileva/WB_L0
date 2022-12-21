import {
  arrayDelivetyCourierAdress,
  arrayDelivetyPointAdress,
} from "./store.js";
import {
  payButtonTotal,
  modalWindowPay,
  deliveryButtonTotal,
  modalWindowDelivety,
  payButtonBlock,
  deliveryButtonBlock,
  payWindowClose,
  deliveryWindowClose,
  btnDeliveryToPoint,
  btnDeliveryCourier,
  adresses,
  deliveryBtnSelect,
  adressRadio,
  dataPerson,
  payWindow,
  btnSelect,
  selectedNumCart,
  totalSelectedNumCart,
  missingBlocks,
} from "./variables.js";

//кнопки для отображения модальных окон
payButtonTotal.addEventListener("click", (event) => {
  modalWindowPay.style.display = "block";
});
deliveryButtonTotal.addEventListener("click", (event) => {
  modalWindowDelivety.style.display = "block";
});
payButtonBlock.addEventListener("click", (event) => {
  modalWindowPay.style.display = "block";
});
deliveryButtonBlock.addEventListener("click", (event) => {
  modalWindowDelivety.style.display = "block";
});

btnDeliveryToPoint.onclick = function () {
  btnDeliveryToPoint.classList.add("btn-active");
  btnDeliveryCourier.classList.remove("btn-active");

  adresses.forEach((item, index) => {
    item.textContent = arrayDelivetyPointAdress[index].adress;
  });
  dataPerson.set("delivery", "to Point");
};

btnDeliveryCourier.onclick = function () {
  btnDeliveryCourier.classList.add("btn-active");
  btnDeliveryToPoint.classList.remove("btn-active");
  adresses.forEach((item, index) => {
    item.textContent = arrayDelivetyCourierAdress[index].adress;
  });
  dataPerson.set("delivery", "Courier");
};

deliveryBtnSelect.addEventListener("click", (event) => {
  if (
    btnDeliveryCourier.classList.contains("btn-active") &&
    dataPerson.get("adress")
  ) {
    document.querySelector(".delivery-block-adress").textContent =
      dataPerson.get("adress");
    document.querySelector(".total-delivery-title").textContent =
      "Доставка курьером";
    modalWindowDelivety.style.display = "none";
  } else if (
    btnDeliveryToPoint.classList.contains("btn-active") &&
    dataPerson.get("adress")
  ) {
    document.querySelector(".delivery-block-adress").textContent =
      dataPerson.get("adress");
    document.querySelector(".total-delivery-title").textContent =
      "Доставка  в пункт выдачи";
    modalWindowDelivety.style.display = "none";
  }
});

for (let i = 0; i < adressRadio.length; i++) {
  adressRadio[i].addEventListener("change", (event) => {
    dataPerson.set("adress", adresses[i].textContent);
  });
}

//выбор карт оплаты
let radio = payWindow.querySelectorAll(".payment-radio");
let numCart = payWindow.querySelectorAll(".p-cart");
const imagesCart = document.querySelectorAll(".image-cart");
for (let i = 0; i < radio.length; i++) {
  radio[i].addEventListener("change", (event) => {
    dataPerson.set("cart", numCart[i].textContent);
    dataPerson.set("imgCart", imagesCart[i].src);
  });
}
//кнопка на модальном окне карты "Выбрать"
btnSelect.addEventListener("click", (event) => {
  if (dataPerson.get("cart")) {
    modalWindowPay.style.display = "none";
    selectedNumCart.textContent = dataPerson.get("cart");
    totalSelectedNumCart.textContent = dataPerson.get("cart");
    document.querySelector(".total-cart-img").src = dataPerson.get("imgCart");
    document.querySelector(".pay-img").src = dataPerson.get("imgCart");
  }
});
//кнопки закрытия модальных окон
payWindowClose.addEventListener("click", (event) => {
  modalWindowPay.style.display = "none";
});

deliveryWindowClose.addEventListener("click", (event) => {
  modalWindowDelivety.style.display = "none";
});

//кнопка для скрытия/отображения товаров
const buttonTurn = document.getElementById("button_turn");
buttonTurn.onclick = function () {
  buttonTurn.classList.toggle("turn-down-list");
  if (buttonTurn.classList.contains("turn-down-list")) {
    document.querySelector(".all-selected-products").style.display = "none";
  } else {
    document.querySelector(".all-selected-products").style.display = "block";
  }
};
//кнопка для скрытия/отображения товаров, которых нет в наличии
const missingButtonTurn = document.getElementById("missing-button_turn");
missingButtonTurn.onclick = function () {
  buttonTurn.classList.toggle("turn-down-list");
  if (buttonTurn.classList.contains("turn-down-list")) {
    document.querySelector(".all-missing-products").style.display = "none";
  } else {
    document.querySelector(".all-missing-products").style.display = "block";
  }
};
//удаление товаров, которых нет в наличии
missingBlocks.forEach((item) => {
  const missingBtnDelete = item.querySelector(".product-delete-btn");
  missingBtnDelete.onclick = () => {
    item.remove();
  };
});
