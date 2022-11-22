let productCount = document.querySelector(".input-click-input");
const product_count_plus = document.getElementById("product_count_plus");
const product_count_minus = document.getElementById("product_count_minus");
const price = document.querySelector(".price-count");
const priceWithoutDiscont = document.querySelector(".product-price-discount-p");
const countOfProduct = 0;
const countRemainder = document.querySelector(".product-remainder-count");

let productsCount = document.querySelectorAll(".main-selected-products");

const defaultCountRemained = 11;

const Counter = function (count) {
  countValue = parseInt(count.value);
  let changePrice = price.textContent;
  let changePriceWithoutDiscont = priceWithoutDiscont.textContent;
  let productRemainder = defaultCountRemained;

  count.addEventListener("input", (event) => {
    countValue = parseInt(count.value);
    if (count.value > 100) {
      count.value = 100;
      countValue = 100;
    } else {
      price.textContent = changePrice * count.value;
      priceWithoutDiscont.textContent = changePriceWithoutDiscont * count.value;
      productRemainder -= countValue;
    }
  });

  product_count_plus.addEventListener("click", (event) => {
    countValue += 1;
    productRemainder = defaultCountRemained - countValue;
    console.log(countValue, count.value);
    count.value = countValue;
    if (count.value > 100) {
      count.value = 100;
      countValue = 100;
    } else {
      price.textContent = changePrice * countValue;
      priceWithoutDiscont.textContent = changePriceWithoutDiscont * countValue;
      countRemainder.textContent = productRemainder;
      BalanceCheck(productRemainder);
    }
  });

  product_count_minus.addEventListener("click", (event) => {
    if (count.value > 1) {
      countValue -= 1;
      count.value = countValue;
      price.textContent = changePrice * countValue;
      priceWithoutDiscont.textContent = changePriceWithoutDiscont * countValue;
    } else count.value = 1;
  });
};

const BalanceCheck = function (balance) {
  if (balance < 10) {
    document.querySelector(".product-remainder").style.display = "flex";
    console.log(balance);
  } else {
    console.log(balance);
    document.querySelector(".product-remainder").style.display = "none";
  }
};

// Counter(productCount);

const buttonTurn = document.getElementById("button_turn");
buttonTurn.onclick = function () {
  buttonTurn.classList.toggle("turn-down-list");
  if (buttonTurn.classList.contains("turn-down-list")) {
    document.querySelector(".all-selected-products").style.display = "none";
    console.log(321);
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

const MakeAnOrder = function () {
  const priceOfOrder = document.querySelectorAll(".price-count");
  const totalPrice = document.querySelector(".total-title-totalsum");
  const countsProducts = document.querySelectorAll(".input-click-input");
  const totalCountProduct = document.querySelector(".total-product-p-count");

  let arrayOfPriceProduts = [];
  let arrayOfCountProducts = [];
  priceOfOrder.forEach((el) => {
    //начальное значение
    arrayOfPriceProduts.push(+el.textContent);
    totalPrice.textContent = arrayOfPriceProduts.reduce(
      (sum, current) => sum + current,
      0
    );
  });

  document
    .querySelector(".all-selected-products")
    .addEventListener("DOMNodeInserted", (event) => {
      priceOfOrder.forEach((el) => {
        arrayOfPriceProduts.push(+el.textContent);
      });

      let sumProduct = arrayOfPriceProduts
        .slice(-3)
        .reduce((sum, current) => sum + current, 0);
      totalPrice.textContent = sumProduct;

      countsProducts.forEach((el) => {
        arrayOfCountProducts.push(+el.value);
      });
      let sumCountProducts = arrayOfCountProducts
        .slice(-3)
        .reduce((sum, current) => sum + current);
      totalCountProduct.textContent = sumCountProducts;
    });
};
MakeAnOrder();

//   sum += +el.textContent; //начальная сумма
//   console.log(sum);
//   el.addEventListener("DOMNodeInserted", (event) => {
//     changePrice = el.textContent;
//     sum += +changePrice;
//     totalPrice.textContent = sum;
//     console.log(sum);
//   });
