import { selectors, tripleten, loadingTexts } from '../utils/constants.js';

import { Api } from '../components/Api.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';

(() => {
  const api = new Api(tripleten);

  //// Profile behavior ////
  const userInfo = new UserInfo({
    name: selectors.profile.name,
    about: selectors.profile.about,
    avatar: selectors.profile.avatar
  });

  api.getUser()
    .then((data) => {
      userInfo.setUserInfo(data);
      userInfo.storeUserId(data._id);
    })
    .catch(console.log);


  const profilePopup = new PopupWithForm({
    selector: selectors.popups.profile,
    formValidator: new FormValidator(document.forms.profile),
    onSubmit() {
      const values = profilePopup.getInputValues();
      profilePopup.loadingState(loadingTexts.saving);
      api.editUserInfo(values)
        .then((data) => {
          userInfo.setUserInfo(data);
          profilePopup.close();
          profilePopup.defaultState();
        })
        .catch((error) => {
          profilePopup.errorState(error);
        })
    },
  });

  const profileEditButton = document.querySelector(selectors.profile.editButton);
  profileEditButton.addEventListener('click', () => {
    const values = userInfo.getUserInfo();
    profilePopup.prefillInputs(values);
    profilePopup.open();
  });

  const avatarPopup = new PopupWithForm({
    selector: selectors.popups.avatar,
    formValidator: new FormValidator(document.forms.avatar),
    onSubmit() {
      const value = avatarPopup.getInputValues();
      avatarPopup.loadingState(loadingTexts.saving);
      api.editUserAvatar(value)
        .then(() => {
          userInfo.setUserInfo(value);
          avatarPopup.close();
          avatarPopup.resetForm();
          avatarPopup.defaultState();
        })
        .catch((error) => {
          avatarPopup.errorState(error);
        })
    }
  });

  const profileAvatarButton = document.querySelector(selectors.profile.avatarButton);
  profileAvatarButton.addEventListener('click', () => {
    avatarPopup.open();
  });

  //// Cards behavior ////
  const imagePopup = new PopupWithImage(selectors.popups.imagePopup);
  const cardSection = new Section({
    selector: selectors.sections.cards,
    renderer: addNewCard,
  });

  api.getCards()
    .then((data) => {
      cardSection.render(data.reverse());
    })
    .catch((error) => {
      console.log(error)
    });

  const newCardPopup = new PopupWithForm({
    selector: selectors.popups.newCard,
    formValidator: new FormValidator(document.forms.newCard),
    onSubmit() {
      const cardValues = newCardPopup.getInputValues();
      newCardPopup.loadingState(loadingTexts.creating);
      api.createCard(cardValues)
        .then((data) => {
          addNewCard(data);
          newCardPopup.close();
          newCardPopup.resetForm();
          newCardPopup.defaultState();
        })
        .catch((error) => {
          newCardPopup.errorState(error);
        });
    },
  });

  const removeCardPopup = new PopupWithConfirmation({
    selector: selectors.popups.removeCard,
    buttonClickHandler: deleteCard,
  })

  function addNewCard(data) {
    const canDelete = data.owner === userInfo.id;
    const cardData = {
      ...data,
      canDelete,
      cardClickHandler: imagePopup.open.bind(imagePopup),
      trashClickHandler: removeCardPopup.open.bind(removeCardPopup),
      likeClickHandler: likeCard,
    };
    const card = new Card(cardData);
    const cardElement = card.getCardElement(selectors.templates.card);
    cardSection.addItem(cardElement);
  }

  function deleteCard({ id, card }) {
    removeCardPopup.loadingState(loadingTexts.removing);
    api.deleteCard(id)
      .then(() => {
        card.remove();
        removeCardPopup.close();
        removeCardPopup.defaultState();
      })
      .catch((error) => {
        removeCardPopup.errorState(error);
      });
  }

  function likeCard({ id, isLiked, card }) {
    const request = isLiked ? api.dislikeCard(id) : api.likeCard(id);

    return request
      .then(() => {
        card.toggleLike();
      })
      .catch(console.log);
  }

  // Open popup event
  const profileAddButton = document.querySelector(selectors.profile.addButton);
  profileAddButton.addEventListener('click', () => {
    newCardPopup.open();
  });

})();

(function updateFooterYear() {
  const yearElement = document.querySelector(selectors.year);
  const currentYear = new Date().getFullYear();

  yearElement.textContent = currentYear + ".";
})();
