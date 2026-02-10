import { selectors, tripleten, initialCards } from '../utils/constants.js';

import { Api } from '../components/Api.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithButton } from "../components/PopupWithButton.js";
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';

(() => {
  const api = new Api(tripleten);

  // const promises = initialCards.map((data) => api.createCard(data));
  // const result = Promise.all(promises);

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


  const profilePopup = new PopupWithForm({
    selector: selectors.popups.profile,
    onSubmit() {
      const values = profilePopup.getInputValues();
      api.editUserInfo(values)
        .then((data) => {
          userInfo.setUserInfo(data);
          profilePopup.close();
        })
    },
  });

  const profileEditButton = document.querySelector(selectors.profile.editButton);
  profileEditButton.addEventListener('click', () => {
    const values = userInfo.getUserInfo();
    profilePopup.prefillInputs(values);
    profilePopup.toggleButtonState();
    profilePopup.open();
  });

  const avatarPopup = new PopupWithForm({
    selector: selectors.popups.avatar,
    onSubmit() {
      const value = avatarPopup.getInputValues();
      api.editUserAvatar(value)
        .then(() => {
          userInfo.setUserInfo(value)
          avatarPopup.close()
        })
    }
  })

  const profileAvatarButton = document.querySelector(selectors.profile.avatarButton);
  profileAvatarButton.addEventListener('click', () => {
    avatarPopup.open();
  })

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

  const removeCardPopup = new PopupWithButton({
    selector: selectors.popups.removeCard,
    buttonAction: (data) => {
      deleteCard(data)
    }
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


  function deleteCard({ id, element }) {
    api.deleteCard(id)
      .then(() => {
        element.remove();
        removeCardPopup.close();
      })
      .catch(console.log);
  }

  function likeCard({ id, isLiked }) {
    if (!isLiked) {
      return api.likeCard(id)
        .then((data) => {

        })
        .catch(console.log);
    }

    return api.dislikeCard(id)
      .then((data) => {

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
