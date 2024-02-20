function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  //inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.remove("modal__error_disabled");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  //inputElement.classList.remove("form__input_type_error");
  errorElement.classList.add("modal__error_disabled");
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.remove("modal__button_enabled");
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.add("modal__button_enabled");
    buttonElement.removeAttribute("disabled");
  }
};

// function setEventListeners(formElement) {
//   const inputList = formElement.querySelectorAll(".form__input");
//   const buttonElement = formElement.querySelector(".form__submit");
//   console.log("here");

//   toggleButtonState(inputList, buttonElement);

//   inputElement.addEventListener("input", function () {
//     checkInputValidity(formElement, inputElement);
//     toggleButtonState(inputList, buttonElement);
//   });

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", function () {
//       checkInputValidity(formElement, inputElement);
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// }

function enableValidation() {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
    const buttonElement = formElement.querySelector(".modal__button");

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });

    // const fieldsetList = formElement.querySelectorAll(".form__set");

    // fieldsetList.forEach((fieldset) => {
    //   setEventListeners(fieldset);
    //   console.log("here");
    // });
  });
}

// enabling validation by calling enableValidation()
// pass all the settings on call

// enableValidation({
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__button",
//   inactiveButtonClass: "popup__button_disabled",
//   inputErrorClass: "popup__input_type_error",
//   errorClass: "popup__error_visible",
// });

enableValidation();
