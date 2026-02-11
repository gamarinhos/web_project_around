import { Popup } from "./Popup.js";
import { FormValidator } from "./FormValidator.js";
import { ButtonState } from "./ButtonState.js";

export class PopupWithForm extends Popup {
  constructor({ selector, onSubmit }) {
    super(selector);
    this._form = new FormValidator(this._popup.querySelector('form'));
    this._inputs = this._getFormInputs();
    this._onSubmit = onSubmit || function () { };
    this._submitButton = new ButtonState({
      element: this._popup.querySelector('.form__submit'),
      errorClass: 'form__submit_error',
      disabledClass: 'form__submit_disabled',
    });

    this._enableFormEvents();
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

  _enableFormEvents() {
    this._popup.addEventListener('input', (event) => {
      const input = event.target;

      if (this._form._inputValidation(input)) {
        this._showInputError(input);
      } else {
        this._hideInputError(input);
      }
      this.toggleButtonState();
    });

    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();

      if (this._form.hasInvalidInput()) return
      this._onSubmit();
    })
  }

  open(data = {}) {
    super.open();
    this.prefillInputs(data)
  }

  prefillInputs(data = {}) {
    Object.entries(data).forEach(([name, value]) => {
      this._inputs[name].value = value;
    });
  }

  disableInputs(boolean) {
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

  toggleButtonState() {
    if (this._form.hasInvalidInput()) {
      this._submitButton.disabledState();
      return;
    }
    this._submitButton.defaultState();
  }

  loadingState(text) {
    this.disableInputs(true);
    this._submitButton.loadingState(text);
  }

  errorState(text) {
    this.disableInputs(false);
    this._submitButton.errorState(text);
  }

  defaultState() {
    this.disableInputs(false);
    this._submitButton.defaultState();
  }

  resetForm() {
    this._form.reset();
  }
}