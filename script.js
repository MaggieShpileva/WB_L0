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
const selectAll = document.getElementById("select-all");
const payButtonTotal = document.getElementById("pay-1");
const payButtonBlock = document.getElementById("pay-2");
const deliveryButtonTotal = document.querySelector(".total-change-btn");
const deliveryButtonBlock = document.getElementById("delivery-2");
const modalWindowPay = document.getElementById("box");
const modalWindowDelivety = document.getElementById("box-delivery");
const payWindowClose = document.getElementById("pay-window-close");
const deliveryWindowClose = document.getElementById("delivery-window-close");

const payWindow = document.querySelector(".payment-modal-window");
const btnSelect = document.getElementById("btn-select");
const selectedNumCart = document.getElementById("selected-num-cart");
const totalSelectedNumCart = document.getElementById("total-selected-num-cart");
let input = document.querySelectorAll(".main-selected-products-input");
const name = document.querySelector(".input-name");
let arrayOfPriceProduts = [];
let arrayOfCountProducts = [];
let arrayOfPriceWithoutDiscont = [];
let discont = 0;
let dataPerson = new Map();
const BalanceCheck = function (balance) {
  if (balance < 10) {
    document.querySelector(".product-remainder").style.display = "flex";
    console.log(balance);
  } else {
    console.log(balance);
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

const CountPrice = (item) => {
  const itemCount = item.querySelector(".input-click-input");
  const itemButtonMinus = item.querySelector(".input-click-btn-minus");
  const itemButtonPlus = item.querySelector(".input-click-btn-plus");
  const priceItemCount = item.querySelector(".price-count");
  const priceWithoutDiscont = item.querySelector(".product-price-discount-p");

  let countProduct = parseInt(itemCount.value);
  let currentPrice = priceItemCount.textContent;
  let currentPriceWithoutDiscont = priceWithoutDiscont.textContent;

  itemCount.addEventListener("input", (event) => {
    countProduct = parseInt(itemCount.value);
    countProduct = ValueRange(countProduct, 10); //проверка на количество товара, которое в наличии
    ChangeVisiblePrice(countProduct);
  });
  itemButtonMinus.addEventListener("click", (event) => {
    countProduct -= 1;
    itemCount.value = countProduct;
    countProduct = ValueRange(countProduct, 10);
    ChangeVisiblePrice(countProduct);
  });

  itemButtonPlus.addEventListener("click", (event) => {
    countProduct += 1;
    itemCount.value = countProduct;
    countProduct = ValueRange(countProduct, 10); //проверка на количество товара, которое в наличии
    ChangeVisiblePrice(countProduct);
  });

  const ValueRange = function (count, maxValue) {
    if (count >= maxValue) {
      itemCount.value = String(maxValue);
      return (count = maxValue);
    } else if (count < 1) {
      itemCount.value = "1";
      return (count = 1);
    } else {
      return count;
    }
  };

  const ChangeVisiblePrice = function (countProduct) {
    priceItemCount.textContent = currentPrice * countProduct;
    priceWithoutDiscont.textContent = currentPriceWithoutDiscont * countProduct;
    if (itemCount.value == "") {
      priceItemCount.textContent = currentPrice;
      countProduct = 1;
      console.log(countProduct);
    }
  };
};

productsCount.forEach((item) => {
  CountPrice(item);
});

//начальное значение итогового чека

const totalValue = function (array, block) {
  let arr = [];

  array.forEach((el, index) => {
    if (el.textContent) {
      arr[index] = +el.textContent;
    } else if (el.value) {
      arr[index] = +el.value;
    }
  });

  //проверка инпутов
  let arrayChecked = [];

  selectAll.addEventListener("change", (event) => {
    if (selectAll.checked) {
      input.forEach((item, index) => {
        item.checked = true;
        arrayChecked[index] = true;
        arr[index] = +array[index].textContent;
        console.log(arr);
        block.textContent = arr.reduce((sum, current) => sum + current, 0);
      });
    } else {
      input.forEach((item, index) => {
        item.checked = false;
        arrayChecked[index] = false;
        arr[index] = 0;
        block.textContent = 0;
      });
    }
  });

  input.forEach((el, index) => {
    arrayChecked[index] = el.checked;

    el.addEventListener("change", (event) => {
      arrayChecked[index] = el.checked;
      if (arrayChecked[index]) {
        arr[index] = +array[index].textContent;
      } else {
        arr[index] = 0;
      }

      let valueAllCheckbox = arrayChecked.every((el) => {
        return el == true;
      });

      if (valueAllCheckbox) {
        selectAll.checked = true;
      } else {
        selectAll.checked = false;
      }
      console.log(arr);
      let sumProduct = arr.reduce((sum, current) => sum + current, 0);
      block.textContent = sumProduct;
    });
  });

  let sumProduct = arr.reduce((sum, current) => sum + current, 0);
  block.textContent = sumProduct;
};

totalValue(priceOfOrder, totalPrice);
totalValue(priceWithoutDiscont, totalPriceWithoutDiscont);
totalValue(countsProducts, totalCountProduct);

document.querySelector(".total-discont").textContent =
  totalPrice.textContent - totalPriceWithoutDiscont.textContent;

//изменение итогового счета
const MakeAnOrder = function () {
  totalValue(priceOfOrder, totalPrice);
  totalValue(priceWithoutDiscont, totalPriceWithoutDiscont);
  totalValue(countsProducts, totalCountProduct);

  //скидка
  document.querySelector(".total-discont").textContent =
    totalPrice.textContent - totalPriceWithoutDiscont.textContent;
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
products.addEventListener("change", (event) => {
  let chk = event.target;
});

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

payWindowClose.addEventListener("click", (event) => {
  modalWindowPay.style.display = "none";
});

deliveryWindowClose.addEventListener("click", (event) => {
  modalWindowDelivety.style.display = "none";
});

//кнопка на модальном окне "Выбрать"
btnSelect.addEventListener("click", (event) => {
  modalWindowPay.style.display = "none";
  selectedNumCart.textContent = dataPerson.get("cart");
  totalSelectedNumCart.textContent = dataPerson.get("cart");
});

let radio = payWindow.querySelectorAll(".payment-radio");
let numCart = payWindow.querySelectorAll(".p-cart");
for (let i = 0; i < radio.length; i++) {
  radio[i].addEventListener("change", (event) => {
    dataPerson.set("cart", numCart[i].textContent);
  });
}
name.addEventListener("input", (event) => {
  console.log(name.value.slice(-1));
  if (!isNaN(name.value.slice(-1))) {
    name.classList.add("input-name-wrong");
    document.querySelector(".name-wrong").style.display = "block";
    // name.value = name.value.slice(0, -1);
  } else if (name.value == "") {
    document.querySelector(".name-wrong").style.display = "none";
  } else {
    name.classList.remove("input-name-wrong");
    document.querySelector(".name-wrong").style.display = "none";
  }
});

const btnDeliveryToPoint = document.getElementById("delivery-to-point");
const btnDeliveryCourier = document.getElementById("delivery-courier");

btnDeliveryToPoint.onclick = function () {
  btnDeliveryToPoint.classList.add("btn-active");
  btnDeliveryCourier.classList.remove("btn-active");
};
btnDeliveryCourier.onclick = function () {
  btnDeliveryCourier.classList.add("btn-active");
  btnDeliveryToPoint.classList.remove("btn-active");
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
