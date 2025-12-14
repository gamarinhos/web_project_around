export default class FormValidator {
  // Decidi aproveitar a classe para atribuir todas as funções relacionadas aos formulários
  constructor(data = {}) {
    this._form = data.form;
    this._inputs = this._form.elements;
    this._submitButton = this._form.querySelector('button[type="submit"]');
    this._popup = this._form.closest('.popup');
    this._container = this._popup.querySelector('.popup__container');
    this._formSubmission = data.formSubmission;

    this._bindMethods(
      '_closePopup',
      '_handleEscapeKey',
      '_formSubmission',
      '_handleInputValidation'
    );
  }

  _bindMethods(...methods) {
    methods.forEach((method) => {
      this[method] = this[method].bind(this);
    });
    /* Sei que ainda não vimos isso nessa sprint,
     * mas, como decidi centralizar todos as funções na classe, se fez necessário
     */
  }

  // Form validation
  enableValidation() {
    this._form.addEventListener('input', (event) => {
      this._inputValidation(event.target);
    });

    this._form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (this._hasInvalidInput()) {
        this._indicateInvalidInputs();
        return;
      }

      this._formSubmission();
      this._closePopup();
    });
  }

  _inputValidation(input) {
    const isInvalid = !input.validity.isValid;

    if (isInvalid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }

    this._toggleButtonState();

    return isInvalid;
  }

  _hasInvalidInput() {
    return this._inputs.some((input) => this._inputValidation(input));
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
    this._submitButton.classList.add('popup__submit_disabled');
  }

  // Popup events
  openPopup() {
    this._popup.classList.add('popup_active');

    this._container.addEventListener('click', this._handleContainerClick);
    this._popup.addEventListener('click', this._closePopup);
    document.addEventListener('keydow', this._handleEscapeKey);
  }

  _handleContainerClick(e) {
    e.stopPropagation();
  }

  _closePopup() {
    this._popup.classList.remove('popup_active');

    this._container.removeEventListener('click', this._handleContainerClick);
    this._popup.removeEventListener('click', this._closePopup);
    document.removeEventListener('keydown', this._handleEscapeKey);
  }

  _handleEscapeKey(event) {
    if (event.key === 'Escape') {
      this._closePopup();
    }
  }
}
