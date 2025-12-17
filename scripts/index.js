import { FormPopup } from '../components/FormValidator.js';
import Card from '../components/Card.js';

//// Popup form that update profile info ////
(function profilePopup() {
  const profileForm = new FormPopup({
    form: document.forms.profile,
  });
  profileForm.enableValidation();
  const { name: nameInput, job: jobInput } = profileForm.inputs;
  const profileSection = {
    name: document.querySelector('.profile__name'),
    job: document.querySelector('.profile__job'),
  };

  function fillProfileFormInputs() {
    nameInput.value = profileSection.name.textContent;
    jobInput.value = profileSection.job.textContent;
  }

  // Open popup event
  const openButton = document.querySelector('.profile__edit-button');

  openButton.addEventListener('click', () => {
    fillProfileFormInputs();
    profileForm.hasInvalidInput();
    profileForm.toggleButtonState();
    profileForm.openPopup();
  });

  // Form subimission event
  function updateProfileInfo(data = { name, job }) {
    profileSection.name.textContent = data.name;
    profileSection.job.textContent = data.job;
  }

  profileForm.form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (profileForm.hasInvalidInput()) {
      return; // stop execution
    }

    const values = {
      name: nameInput.value,
      job: jobInput.value,
    };

    updateProfileInfo(values);
    profileForm.closePopup();
  });
})();

//// Popup form that add cards ////
(function newCardPopup() {
  const newCardForm = new FormPopup({
    form: document.forms.newCard,
  });
  newCardForm.enableValidation();

  const openButton = document.querySelector('.profile__add-button');
  openButton.addEventListener('click', () => newCardForm.openPopup());

  newCardForm.form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (newCardForm.hasInvalidInput()) {
      return; // stop execution
    }

    const values = {
      title: newCardForm.inputs.title.value,
      link: newCardForm.inputs.link.value,
    };

    addNewCard(values);
    newCardForm.closePopup();
    newCardForm.form.reset();
  });

  const cardSection = document.querySelector('.content__section-cards');

  function addNewCard(data = { title, link, alt }) /* Object hint */ {
    const card = new Card(data);
    cardSection.append(card.getCardElement('#card-template'));
  }

  //// Page initial cards ////
  const initialCards = [
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

  initialCards.forEach(addNewCard);
})();
