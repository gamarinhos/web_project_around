import { selectors, initialCards, tripleten } from '../utils/constants.js';

import { Api } from '../components/Api.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';

(function () {
  const api = new Api(tripleten);
  const imagePopup = new PopupWithImage(selectors.popups.imagePopup);
  const cardSection = new Section({
    selector: selectors.sections.cards,
    renderer: addNewCard,
  });

  function getCards() {
    api.getCards()
      .then((data) => {
        cardSection.render(data);
      }) // Precisa atribuir o contexto novamente ao passar o método diretamente.
      .catch((error) => {
        console.log(error)
      });
  }
  getCards();

  const newCardPopup = new PopupWithForm({
    selector: selectors.popups.newCard,
    onSubmit() {
      const cardValues = newCardPopup.getInputValues();
      api.createCard(cardValues)
        .then((data) => {
          addNewCard(data);
          newCardPopup.close();
        })
        .catch(console.log);
    },
  });

  function addNewCard(data) {
    const cardData = {
      ...data,
      cardClickHandler: imagePopup.open.bind(imagePopup),
      trashClickHandler: deleteCard,
    };
    const card = new Card(cardData);
    const cardElement = card.getCardElement(selectors.templates.card);
    cardSection.addItem(cardElement);
  }

  function deleteCard({ id, element }) {
    api.deleteCard(id)
      .then(() => element.remove())
      .catch(console.log);
  }

  // Open popup event
  const profileAddButton = document.querySelector(selectors.profile.addButton);
  profileAddButton.addEventListener('click', () => {
    newCardPopup.open();
  });

  //// Popup form that updates profile info ////

  const userInfo = new UserInfo({
    name: document.querySelector(selectors.profile.name),
    about: document.querySelector(selectors.profile.about),
  });

  function getUser() {
    api.getUser()
      .then(userInfo.setUserInfo.bind(userInfo))
      .catch();
  }
  getUser();

  const profilePopup = new PopupWithForm({
    selector: selectors.popups.profile,
    onSubmit() {
      const values = profilePopup.getInputValues();
      api.editUser(values)
        .then
      userInfo.setUserInfo(values);
      profilePopup.close();
    },
  });

  // Open popup event
  const profileEditButton = document.querySelector(selectors.profile.editButton);
  profileEditButton.addEventListener('click', () => {
    const values = userInfo.getUserInfo();
    profilePopup.prefillInputs(values);
    profilePopup.toggleButtonState();
    profilePopup.open();
  });
})();

(function updateFooterYear() {
  const yearElement = document.querySelector(selectors.year);
  const currentYear = new Date().getFullYear();

  yearElement.textContent = currentYear + ".";
})();
