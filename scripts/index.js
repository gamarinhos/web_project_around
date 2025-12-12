import Card from './Card.js';
const cardSection = document.querySelector('.content__section-cards');

const formSelector = (formName, additionalProperties = {}) => {
  const formElement = document.forms[formName];
  const popupElement = formElement.closest('.popup');
  const properties = {
    form: formElement,
    popup: popupElement,
    inputs: Array.from(formElement.querySelectorAll('input')).reduce(
      (obj, input) => {
        obj[input.name] = input;
        return obj;
      },
      {}
    ),
    submitButton: formElement.querySelector('.popup__submit'),
    closeButton: popupElement.querySelector('.popup__close-button'),
  };

  const containerElement = formElement.closest('.popup__container');
  containerElement.addEventListener('click', (e) => e.stopPropagation());

  return Object.assign(formElement, properties, additionalProperties);
};

function openPopup(popup) {
  popup.classList.add('popup_active');

  document.addEventListener('keydown', handleEscapeKey);
  popup.addEventListener('click', handleOverlayClick);
}

function closePopup(popup) {
  popup.classList.remove('popup_active');

  document.removeEventListener('keydown', handleEscapeKey);
  popup.removeEventListener('click', handleOverlayClick);
}

function handleOverlayClick(event) {
  event.currentTarget.classList.remove('popup_active');
}

function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    const activePopup = document.querySelector('.popup_active');
    if (activePopup) {
      closePopup(activePopup);
    }
  }
}

function showInputError(input) {
  const errorElement = input.nextElementSibling;
  input.classList.add('popup__input_type_error');
  errorElement.textContent = input.validationMessage;
}

function hideInputError(input) {
  const errorElement = input.nextElementSibling;
  input.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
}

function toggleButtonState(button, inputList) {
  const hasInvalidInput = (inputs) =>
    Object.values(inputs).some((input) => !input.validity.valid);

  if (hasInvalidInput(inputList)) {
    button.classList.add('popup__submit_disabled');
  } else {
    button.classList.remove('popup__submit_disabled');
  }
}

function validateForm(inputs) {
  let isValid = true;
  Object.values(inputs).forEach((input) => {
    if (!input.validity.valid) {
      showInputError(input);
      isValid = false;
    }
  });
  return isValid;
}

function setFormEvents(form) {
  form.addEventListener('input', (evt) => {
    if (evt.target.validity.valid) {
      hideInputError(evt.target);
    } else {
      showInputError(evt.target);
    }

    toggleButtonState(form.submitButton, form.inputs);
  });

  const formIs = (formName) => form.getAttribute('name') === formName;
  if (formIs('profile')) {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      // Valida o formulário antes de submeter
      if (!validateForm(form.inputs)) {
        return; // Impede o submit se houver campos inválidos
      }
      editProfile();
      closePopup(form.popup);
    });
  }
  if (formIs('newCard')) {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      // Valida o formulário antes de submeter
      if (!validateForm(form.inputs)) {
        return; // Impede o submit se houver campos inválidos
      }
      const card = new Card({
        title: form.inputs.title.value,
        link: form.inputs.link.value,
      });
      cardSection.append(card.getCardElement());
      closePopup(form.popup);
      form.reset();
    });
  }
}

//////// Profile Popup ////////
const profile = formSelector('profile', {
  nameText: document.querySelector('.profile__name'),
  jobText: document.querySelector('.profile__job'),
  openButton: document.querySelector('.profile__edit-button'),
});

profile.openButton.addEventListener('click', () => {
  openPopup(profile.popup);

  profile.inputs.name.value = profile.nameText.textContent;
  profile.inputs.job.value = profile.jobText.textContent;
});

function editProfile() {
  profile.nameText.textContent = profile.inputs.name.value;
  profile.jobText.textContent = profile.inputs.job.value;

  profile.popup.classList.remove('popup_active');
}

setFormEvents(profile);

//////// Initial Cards ////////
(function initialCards() {
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

  initialCards.forEach((element) => {
    const card = new Card(element);
    cardSection.append(card.getCardElement('#card-template'));
  });
})();

//////// New Card Popup ////////
const newCard = formSelector('newCard', {
  openButton: document.querySelector('.profile__add-button'),
});

newCard.openButton.addEventListener('click', () => {
  openPopup(newCard.popup);
});

setFormEvents(newCard);
