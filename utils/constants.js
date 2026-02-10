export const selectors = {
  sections: {
    cards: '.content__section-cards',
  },
  profile: {
    name: '.profile__name',
    about: '.profile__about',
    avatar: '.profile__avatar-image',
    editButton: '.profile__edit-button',
    addButton: '.profile__add-button',
    avatarButton: '.profile__avatar-button',
  },
  popups: {
    profile: '#profile',
    avatar: '#avatar',
    newCard: '#new-card',
    removeCard: '#remove-card',
    imagePopup: '#image-popup'
  },
  templates: {
    card: '#card-template',
  },
  year: '#year',
};

export const tripleten = {
  baseURL: 'https://around-api.pt-br.tripleten-services.com/v1',
  headers: {
    "Authorization": "f6ffa353-56af-4238-a1f9-6798572125f1",
    "Content-Type": "application/json"
  }
}
