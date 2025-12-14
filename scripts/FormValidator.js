class FormValidator {
  /* Decidi aproveitar a classe para atribuir todas as funções relacionadas aos formulários */
  constructor(data = {}) {
    this._form = data.form;
    this._inputs = Array.from(this._form.querySelectorAll('input')).reduce(
      (obj, input) => {
        obj[input.name] = input;
        return obj;
      },
      {}
    );
    this._submitButton = this._form.querySelector(
      'button' /* [type="submit"]' */
    );
    this._popup = this._form.closest('.popup');
    this._container = this._popup.querySelector('.popup__container');

    this._bindMethods('closePopup', '_handleEscapeKey');
  }

  get form() {
    return this._form;
  }

  get submitButton() {
    return this._submitButton;
  }

  get inputs() {
    return this._inputs;
  }

  _bindMethods(...methods) {
    methods.forEach((method) => {
      this[method] = this[method].bind(this);
    });
    /* Sei que ainda não vimos isso nessa sprint,
     * mas, como decidi adicionar os métodos de manipulação do popup, se fez necessário.
     */
  }

  getFormElements(additionalProperties = {}) {
    return {
      form: this._form,
      inputs: this._inputs,
      submitButton: this._submitButton,
    };
  }

  //// Form validation
  enableValidation() {
    this._form.addEventListener('input', (event) => {
      this._inputValidation(event.target);
      this.toggleButtonState();
    });
  }

  _inputValidation(input) {
    const isInvalid = !input.validity.valid;

    if (isInvalid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }

    return isInvalid;
  }

  hasInvalidInput() {
    const res = Object.values(this._inputs).some((input) => {
      return this._inputValidation(input);
    });
    return res;
  }

  _showInputError(input) {
    const errorElement = input.nextElementSibling;
    input.classList.add('popup__input_status_invalid');
    errorElement.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    const errorElement = input.nextElementSibling;
    input.classList.remove('popup__input_status_invalid');
    errorElement.textContent = '';
  }

  toggleButtonState() {
    if (this.hasInvalidInput()) {
      this._submitButton.classList.add('popup__submit_disabled');
      return;
    }
    // else
    this._submitButton.classList.remove('popup__submit_disabled');
  }

  //// Popup events
  openPopup() {
    this._popup.classList.add('popup_active');

    this._container.addEventListener('click', this._handleContainerClick);
    this._popup.addEventListener('click', this.closePopup);
    document.addEventListener('keydow', this._handleEscapeKey);
  }

  closePopup() {
    this._popup.classList.remove('popup_active');

    this._container.removeEventListener('click', this._handleContainerClick);
    this._popup.removeEventListener('click', this.closePopup);
    document.removeEventListener('keydown', this._handleEscapeKey);
  }

  _handleContainerClick(e) {
    e.stopPropagation();
  }

  _handleEscapeKey(event) {
    if (event.key === 'Escape') {
      this.closePopup();
    }
  }
}

/* Tentei usar essa classe a seguir mas o validador automático não permitiu.
 * Fica para a próxima sprint então...
 *
 * Decidi adicionar esses métodos na classe FormValidator por enquanto
 */
class FormPopup extends FormValidator {
  constructor(data = {}) {
    super(data);
    this._popup = this._form.closest('.popup');
    this._container = this._popup('.popup__container');

    this._setPopupEvents();

    this._bindMethods('closePopup', '_handleEscapeKey');
  }

  openPopup() {
    this._popup.classList.add('popup_active');

    this._container.addEventListener('click', this._handleContainerClick);
    this._popup.addEventListener('click', this.closePopup);
    document.addEventListener('keydow', this._handleEscapeKey);
  }

  closePopup() {
    this._popup.classList.remove('popup_active');

    this._container.removeEventListener('click', this._handleContainerClick);
    this._popup.removeEventListener('click', this.closePopup);
    document.removeEventListener('keydown', this._handleEscapeKey);
  }

  _handleContainerClick(e) {
    e.stopPropagation();
  }

  _handleEscapeKey(event) {
    if (event.key === 'Escape') {
      this.closePopup();
    }
  }
}

export { FormValidator, FormPopup };
