import { productsData } from "./store.js";
import {
  dataAboutProducts,
  OutputNumber,
  productsCount,
  selectAll,
  countInBasket,
} from "./variables.js";
const products = document.getElementById("elem");

//отрисовка кол-ва выбранных товаров
productsData.forEach((item, index) => {
  dataAboutProducts[index] = { id: index };
  const div = document.createElement("div");
  div.className = "main-selected-products";
  div.id = index;
  div.innerHTML = `<div class="main-selected-products-left">
  <div class="main-selected-products-left-check">
    <input
      type="checkbox"
      name=""
      id=""
      class="main-selected-products-input input-for-mobile"
      checked="true"
    />
    <img
      class="select-product-image"
      src=${item.img}
      alt=""
    />
  </div>
  
  <div class="selected-product-description">
    <p class="p-title selected-product-description-p">
     ${item.name}
    </p>
    <div class="product-properties">
   ${item.color ? `<p class="p-properties">Цвет: ${item.color}</p>` : ""}
   ${item.size ? `<p class="p-properties">Размер: ${item.size}</p>` : ""}
  </div>
    <div class="product-about-company">
      <p class="p-description product-about-company-p">
        ${item.storagePoint}
      </p>
      <div class="selected-product-info-company">
        <p class="p-description product-about-company-p">
          ${item.company}
        </p>
  
        <img
          class="info-product"
          src="./images/icons/info.png"
          alt=""
        />
      </div>
    </div>
    <div class="info-about-company">
      <h3>OOO «МЕГАПРОФСТИЛЬ»</h3>
      <p class="p-properties">ОГРН: 5167746237148</p>
      <p class="p-properties">
        129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1,
        помещение 2, офис 34
      </p>
    </div>
  </div>
  </div>
  <div class="main-selected-products-rigth">
  <div class="product-count">
    <div class="input-click">
      <button
        class="input-click-btn-minus"
        id="product_count_minus"
      >
        -
      </button>
      <input
        class="input-click-input"
        type="number"
        name=""
        id="product_input"
   
        
      />
      <button
        id="product_count_plus"
        class="input-click-btn-plus"
      >
        +
      </button>
    </div>
    <div class="product-remainder">
      <p>Осталось &nbsp;</p>
      <p class="product-remainder-count">${item.remainderProduct}</p>
      <p>&nbsp; шт</p>
    </div>
    <div class="products-icons">
      <button
        id="product-like-btn"
        class="product-like-btn"
      ></button>
      <button
        id="product-delete-btn"
        class="product-delete-btn"
      ></button>
    </div>
  </div>
  <div class="product-price">
    <div class="product-price-price">
      <p class="price-count">${item.price}</p>
      <p class="price-valuta">сом</p>
    </div>
    <div class="product-price-discount">
      <p class="product-price-discount-p p-description">${
        item.priceWithoutDiscont
      }</p>
      <p class="price-valuta p-description">&nbsp; сом</p>
    </div>
  </div>
  </div>`;
  products.appendChild(div);
});
let count = productsData.length;

