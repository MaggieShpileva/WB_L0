let productCount = document.querySelector(".input-click-input");
let productsCount = document.querySelectorAll(".main-selected-products");
const priceOfOrder = document.querySelectorAll(".price-count");
const totalPrice = document.querySelector(".total-title-totalsum");
const countsProducts = document.querySelectorAll(".input-click-input");
const totalCountProduct = document.querySelector(".total-product-p-count");
const priceWithoutDiscont = document.querySelectorAll(
  ".product-price-discount-p"
);
const totalPriceWithoutDiscont = document.querySelector(
  ".total-price-without-discont"
);
const totalDiscont = document.querySelector(".total-discont");
const writeOffPayment = document.querySelector(".write-off-payment");

const selectAll = document.getElementById("select-all");
const payButtonTotal = document.getElementById("pay-1");
const payButtonBlock = document.getElementById("pay-2");
const deliveryButtonTotal = document.querySelector(".total-change-btn");
const deliveryButtonBlock = document.getElementById("delivery-2");
const modalWindowPay = document.getElementById("box");
const modalWindowDelivety = document.getElementById("box-delivery");
const payWindowClose = document.getElementById("pay-window-close");
const deliveryWindowClose = document.getElementById("delivery-window-close");
const deliveryBtnSelect = document.getElementById("delivery-btn-select");
const payWindow = document.querySelector(".payment-modal-window");
const btnSelect = document.getElementById("btn-select");
const selectedNumCart = document.getElementById("selected-num-cart");
const totalSelectedNumCart = document.getElementById("total-selected-num-cart");
const input = document.querySelectorAll(".main-selected-products-input");
const inputName = document.querySelector(".input-name");
const inputSurname = document.querySelector(".input-surname");
const inputEmail = document.querySelector(".input-email");
const inputTel = document.querySelector(".input-telefon");
const inputInn = document.querySelector(".input-inn");

const missingBlocks = document.querySelectorAll(
  ".main-selected-products-missing"
);

let dataPerson = new Map();

const arrayDelivetyPointAdress = [
  {
    adress: "г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1",
    raiting: "",
  },
  {
    adress: "г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1",
    raiting: "4.99",
  },
  {
    adress: "г. Бишкек, улица Табышалиева, д. 57",
    raiting: "4.99",
  },
];
const arrayDelivetyCourierAdress = [
  { adress: "Бишкек, улица Табышалиева, 57" },
  {
    adress: "Бишкек, улица Жукеева-Пудовкина, 77/1",
  },
  { adress: "Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1" },
];

const remainderProduct = [{ count: 4 }, { count: 3 }, { count: 10 }];
const BalanceCheck = function (balance, remainder, countRemainder) {
  if (+balance.value > remainder - 2) {
    document.querySelector(".product-remainder").style.display = "flex";
    countRemainder.textContent = remainder - +balance.value;
  } else {
    document.querySelector(".product-remainder").style.display = "none";
  }
};

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

missingBlocks.forEach((item) => {
  const missingBtnDelete = item.querySelector(".product-delete-btn");
  missingBtnDelete.onclick = () => {
    item.remove();
  };
});
////////////////

