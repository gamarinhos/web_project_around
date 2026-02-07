import { Popup } from "./Popup.js";
import { FormValidator } from "./FormValidator.js";

export class PopupWithForm extends Popup {
  constructor({ selector, onSubmit }) {
    super(selector);
    this._form = new FormValidator(this._popup.querySelector('form'));
    this._inputs = this._getFormInputs();
    this._submitButton = this._popup.querySelector('button[type="submit"]');
    this._onSubmit = onSubmit || function () { };

    this._enabelFormEvents();
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

  _enabelFormEvents() {
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

  _getElementClass(element) {
    return element.classList[0];
  }

  _showInputError(input) {
    const inputClass = this._getElementClass(input);
    input.classList.add(`${inputClass}_status_invalid`);

    const errorElement = input.nextElementSibling;
    errorElement.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    const inputClass = this._getElementClass(input);
    input.classList.remove(`${inputClass}_status_invalid`);

    const errorElement = input.nextElementSibling;
    errorElement.textContent = '';
  }

  toggleButtonState() {
    const buttonClass = this._getElementClass(this._submitButton);

    if (this._form.hasInvalidInput()) {
      this._submitButton.classList.add(`${buttonClass}_disabled`);
      return;
    }
    this._submitButton.classList.remove(`${buttonClass}_disabled`);
  }
}