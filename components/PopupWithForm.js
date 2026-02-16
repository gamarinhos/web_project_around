import { PopupWithButton } from "./PopupWithButton.js";

export class PopupWithForm extends PopupWithButton {
  constructor({ selector, onSubmit, formValidator }) {
    const buttonClass = '.form__submit';
    super(selector, buttonClass);

    this._form = formValidator.enableValidation();
    this._inputs = this._getFormInputs();
    this._onSubmit = onSubmit || function () { };

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

      if (this._form.inputIsValid(input)) {
        this._hideInputError(input);
      } else {
        this._showInputError(input);
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
      this.disabledState();
      return;
    }
    this.defaultState();
  }

  loadingState(text) {
    super.loadingState(text);
    this.disableInputs(true);
  }

  errorState(text) {
    super.errorState(text);
    this.disableInputs(false);
  }

  resetForm() {
    this._form.reset();
    this.disableInputs(false);
    this.defaultState();
  }
}