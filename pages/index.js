import { selectors, initialCards } from '../utils/constants.js';

import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';

//// Popup form that add cards ////
(function cards() {
  const imagePopup = new PopupWithImage(selectors.popups.imagePopup);

  const cardSection = new Section(selectors.sections.cards, {
    data: initialCards,
    renderer: addNewCard,
  });
  cardSection.renderer();

  const newCardPopup = new PopupWithForm({
    selector: selectors.popups.newCard,
    onSubmit() {
      const cardValues = newCardPopup.getInputValues();
      addNewCard(cardValues);
      newCardPopup.close();
    },
  });

  function addNewCard(data) {
    const cardData = {
      ...data,
      cardClickHandler: ({ title, link }) => imagePopup.open(title, link),
    };
    const card = new Card(cardData);
    const cardElement = card.getCardElement(selectors.templates.card);
    cardSection.addItem(cardElement);
  }

  // Open popup event
  const openButton = document.querySelector(selectors.profile.addButton);
  openButton.addEventListener('click', () => {
    newCardPopup.open();
  });
})();

//// Popup form that update profile info ////
(function profile() {
  const profileInfo = new UserInfo({
    name: document.querySelector(selectors.profile.name),
    job: document.querySelector(selectors.profile.job),
  });

  const profilePopup = new PopupWithForm({
    selector: selectors.popups.profile,
    onSubmit() {
      const values = profilePopup.getInputValues();
      profileInfo.setUserInfo(values);
      profilePopup.close();
    },
  });

  // Open popup event
  const openButton = document.querySelector(selectors.profile.editButton);
  openButton.addEventListener('click', () => {
    const values = profileInfo.getUserInfo();
    profilePopup.prefillInputs(values);
    profilePopup.toggleButtonState();
    profilePopup.open();
  });
})();

(function updateFooterYear() {
  const yearElement = document.querySelector('#year');
  const currentYear = new Date().getFullYear();

  yearElement.textContent = currentYear + ".";
})();