productsCount.forEach((item, index) => {
  const itemCount = item.querySelector(".input-click-input");
  const itemButtonMinus = item.querySelector(".input-click-btn-minus");
  const itemButtonPlus = item.querySelector(".input-click-btn-plus");
  const priceItemCount = item.querySelector(".price-count");
  const priceWithoutDiscont = item.querySelector(".product-price-discount-p");
  const infoCompany = item.querySelector(".info-product");
  const deleteBtn = item.querySelector(".product-delete-btn");
  //начальные значения из store
  itemCount.value = productsData[index].countForOrder;

  priceItemCount.textContent = Math.round(
    productsData[index].price * productsData[index].countForOrder
  );
  priceItemCount.textContent = priceItemCount.textContent.replace(
    /(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g,
    "$1" + " "
  );
  priceWithoutDiscont.textContent = Math.round(
    productsData[index].priceWithoutDiscont * productsData[index].countForOrder
  );
  priceWithoutDiscont.textContent = priceWithoutDiscont.textContent.replace(
    /(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g,
    "$1" + " "
  );
  let countProduct = +itemCount.value; // кол-во товара в корзине

  //запись текущих значений

  dataAboutProducts[index].count = countProduct;

  // уведичение кол-ва товара
  itemButtonPlus.addEventListener("click", (event) => {
    countProduct = countProduct + 1;

    countProduct = ValueRange(
      countProduct,
      productsData[index].remainderProduct
    );
    itemCount.value = countProduct;

    priceItemCount.textContent = OutputNumber(
      productsData[index].price * countProduct
    );

    priceWithoutDiscont.textContent = OutputNumber(
      productsData[index].priceWithoutDiscont * countProduct
    );

    //проверка по кол-ву товара в наличии
    if (+itemCount.value > productsData[index].remainderProduct - 2) {
      item.querySelector(".product-remainder").style.display = "flex";
    } else if (+itemCount.value < productsData[index].remainderProduct) {
      item.querySelector(".product-remainder").style.display = "none";
    }
    if (+itemCount.value == productsData[index].remainderProduct) {
      itemButtonPlus.disabled = true;
    }

    dataAboutProducts[index].count = countProduct;
  });

  //уменьшение кол-ва товара
  itemButtonMinus.addEventListener("click", (event) => {
    countProduct = countProduct - 1;

    countProduct = ValueRange(
      countProduct,
      productsData[index].remainderProduct
    );
    itemCount.value = countProduct;

    priceItemCount.textContent = OutputNumber(
      productsData[index].price * countProduct
    );
    priceWithoutDiscont.textContent = OutputNumber(
      productsData[index].priceWithoutDiscont * countProduct
    );

    //проверка по кол-ву товара в наличии
    if (+itemCount.value > productsData[index].remainderProduct - 2) {
      item.querySelector(".product-remainder").style.display = "flex";
    } else if (+itemCount.value < productsData[index].remainderProduct) {
      item.querySelector(".product-remainder").style.display = "none";
    }
    if (+itemCount.value <= productsData[index].remainderProduct) {
      itemButtonPlus.disabled = false;
    }

    dataAboutProducts[index].count = countProduct;
  });

  // ввод кол-ва товара в ручную
  itemCount.addEventListener("input", (event) => {
    countProduct = +itemCount.value;
    countProduct = ValueRange(
      countProduct,
      productsData[index].remainderProduct
    );
    priceItemCount.textContent = OutputNumber(
      productsData[index].price * countProduct
    );

    priceWithoutDiscont.textContent = OutputNumber(
      productsData[index].priceWithoutDiscont * countProduct
    );

    //проверка по кол-ву товара в наличии
    if (+itemCount.value > productsData[index].remainderProduct - 2) {
      item.querySelector(".product-remainder").style.display = "flex";
    } else if (+itemCount.value < productsData[index].remainderProduct) {
      item.querySelector(".product-remainder").style.display = "none";
      itemButtonPlus.disabled = false;
    }
    if (+itemCount.value == productsData[index].remainderProduct) {
      itemButtonPlus.disabled = true;
    }

    dataAboutProducts[index].count = countProduct;
  });

  const ValueRange = function (count, maxValue) {
    if (count >= maxValue) {
      itemCount.value = String(maxValue);
      return (count = maxValue);
    } else if (count < 1) {
      return (count = 0);
    } else {
      return count;
    }
  };
  infoCompany.addEventListener("mouseover", () => {
    item.querySelector(".info-about-company").style.display = "block";
  });
  infoCompany.addEventListener("mouseout", () => {
    item.querySelector(".info-about-company").style.display = "none";
  });
  deleteBtn.addEventListener("click", () => {
    delete productsData[index];
    delete dataAboutProducts[index];
    item.remove();
    count -= 1;
    countInBasket.textContent = count;
  });
});
