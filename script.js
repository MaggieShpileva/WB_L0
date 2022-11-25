let productCount = document.querySelector(".input-click-input");
let productsCount = document.querySelectorAll(".main-selected-products");
console.log(productsCount);
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
const payButtonFirst = document.getElementById("pay-1");
const payButtonSecond = document.getElementById("pay-2");
const modalWindowPay = document.getElementById("box");
const payWindowClose = document.getElementById("pay-window-close");
const payWindow = document.querySelector(".payment-modal-window");
const btnSelect = document.getElementById("btn-select");
const selectedNumCart = document.getElementById("selected-num-cart");
const totalSelectedNumCart = document.getElementById("total-selected-num-cart");
let input = document.querySelectorAll(".main-selected-products-input");

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

payButtonFirst.addEventListener("click", (event) => {
  modalWindowPay.style.display = "block";
});
payButtonSecond.addEventListener("click", (event) => {
  modalWindowPay.style.display = "block";
});
payWindowClose.addEventListener("click", (event) => {
  modalWindowPay.style.display = "none";
});
//кнопка на модальном окне "Выбрать"
btnSelect.addEventListener("click", (event) => {
  modalWindowPay.style.display = "none";
  selectedNumCart.textContent = dataPerson.get("cart");
  totalSelectedNumCart.textContent = dataPerson.get("cart");
});

let radio = payWindow.querySelectorAll(".payment-radio");
let numCart = payWindow.querySelectorAll(".p-cart");
console.log(numCart);
for (let i = 0; i < radio.length; i++) {
  radio[i].addEventListener("change", (event) => {
    dataPerson.set("cart", numCart[i].textContent);
  });
}
