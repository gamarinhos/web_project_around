import { PopupWithButton } from "./PopupWithButton.js";

export class PopupWithForm extends PopupWithButton {
  constructor({ selector, formValidator, onSubmit = () => { } }) {
    const buttonClass = '.form__submit';
    super(selector, buttonClass);

    this._formValidator = formValidator;
    this._inputs = this._getFormInputs();
    this._onSubmit = onSubmit;

    this._enableFormValidation();
    this._enableFormSubmit();
  }

  _getFormInputs() {
    const inputs = Array.from(this._popup.querySelectorAll('input'));

    return Object.fromEntries(
      inputs.map((input) => [input.name, input])
    );
  }

  getInputValues() {
    return Object.entries(this._inputs).reduce((object, [name, input]) => {
      object[name] = input.value;
      return object;
    }, {})
  }

  _enableFormValidation() {
    this._formValidator.enableValidation((input, isValid) => {
      if (isValid) {
        this._hideInputError(input);
      } else {
        this._showInputError(input);
      }

      this._toggleButtonState();
    });
  }

  _enableFormSubmit() {
    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();

      if (this._formValidator.hasInvalidInput()) return

      this._onSubmit();
    })
  }

  open(data = {}) {
    super.open();

    this._toggleButtonState()
    this.prefillInputs(data)
  }

  prefillInputs(data = {}) {
    Object.entries(data).forEach(([name, value]) => {
      this._inputs[name].value = value;
    });
  }

  _disableInputs(boolean) {
    Object.values(this._inputs).forEach((input) => input.disabled = boolean);
  }

  _showInputError(input) {
    input.classList.add('form__input_status_invalid');

    const errorElement = input.nextElementSibling;
    if (errorElement) errorElement.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    input.classList.remove('form__input_status_invalid');

    const errorElement = input.nextElementSibling;
    if (errorElement) errorElement.textContent = '';
  }

  _toggleButtonState() {
    if (this._formValidator.hasInvalidInput()) {
      this.disabledState();
      return;
    }

    this.defaultState();
  }

  loadingState(text) {
    super.loadingState(text);
    this._disableInputs(true);
  }

  errorState(text) {
    super.errorState(text);
    this._disableInputs(false);
  }

  resetForm() {
    this._formValidator.reset();
    this._disableInputs(false);
    this.defaultState();
  }
}