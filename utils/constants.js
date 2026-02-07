export const selectors = {
  profile: {
    name: '.profile__name',
    about: '.profile__about',
    editButton: '.profile__edit-button',
    addButton: '.profile__add-button',
  },
  templates: {
    card: '#card-template',
  },
  popups: {
    imagePopup: '#image-popup',
    profile: '#profile',
    newCard: '#newCard',
  },
  sections: {
    cards: '.content__section-cards',
  },
  year: '#year',
};

export const tripleten = {
  baseURL: 'https://around-api.pt-br.tripleten-services.com/v1',
  headers: {
    "Authorization": "52220422-faea-4ef4-93f2-7b152248ada0",
    "Content-Type": "application/json"
  }
}

export const initialCards = [
  {
    name: 'Lago di Braies',
    link: './images/3dbe7008cf5622c19034ae50ddc30348e49c2ac6.webp',
  },
  {
    name: 'Lago Louise',
    link: './images/221cfcb6f665950ee520ab6c9cc460dd246710c4.webp',
  },
  {
    name: 'Parque Nacional da Vanoise ',
    link: './images/906f6bf6cf25eb556dd75f223d72ade0d4bccb93.webp',
  },
  {
    name: 'Vale de Yosemite',
    link: './images/4678c5ba8916c0b28b3e15fdbea3fa7a96fe0cd5.webp',
  },
  {
    name: 'Montanhas Carecas',
    link: './images/5777c3a01f7043c8a872fcb759976babd53a3d4e.webp',
  },
  {
    name: 'Latemar',
    link: './images/de4f23b1370b713bab6281cf68c1f6d4782362bd.webp',
  },
  {
    name: 'Error example',
    link: 'https://broken-url.com',
  },
];
