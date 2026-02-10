import { Popup } from "./Popup.js";

export class PopupWithButton extends Popup {
  constructor({ selector, buttonAction = () => { } }) {
    super(selector);
    this._buttonAction = buttonAction;
    this._actionButton = this._popup.querySelector('.popup__action-button');
  }

  open(data = {}) {
    super.open();

    this._actionButton.addEventListener('click', () => {
      this._buttonAction(data);
    });
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