let prodactsData = {};
let currentSumPrice = 0;
productsCount.forEach((item, index) => {
  const itemCount = item.querySelector(".input-click-input");

  const nameProduct = item.querySelector(".selected-product-description-p");
  const itemButtonMinus = item.querySelector(".input-click-btn-minus");
  const itemButtonPlus = item.querySelector(".input-click-btn-plus");

  const priceItemCount = item.querySelector(".price-count");
  const priceWithoutDiscont = item.querySelector(".product-price-discount-p");
  const checkbox = item.querySelector(".main-selected-products-input");
  const btnDelete = item.querySelector(".product-delete-btn");
  const infoCompany = item.querySelector(".info-product");
  const countRemainder = item.querySelector(".product-remainder-count");
  let countProduct = parseInt(itemCount.value);
  let currentPrice = priceItemCount.textContent;
  let currentPriceWithoutDiscont = priceWithoutDiscont.textContent;

  prodactsData[index] = { name: nameProduct.textContent.trim() }; // имя товара
  prodactsData[index].initialPrice = +priceItemCount.textContent; //цена продукта
  prodactsData[index].checkbox = true;
  prodactsData[index].currentPrice = prodactsData[index].initialPrice;
  prodactsData[index].count = 1;
  prodactsData[index].priceWithoutDiscont = +priceWithoutDiscont.textContent;

  itemCount.addEventListener("input", (event) => {
    countProduct = +itemCount.value;
    prodactsData[index].count = +itemCount.value; // количество товара
    countProduct = ValueRange(countProduct, 1000);
    prodactsData[index].count = countProduct;
    prodactsData[index].currentPrice = currentPrice * countProduct;
    priceItemCount.textContent = prodactsData[index].currentPrice;
    priceWithoutDiscont.textContent =
      prodactsData[index].priceWithoutDiscont * prodactsData[index].count;
    // if (+itemCount.value > remainderProduct[index].count) {
    // item.querySelector(".product-remainder").style.display = "flex";
    // itemCount.value = remainderProduct[index].count;
    // prodactsData[index].count = remainderProduct[index].count;

    // countRemainder.textContent =
    // remainderProduct[index].count - +itemCount.value;
    // } else if (+itemCount.value < remainderProduct[index].count) {
    // item.querySelector(".product-remainder").style.display = "none";
    // }
  });

  itemButtonMinus.addEventListener("click", (event) => {
    countProduct = countProduct - 1;
    countProduct = ValueRange(countProduct, 1000);
    prodactsData[index].count = countProduct;
    prodactsData[index].currentPrice = currentPrice * countProduct;
    priceItemCount.textContent = prodactsData[index].currentPrice;
    itemCount.value = countProduct;
    priceWithoutDiscont.textContent =
      prodactsData[index].priceWithoutDiscont * prodactsData[index].count;
    if (+itemCount.value > remainderProduct[index].count - 2) {
      item.querySelector(".product-remainder").style.display = "flex";
      countRemainder.textContent =
        remainderProduct[index].count - +itemCount.value;
    } else if (+itemCount.value < remainderProduct[index].count) {
      item.querySelector(".product-remainder").style.display = "none";
    }
    if (+itemCount.value <= remainderProduct[index].count) {
      itemButtonPlus.disabled = false;
    }
  });

  itemButtonPlus.addEventListener("click", (event) => {
    countProduct = countProduct + 1;
    countProduct = ValueRange(countProduct, 1000);

    prodactsData[index].count = countProduct;
    prodactsData[index].currentPrice = currentPrice * countProduct;
    priceItemCount.textContent = prodactsData[index].currentPrice;
    itemCount.value = countProduct;
    priceWithoutDiscont.textContent =
      prodactsData[index].priceWithoutDiscont * prodactsData[index].count;
    if (+itemCount.value > remainderProduct[index].count - 2) {
      item.querySelector(".product-remainder").style.display = "flex";
      countRemainder.textContent =
        remainderProduct[index].count - +itemCount.value;
    } else if (+itemCount.value < remainderProduct[index].count) {
      item.querySelector(".product-remainder").style.display = "none";
    }
    if (+itemCount.value == remainderProduct[index].count) {
      itemButtonPlus.disabled = true;
    }
  });

  //отслеживание чекбоксов
  checkbox.addEventListener("change", (event) => {
    prodactsData[index].checkbox = checkbox.checked;
    if (checkbox.checked) {
      currentSumPrice =
        +totalPrice.textContent + +prodactsData[index].currentPrice;
      currentSumCount =
        +totalCountProduct.textContent + +prodactsData[index].count;

      totalPrice.textContent = currentSumPrice;
      totalCountProduct.textContent = currentSumCount;
      totalPriceWithoutDiscont.textContent =
        +totalPriceWithoutDiscont.textContent +
        +prodactsData[index].priceWithoutDiscont * prodactsData[index].count;
      totalDiscont.textContent =
        +totalDiscont.textContent +
        (prodactsData[index].priceWithoutDiscont * prodactsData[index].count -
          prodactsData[index].currentPrice);
    } else {
      currentSumPrice =
        totalPrice.textContent - +prodactsData[index].currentPrice;
      currentSumCount =
        +totalCountProduct.textContent - +prodactsData[index].count;

      totalPrice.textContent = currentSumPrice;
      totalCountProduct.textContent = currentSumCount;
      totalPriceWithoutDiscont.textContent =
        +totalPriceWithoutDiscont.textContent -
        +prodactsData[index].priceWithoutDiscont * prodactsData[index].count;
      totalDiscont.textContent =
        +totalDiscont.textContent -
        (prodactsData[index].priceWithoutDiscont * prodactsData[index].count -
          prodactsData[index].currentPrice);
      selectAll.checked = false;
    }

    //провека, все ли чекбоксы true
    let allCheck = [];
    for (let key in prodactsData) {
      allCheck[key] = prodactsData[key].checkbox;
    }
    let check = allCheck.every((el) => {
      return el == true;
    });
    check ? (selectAll.checked = true) : (selectAll.checked = false);
  });

  const ValueRange = function (count, maxValue) {
    if (count >= maxValue) {
      itemCount.value = String(maxValue);
      return (count = maxValue);
    } else if (count < 1) {
      return (count = 1);
    } else {
      return count;
    }
  };
  btnDelete.onclick = () => item.remove();
  infoCompany.addEventListener("mouseover", () => {
    item.querySelector(".info-about-company").style.display = "block";
  });
  infoCompany.addEventListener("mouseout", () => {
    item.querySelector(".info-about-company").style.display = "none";
  });
});

