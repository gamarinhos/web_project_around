const formSelector = (formName, additionalProperties = {}) => {
  const formElement = document.forms[formName];
  const popupElement = formElement.closest('.popup');
  const properties = {
    form: formElement,
    popup: popupElement,
    inputs: Array.from(formElement.querySelectorAll('input')).reduce((obj, input) => {
      obj[input.name] = input;
      return obj;
    }, {}),
    submitButton: formElement.querySelector('.popup__submit'),
    closeButton: popupElement.querySelector('.popup__close-button'),
  }

  return Object.assign(formElement, properties, additionalProperties);
}

function setCloseEvents(...popupElements) {
  popupElements.forEach(popupElement => {
    popupElement.addEventListener('click', (evt) => {
      const popupClass = popupElement.classList.value.split(' ')[0];
      const classIs = (name) => evt.target.classList.value === name;

      if (classIs(`${popupClass}__close-button`) || classIs(`${popupClass}`)) {
        closePopup(popupElement);
      }  
    });
  });
}

function openPopup(popup) {
  const popupClass = popup.classList.value.split(' ')[0];
    popup.classList.add(`${popupClass}_active`);
}

function closePopup(popup) {
  const popupClass = popup.classList.value.split(' ')[0];
    popup.classList.remove(`${popupClass}_active`);
}

//////// Profile Popup ////////
const profile = formSelector('profile', {
  nameText: document.querySelector('.profile__name'),
  jobText: document.querySelector('.profile__job'),
  openButton: document.querySelector('.profile__edit-button')
  });

profile.openButton.addEventListener('click', function() {
  openPopup(profile.popup);

  profile.inputs.name.value = profile.nameText.textContent;
  profile.inputs.job.value = profile.jobText.textContent;
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_active'));
    
  }
});

function editProfile(evt) {
  evt.preventDefault();

  profile.nameText.textContent = profile.inputs.name.value;
  profile.jobText.textContent = profile.inputs.job.value;

  profile.popup.classList.remove('popup_active');
}

// Save new data //
profile.addEventListener('submit', editProfile);

//////// Pop-image Popup////////
const imagePopup = document.querySelector('#image-popup');
const imagePopupImage = imagePopup.querySelector('.pop-image__image');
const imagePopupTitle = imagePopup.querySelector('.pop-image__title');

// triggers //
const imagePopupCloseButton = imagePopup.querySelector('#image-close-button');

imagePopupCloseButton.addEventListener('click', () => {
  closePopup(imagePopup);
});

function openImagePopup(image, title) {
  openPopup(imagePopup);
  imagePopupImage.src = image.src;
  imagePopupImage.alt = image.alt;
  imagePopupTitle.textContent = title;
}

//////// Card creation function ////////
const cardTemplate = document.querySelector('#card-template').content;
const cardsSection = document.querySelector('.content__section-cards');

function addCard(title, image, alt = title) {
  const card = cardTemplate.cloneNode(true).querySelector('.card');
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');

  cardTitle.textContent = title;
  cardTitle.title = title;
  cardImage.src = image;
  cardImage.alt = alt;

  card.addEventListener('click', (e) => {
    const target = e.target;
    const hasClass = (name) => target.classList.value.includes(name);

    if (hasClass('card__image')) {
      openImagePopup(target, target.alt);
    }

    if (hasClass('card__like-button')) {
      target.classList.toggle('card__like-button_active');
    }

    if (hasClass('card__trash-button')) {
      card.remove();
    }
  });

  cardImage.addEventListener('error', (e) => {
    e.target.src = './images/image-error.png';
    console.log(`Image error: ${e.target}`);
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
  {
    title: "Error example",
    link: "https://broken-url.com",
    alt: "Error example"
  }
];

initialCards.forEach(card => {
    addCard(card.title, card.link);
});

//////// Add Card Popup ////////
const addCardPopupForm = document.forms.newCard;
const addCardPopup = addCardPopupForm.closest('.popup');
const addCardPopupOpenButton = document.querySelector('.profile__add-button');
const addCardPopupCloseButton = addCardPopup.querySelector('#add-card-close-button');
const addCardPopupTitle = addCardPopupForm.querySelector('#add-card-title');
const addCardPopupLink = addCardPopupForm.querySelector('#add-card-link');



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

//////// Set pop-up events ////////
setCloseEvents(profile.popup);
