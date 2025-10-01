// Open popup function //
function openPopup(popup) {
    popup.classList.add('active');
}

// close popup function //
function closePopup(popup) {
    popup.classList.remove('active');
}

//////// Profile Popup ////////
const profilePopup = document.querySelector('#profile-popup');
const profilePopupForm = profilePopup.querySelector('#profile-form');
const profilePopupName = profilePopupForm.querySelector('#profile-name');
const profilePopupJob = profilePopupForm.querySelector('#profile-job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//// Click buttons ////
const profilePopupOpenButton = document.querySelector('.profile__edit-button');
const profilePopupCloseButton = profilePopup.querySelector ('#profile-close-button');
  
profilePopupOpenButton.addEventListener('click', function() {
  openPopup(profilePopup);

  profilePopupName.value = profileName.textContent;
  profilePopupJob.value = profileJob.textContent;
});

profilePopupCloseButton.addEventListener('click', function() {
    closePopup(profilePopup);
});

// Save new data //
profilePopupForm.addEventListener('submit', function(evt){
    evt.preventDefault();

    profileName.textContent = profilePopupName.value;
    profileJob.textContent = profilePopupJob.value;

    profilePopup.classList.remove('popup_active');
});

//////// Card creation function ////////
const cardsSection = document.querySelector('.content__section-cards');
const cardTemplate = document.querySelector('#card-template').content;

function addCard(title, image, alt = title) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardLikeButton = card.querySelector('.card__like-button');
  const cardTrashButton = card.querySelector('.card__trash-button');

  cardTitle.textContent = title;
  cardTitle.title = title;
  cardImage.src = image;
  cardImage.alt = alt;

  cardImage.addEventListener('click', () => {
    openImagePopup(cardImage.src);
  });

  cardLikeButton.addEventListener('click', () => {
    const likeIcon = cardLikeButton.querySelector('svg');
    likeIcon.classList.toggle('card__like-button_active');
  });

  cardTrashButton.addEventListener('click', (e) => {
    const button = e.target;
    button.closest('.card').remove();
  });

  cardsSection.prepend(card);
}

//////// Initial Cards ////////
const initialCards = [
  {
    title: "Lago di Braies",
    link: "./images/3dbe7008cf5622c19034ae50ddc30348e49c2ac6.webp",
    alt: "barcos atracados em um lago com montanhas ao fundo"
  },
  {
    title: "Lago Louise",
    link: "./images/221cfcb6f665950ee520ab6c9cc460dd246710c4.webp",
    alt: "montanhas com lago cristalino ciano cristalino refletindo as montanhas e o céu claro"
  },
  {
    title: "Parque Nacional da Vanoise ",
    link: "./images/906f6bf6cf25eb556dd75f223d72ade0d4bccb93.webp",
    alt: "paisagem montanhosa com lago refletindo as montanhas e o céu"
  },
  {
    title: "Vale de Yosemite",
    link: "./images/4678c5ba8916c0b28b3e15fdbea3fa7a96fe0cd5.webp",
    alt: "rio cercado por árvores com montanhas ao fundo"
  },
  {
    title: "Montanhas Carecas",
    link: "./images/5777c3a01f7043c8a872fcb759976babd53a3d4e.webp",
    alt: "por do sol sobre montanhas"
  },
  {
    title: "Latemar",
    link: "./images/de4f23b1370b713bab6281cf68c1f6d4782362bd.webp",
    alt: "montanhas sob um céu noturno estrelado"
  },
];

initialCards.forEach(card => {
    addCard(card.title, card.link, card.alt);
});

//////// Add Card Popup ////////
const addCardPopup = document.querySelector('#add-card-popup');
const addCardPopupForm = addCardPopup.querySelector('#add-card-form');
const addCardPopupTitle = addCardPopupForm.querySelector('#add-card-title');
const addCardPopupLink = addCardPopupForm.querySelector('#add-card-link');

//// Click buttons ////
const addCardPopupOpenButton = document.querySelector('.profile__add-button');
const addCardPopupCloseButton = addCardPopup.querySelector('#add-card-close-button');

addCardPopupOpenButton.addEventListener('click', () =>{
  openPopup(addCardPopup);
});

addCardPopupCloseButton.addEventListener('click', () =>{
  closePopup(addCardPopup);
});

// Add new card //
addCardPopupForm.addEventListener('submit', (evt) =>{
  evt.preventDefault();

  addCard(addCardPopupTitle.value, addCardPopupLink.value);

  closePopup(addCardPopup);
});