selectAll.addEventListener("change", (event) => {
  let sumPrice = 0;
  let sumCount = 0;
  let sumPriceWithoutDiscont = 0;
  let sumDiscont = 0;
  if (selectAll.checked) {
    for (let item in prodactsData) {
      prodactsData[item].checkbox = true;
      input[item].checked = true;

      sumPrice += +prodactsData[item].initialPrice * prodactsData[item].count;
      sumCount += +prodactsData[item].count;
      sumPriceWithoutDiscont +=
        prodactsData[item].priceWithoutDiscont * prodactsData[item].count;
      sumDiscont = sumPriceWithoutDiscont - sumPrice;
    }
  } else {
    for (let item in prodactsData) {
      prodactsData[item].checkbox = false;
      input[item].checked = false;
      sumPrice = 0;
      sumCount = 0;
      sumPriceWithoutDiscont = 0;
      sumDiscont = 0;
    }
  }
  totalPrice.textContent = sumPrice;
  totalCountProduct.textContent = sumCount;
  totalPriceWithoutDiscont.textContent = sumPriceWithoutDiscont;
  totalDiscont.textContent = sumDiscont;
});

//начальные значения чека

let initialSumPrice = 0;
let initialSumCount = 0;
let initialPriceWithoutDiscont = 0;
let initialDiscont = 0;
for (let item in prodactsData) {
  initialSumPrice += prodactsData[item].initialPrice;
  currentSumPrice = initialSumPrice;
  initialSumCount += prodactsData[item].count;
  currentSumCount = initialSumCount;
  initialPriceWithoutDiscont += prodactsData[item].priceWithoutDiscont;
}
totalPrice.textContent = initialSumPrice;
totalCountProduct.textContent = initialSumCount;
totalPriceWithoutDiscont.textContent = initialPriceWithoutDiscont;
totalDiscont.textContent =
  totalPriceWithoutDiscont.textContent - totalPrice.textContent;

//изменение итогового счета
const MakeAnOrder = function () {
  let sumPrice = 0;
  let sumCount = 0;
  let sumPriceWithoutDiscont = 0;
  for (let item in prodactsData) {
    if (prodactsData[item].checkbox) {
      sumPrice += +prodactsData[item].currentPrice;
      sumCount += +prodactsData[item].count;
      sumPriceWithoutDiscont +=
        prodactsData[item].priceWithoutDiscont * prodactsData[item].count;
    }
  }
  totalPrice.textContent = sumPrice;
  totalCountProduct.textContent = sumCount;
  totalPriceWithoutDiscont.textContent = sumPriceWithoutDiscont;
  totalDiscont.textContent = sumPriceWithoutDiscont - sumPrice;
  if (writeOffPayment.checked) {
    document.querySelector(
      ".total-btn"
    ).textContent = `Оплатить ${totalPrice.textContent} сом`;
  }
};

