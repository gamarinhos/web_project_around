import { Popup } from "./Popup.js";

export class PopupWithButton extends Popup {
  constructor(selector, buttonClass) {
    super(selector);
    this._button = this._popup.querySelector(buttonClass);
    this._buttonClass = this._button.classList[0];
    this._buttonText = this._button.textContent;
    this._buttonState = {
      disabled: `${this._buttonClass}_disabled`,
      error: `${this._buttonClass}_error`,
      loading: `${this._buttonClass}_loading`,
    };
  }

  defaultState() {
    this._resetButtonState();
    this._setButtonText();
  }

  disabledState(text) {
    this._resetButtonState();
    this._setButtonText(text);
    this._button.classList.add(this._buttonState.disabled);
  }

  loadingState(text) {
    this._resetButtonState();
    this._setButtonText(text)
    this._button.classList.add(this._buttonState.loading);
  }

  errorState(text) {
    this._resetButtonState();
    this._setButtonText(text)
    this._button.classList.add(this._buttonState.error);
  }

  _resetButtonState() {
    const classes = Object.values(this._buttonState);
    this._button.classList.remove(...classes);
  }

  _setButtonText(text) {
    this._button.textContent = text ?? this._buttonText;
  }
}