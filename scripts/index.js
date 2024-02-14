const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*------- Elements --------*/

const profileEditBtn = document.querySelector("#profile-edit-button");
const addCardBtn = document.querySelector(".profile__add-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileEditContainer =
  profileEditModal.querySelector(".modal__container");
const addCardContainer = addCardModal.querySelector(".modal__container");
const imageModal = document.querySelector("#image-modal");
const profileEditClose = profileEditModal.querySelector(
  "#profile-close-button"
);
const addCardClose = addCardModal.querySelector("#add-close-button");
const imageClose = imageModal.querySelector("#image-close-button");
const profileTitle = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardForm = document.querySelector("#add-form");
const cardTitleInput = document.querySelector("#add-title-input");
const cardUrlInput = document.querySelector("#add-url-input");
const imageSource = imageModal.querySelector(".modal__image");
const imageTitle = imageModal.querySelector(".modal__title");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardListEl = document.querySelector(".cards__list");

/*------- Validation -------*/

function enableValidation(modal, firstInput, secondInput) {
  var submitButton = modal.querySelector(".modal__button");

  //if either either inputs are not filled in yet it breaks the function
  if (firstInput === "" || secondInput === "") {
    return;
  }

  // Check if both inputs are valid
  if (firstInput.checkValidity() && secondInput.checkValidity()) {
    submitButton.removeAttribute("disabled", true);
    submitButton.classList.add("modal__button_enabled");
  }
  if (!firstInput.checkValidity()) {
    submitButton.setAttribute("disabled", true);
    submitButton.classList.remove("modal__button_enabled");
    showErrorMessage(modal, firstInput);
  } else {
    hideErrorMessage(modal, firstInput);
  }
  if (!secondInput.checkValidity()) {
    submitButton.setAttribute("disabled", true);
    submitButton.classList.remove("modal__button_enabled");
    showErrorMessage(modal, secondInput);
  } else {
    hideErrorMessage(modal, secondInput);
  }
}

/*------- Functions --------*/

function closePopup(modal) {
  modal.classList.remove("modal_opened");

  //makes submit button invalid
  //modal.querySelector(".modal__btn").classList.remove(".modal__button_enabled");

  modal.removeEventListener("keydown", function (evt) {
    if (evt.key === "esc") {
      closePopup(modal);
    }
  });
}

function openPopup(modal) {
  modal.classList.add("modal_opened");

  //makes submit button invalid
  //modal.querySelector(".modal__btn").classList.remove(".modal__button_enabled");
}

function showErrorMessage(modal, inputEl) {
  const errorMessageEl = modal.querySelector("#" + inputEl.id + "-error");
  errorMessageEl.classList.remove("modal__error_disabled");
  errorMessageEl.textContent = inputEl.validationMessage;
  console.log("here");
}

function hideErrorMessage(modal, inputEl) {
  const errorMessageEl = modal.querySelector("#" + inputEl.id + "-error");
  errorMessageEl.classList.add("modal__error_disabled");
}

function getCardElement(cardData) {
  //get the card elements
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeBtn = cardElement.querySelector(".card__heart");
  const deleteBtn = cardElement.querySelector(".card__trash");

  //putting event listeners to each card
  likeBtn.addEventListener("click", () =>
    likeBtn.classList.toggle("card__heart_active")
  );
  deleteBtn.addEventListener("click", () => cardElement.remove());
  cardImageEl.addEventListener("click", function () {
    imageSource.src = cardData.link;
    imageTitle.textContent = cardData.name;
    imageSource.alt = cardData.name;
    openPopup(imageModal);
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.alt = cardData.name;
  cardImageEl.src = cardData.link;

  return cardElement;
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

/*------- Event Handlers --------*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;

  renderCard({ name, link }, cardListEl);
  addCardForm.reset();

  closePopup(addCardModal);
}

function closeModalOutside(modal, form, e) {
  if (e.target !== form && !form.contains(e.target)) {
    closePopup(modal);
  }
}

function closeModalEscape(modal, e) {
  if (e.key === "Escape") {
    closePopup(modal);
  }
}

/*------- Event Listeners --------*/

/*------- Profile Edit --------*/
profileEditModal.addEventListener("click", (evt) =>
  closeModalOutside(profileEditModal, profileEditContainer, evt)
);
document.addEventListener("keydown", (evt) =>
  closeModalEscape(profileEditModal, evt)
);
profileTitleInput.addEventListener("input", () =>
  enableValidation(profileEditModal, profileTitleInput, profileDescriptionInput)
);
profileDescriptionInput.addEventListener("input", () =>
  enableValidation(profileEditModal, profileTitleInput, profileDescriptionInput)
);
profileEditBtn.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});
profileEditClose.addEventListener("click", () => closePopup(profileEditModal));
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

/*------- Add Card --------*/
addCardModal.addEventListener("click", (evt) =>
  closeModalOutside(addCardModal, addCardContainer, evt)
);
document.addEventListener("keydown", (evt) =>
  closeModalEscape(addCardModal, evt)
);
cardTitleInput.addEventListener("input", () =>
  enableValidation(addCardModal, cardTitleInput, cardUrlInput)
);
cardUrlInput.addEventListener("input", () =>
  enableValidation(addCardModal, cardTitleInput, cardUrlInput)
);
addCardBtn.addEventListener("click", () => openPopup(addCardModal));
addCardClose.addEventListener("click", () => closePopup(addCardModal));
addCardForm.addEventListener("submit", handleAddCardSubmit);

/*------- Image Popup --------*/
imageClose.addEventListener("click", () => closePopup(imageModal));

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