const products = document.getElementById("elem");
let config = {
  childList: true,
  attributes: true,
  characterData: true,
  subtree: true,
  characterDataOldValue: true,
};

let observer = new MutationObserver(MakeAnOrder);

observer.observe(products, config);

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

//кнопки закрытия модальных окон
payWindowClose.addEventListener("click", (event) => {
  modalWindowPay.style.display = "none";
});

deliveryWindowClose.addEventListener("click", (event) => {
  modalWindowDelivety.style.display = "none";
});

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
const adressRadio = document.querySelectorAll(".delivery-radio");

//выбор адреса доставки
deliveryBtnSelect.addEventListener("click", (event) => {
  if (dataPerson.get("adress")) {
    modalWindowDelivety.style.display = "none";
    document.querySelector(".delivery-block-adress").textContent =
      dataPerson.get("adress");
  }
});

for (let i = 0; i < adressRadio.length; i++) {
  adressRadio[i].addEventListener("change", (event) => {
    dataPerson.set("adress", adresses[i].textContent);
  });
}
//функция валидации имени и фамилии
const ValidationInput = (input, block) => {
  if (/[0-9]/.test(input.value)) {
    block.querySelector(".input-wrong").style.display = "block";
    input.style.color = "#f55123";
  } else if (input.value.trim() == "") {
    block.querySelector(".input-wrong").style.display = "none";
  } else {
    block.classList.remove("input-wrong");
    block.querySelector(".input-wrong").style.display = "none";
  }
};

inputName.addEventListener("blur", (event) => {
  ValidationInput(inputName, document.querySelector(".div-input-name"));
});
inputSurname.addEventListener("blur", (event) => {
  ValidationInput(inputSurname, document.querySelector(".div-input-surname"));
});

inputEmail.addEventListener("blur", (event) => {
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  if (EMAIL_REGEXP.test(inputEmail.value)) {
    document.querySelector(".input-email-wrong").style.display = "none";
  } else if (inputEmail.value == "") {
    document.querySelector(".input-email-wrong").style.display = "none";
  } else {
    document.querySelector(".input-email-wrong").style.display = "block";
    document.querySelector(".input-email-wrong").textContent =
      "Проверьте адрес электронной почты";
    inputEmail.style.color = "#f55123";
  }
});

let maskOptions = {
  mask: "+7 (000) 000-00-00",
  lazy: false,
};
inputTel.addEventListener("focus", (event) => {
  let mask = new IMask(inputTel, maskOptions);
});

inputInn.addEventListener("blur", (event) => {});

const btnDeliveryToPoint = document.getElementById("delivery-to-point");
const btnDeliveryCourier = document.getElementById("delivery-courier");
const adresses = document.querySelectorAll(".delivery-adress");

btnDeliveryToPoint.onclick = function () {
  btnDeliveryToPoint.classList.add("btn-active");
  btnDeliveryCourier.classList.remove("btn-active");

  adresses.forEach((item, index) => {
    item.textContent = arrayDelivetyPointAdress[index].adress;
  });
};
btnDeliveryCourier.onclick = function () {
  btnDeliveryCourier.classList.add("btn-active");
  btnDeliveryToPoint.classList.remove("btn-active");
  adresses.forEach((item, index) => {
    item.textContent = arrayDelivetyCourierAdress[index].adress;
  });
};

const deliveryAdresses = document.querySelectorAll(
  ".delivery-modal-window-cart"
);

deliveryAdresses.forEach((item) => {
  const deleteBtn = item.querySelector(".delete-btn");
  deleteBtn.onclick = function () {
    deleteBtn.parentElement.remove();
  };
});

writeOffPayment.addEventListener("click", (event) => {
  if (writeOffPayment.checked) {
    document.querySelector(
      ".total-btn"
    ).textContent = `Оплатить ${totalPrice.textContent} сом`;
  } else {
    document.querySelector(".total-btn").textContent = "Заказать";
  }
});
