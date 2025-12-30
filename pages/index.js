//**IMPORTANTE!
//
// 1. Utilize um navegador baseado em Chromium para
// visualizar o botão de fechamento do popup. Caso
// contrário, isso não impede o fechamento do popup
// ao clicar no overlay ou precionando 'Esc', mas
// apenas a visualização do "X".
//
// 2. Não entendi como eu deveria usar o 'PopupWithForm'
// nem para quê ele serviria já que 'index.js' é quem
// orquestra a relação entre as classes. Fiz com que o
// submitter do 'FormValidator' ficasse responsável por
// fechar o popup após o envio do forumlário.
// */

import {
  Popup,
  PopupWithImage,
  Card,
  Section,
  FormValidator,
  UserInfo,
} from '../components/index.js';

import { selectors, initialCards } from '../utils/constants.js';

//// Popup form that add cards ////
(function cards() {
  const imagePopup = new PopupWithImage(selectors.popups.imagePopup);

  const cardSection = new Section(selectors.sections.cards, {
    data: initialCards,
    renderer: addNewCard,
  });

  function addNewCard(data) {
    data.cardClickHandler = ({ title, link }) => imagePopup.open(title, link);

    const card = new Card(data);
    const cardElement = card.getCardElement(selectors.templates.card);
    cardSection.addItem(cardElement);
  }

  cardSection.renderer();

  const newCardPopup = new Popup(selectors.popups.newCard);

  const newCardForm = new FormValidator({
    form: document.forms.newCard,
    submitter() {
      const cardValues = newCardForm.getInputsValues();
      cardValues.cardClickHandler = ({ title, link }) => imagePopup.open(title, link);
      const card = new Card(cardValues);
      const cardElement = card.getCardElement(selectors.templates.card);
      cardSection.addItem(cardElement);

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
(function profilePopup() {
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
