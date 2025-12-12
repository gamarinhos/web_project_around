import Card from './Card.js';

class PopupSelect {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._container = this._popup.querySelector('.popup__container');
    this._form = this._popup.querySelector('form');

    this._preventClosingContainer();

    this._bindMethods('_handleEscapeKey', '_clickToClose', 'openPopup');

    this._setFormEvents();
  }

  get form() {
    return this._form;
  }

  _preventClosingContainer() {
    this._container.addEventListener('click', (e) => e.stopPropagation());
  }

  _bindMethods(...methods) {
    methods.forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  _setFormEvents() {
    if (this._form) {
      this._submitButton = this._form.querySelector('.popup__submit');
      this._openButton.addEventListener('click', this.openPopup);
      if (this._form) {
        this._inputs = this._form.elements;

        this._form.addEventListener('input', (e) => {
          if (e.target.validity.isValid) {
            this._hideInputError(e.target);
          } else {
            this._showInputError(e.target);
          }
          this._toggleButtonState();
        });
      }
    }
  }

  _validateForm() {
    let isValid = Object.values(this._inputs).every(
      (input) => !input.validity.isValid
    );
    if (isValid) {
    }
  }

  _handleEscapeKey(event) {
    if (event.key === 'Escape') {
      this.closePopup();
    }
  }

  openPopup() {
    this._popup.classList.add('popup_active');
    document.addEventListener('keydown', this._handleEscapeKey);
    this._popup.addEventListener('click', this.closePopup);
  }

  closePopup() {
    this._popup.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscapeKey);
    this._popup.removeEventListener('click', this.closePopup);
  }

  inputsAreValid() {
    return Object.values(this._inputs).some((input) => !input.validity.isValid);
  }

  _showInputError(input) {
    const errorElement = input.nextElementSibling;
    input.classList.add('popup__input_type_error');
    errorElement.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    const errorElement = input.nextElementSibling;
    input.classList.remove('popup__input_type_error');
    errorElement.textContent = '';
  }

  _toggleButtonState() {
    if (this.inputsAreValid) {
      this._submitButton.classList.remove('popup__submit_disabled');
    } else {
      this._submitButton.classList.add('popup__submit_disabled');
    }
  }
}

class ProfilePopup extends Popup {
  constructor(popupSelector, data = {}) {
    super(popupSelector);
    this._inputs = this._getInputs();
    this._nameElement = data.name;
    this._jobElement = data.job;
    this._openButton = data.openButton;
    this._submit = data.submit?.bind(this);

    // Bind methods
    this.submitForm = this._submitForm.bind(this);

    this._openButton.addEventListener('click', this._boundOpenPopup);
    this._form.addEventListener('submit', this.submitForm);
  }

  _setFormEvents() {
    this._openButton.addEventListener('click', this.openPopup);

    this._form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (this.inputsAreValid()) {
        this._editProfile();
        this.closePopup();
      }
    });
  }

  openPopup() {
    super.openPopup();

    // Prefil inputs
    this._inputs.name.value = this._nameElement.textContent;
    this._inputs.job.value = this._jobElement.textContent;
  }

  _editProfile() {
    this._nameElement.textContent = this._inputs.name.value;
    this._jobElement.textContent = this._inputs.job.value;
  }
}

class NewCardPopup extends Popup {
  constructor(popupSelector, data = {}) {
    super(popupSelector);
    this.openButton = data.openButton;
  }
}

export { ProfilePopup, NewCardPopup };

//////// Popups ////////

(function setPopups() {
  // Profile popup //
  const profileSelectors = {
    type: 'profile',
    nameElement: document.querySelector('.profile__name'),
    jobElement: document.querySelector('.profile__job'),
    openButton: document.querySelector('.profile__edit-button'),
    submit: function (e) {
      e.preventDefault();

      if (this.inputsAreValid()) {
        this._editProfile();
        this.closePopup();
      }
    },
  };

  const profile = new PopupSelect('#profile', profileSelectors);

  // newCard popup //
  const newCardSelectors = {
    type: 'newCard',
    openButton: document.querySelector('.profile__add-button'),
    submit: function (e) {
      e.preventDefault();

      if (this.inputsAreValid()) {
        const title = this._inputs.title.value;
        const image = this._inputs.link.value;
        const card = new Card(title, image);

        card.addToSection();

        this.closePopup();
        this._form.reset();
      }
    },
  };

  const newCard = new PopupSelect('#newCard', newCardSelectors);

  // Image Popup //
})();
/*
class CardPopup extends PopupSelect {
  constructor(popupSelector, data = {}) {
    super(popupSelector, data);
    this._openButton = data.openButton;
  }
}

class ProfilePopup extends PopupSelect {
  constructor(popupSelector, data = {}) {
    super(popupSelector, data);
    this._nameElement = data.name;
    this._jobElement = data.job;
    this._openButton = data.openButton;

    this._openButton.addEventListener("click", this._boundOpenPopup);

    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }
}
*/

const profileSelectors = {
  type: 'profile',
  nameElement: document.querySelector('.profile__name'),
  jobElement: document.querySelector('.profile__job'),
  openButton: document.querySelector('.profile__edit-button'),
  submit: function (e) {
    e.preventDefault();

    if (this.inputsAreValid()) {
      this._editProfile();
      this.closePopup();
    }
  },
};

const newCardSelectors = {
  type: 'newCard',
  openButton: document.querySelector('.profile__add-button'),
  submit: function (e) {
    e.preventDefault();

    if (this.inputsAreValid()) {
      const title = this._inputs.title.value;
      const image = this._inputs.link.value;
      const card = new Card(title, image);

      card.addToSection();

      this.closePopup();
      this._form.reset();
    }
  },
};
