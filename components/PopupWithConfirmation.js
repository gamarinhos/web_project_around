import { PopupWithButton } from "./PopupWithButton.js";

export class PopupWithConfirmation extends PopupWithButton {
  constructor({ selector, buttonClickHandler = () => { } }) {
    const buttonClass = '.popup__action';
    super(selector, buttonClass);

    this._handleButtonClick = buttonClickHandler;
  }

  open(data = {}) {
    super.open();

    this._boundHandleButtonClick = () => {
      this._handleButtonClick(data);
    };

    this._button.addEventListener('click', this._boundHandleButtonClick);
  }

  close() {
    super.close();

    this._button.removeEventListener('click', this._boundHandleButtonClick);
    this._boundHandleButtonClick = null;
  }
}