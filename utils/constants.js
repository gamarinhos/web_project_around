export const selectors = {
  profile: {
    name: '.profile__name',
    job: '.profile__job',
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
};

export const initialCards = [
  {
    title: 'Lago di Braies',
    link: './images/3dbe7008cf5622c19034ae50ddc30348e49c2ac6.webp',
    alt: 'barcos atracados em um lago com montanhas ao fundo',
  },
  {
    title: 'Lago Louise',
    link: './images/221cfcb6f665950ee520ab6c9cc460dd246710c4.webp',
    alt: 'montanhas com lago cristalino ciano cristalino refletindo as montanhas e o céu claro',
  },
  {
    title: 'Parque Nacional da Vanoise ',
    link: './images/906f6bf6cf25eb556dd75f223d72ade0d4bccb93.webp',
    alt: 'paisagem montanhosa com lago refletindo as montanhas e o céu',
  },
  {
    title: 'Vale de Yosemite',
    link: './images/4678c5ba8916c0b28b3e15fdbea3fa7a96fe0cd5.webp',
    alt: 'rio cercado por árvores com montanhas ao fundo',
  },
  {
    title: 'Montanhas Carecas',
    link: './images/5777c3a01f7043c8a872fcb759976babd53a3d4e.webp',
    alt: 'por do sol sobre montanhas',
  },
  {
    title: 'Latemar',
    link: './images/de4f23b1370b713bab6281cf68c1f6d4782362bd.webp',
    alt: 'montanhas sob um céu noturno estrelado',
  },
  {
    title: 'Error example',
    link: 'https://broken-url.com',
    alt: 'Error example',
  },
];
