import { selectors, initialCards } from '../utils/constants.js';

import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo } from '../components/UserInfo.js';

//// Popup form that add cards ////
(function cards() {
  const imagePopup = new PopupWithImage(selectors.popups.imagePopup);

  const cardSection = new Section(selectors.sections.cards, {
    data: initialCards,
    renderer: addNewCard,
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

  cardSection.renderer();

  const newCardPopup = new Popup(selectors.popups.newCard);

  const newCardForm = new FormValidator({
    form: document.forms.newCard,
    submitter() {
      const cardValues = newCardForm.getInputsValues();
      addNewCard(cardValues);
      newCardPopup.close();
    },
  });

  // Open popup event
  const openButton = document.querySelector(selectors.profile.addButton);
  openButton.addEventListener('click', () => {
    newCardPopup.open();
  });
})();

//// Popup form that update profile info ////
(function profile() {
  const profilePopup = new Popup(selectors.popups.profile);

  const profileInfo = new UserInfo({
    name: document.querySelector(selectors.profile.name),
    job: document.querySelector(selectors.profile.job),
  });

  const profileForm = new FormValidator({
    form: document.forms.profile,
    submitter() {
      const values = profileForm.getInputsValues();
      profileInfo.setUserInfo(values);
      profilePopup.close();
    },
  });

  // Open popup event
  const openButton = document.querySelector(selectors.profile.editButton);
  openButton.addEventListener('click', () => {
    const values = profileInfo.getUserInfo();
    profileForm.prefillInputs(values);
    profileForm.toggleButtonState();
    profilePopup.open();
  });
})();
