import {
  inputName,
  inputSurname,
  inputEmail,
  inputTel,
  inputInn,
} from "./variables.js";

//функция валидации имени и фамилии
const ValidationInput = (input, block) => {
  if (/[0-9]/.test(input.value)) {
    block.querySelector(".input-wrong").style.display = "block";
    input.style.color = "#f55123";
  } else if (input.value.trim() == "") {
    block.querySelector(".input-wrong").style.display = "block";
  } else {
    block.classList.remove("input-wrong");
    block.querySelector(".input-wrong").style.display = "none";
    input.style.color = "black";
  }
};
inputName.addEventListener("blur", (event) => {
  ValidationInput(inputName, document.querySelector(".div-input-name"));
});
inputSurname.addEventListener("blur", (event) => {
  ValidationInput(inputSurname, document.querySelector(".div-input-surname"));
});
//ввод почты
inputEmail.addEventListener("blur", (event) => {
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  if (EMAIL_REGEXP.test(inputEmail.value)) {
    document.querySelector(".input-email-wrong").style.display = "none";
    inputEmail.style.color = "black";
  } else if (inputEmail.value == "") {
    document.querySelector(".input-email-wrong").style.display = "block";
    inputEmail.style.color = "#f55123";
  } else {
    document.querySelector(".input-email-wrong").style.display = "block";
    document.querySelector(".input-email-wrong").textContent =
      "Проверьте адрес электронной почты";
    inputEmail.style.color = "#f55123";
  }
});
//валидация телефона
let maskOptions = {
  mask: "+7 (000) 000-00-00",
  lazy: false,
};
inputTel.addEventListener("focus", (event) => {
  let mask = new IMask(inputTel, maskOptions);
});
inputInn.addEventListener("blur", (event) => {});
