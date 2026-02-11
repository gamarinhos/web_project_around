import { Popup } from "./Popup.js";
import { ButtonState } from "./ButtonState.js";

export class PopupWithButton extends Popup {
  constructor({ selector, buttonClickHandler = () => { } }) {
    super(selector);
    this._handleButtonClick = buttonClickHandler;
    this._button = new ButtonState({
      element: this._popup.querySelector('.popup__action'),
      errorClass: 'popup__action_error',
    });
  }

  open(data = {}) {
    super.open();
    this.defaultState();

    this._button.getElement().addEventListener('click', () => {
      this._handleButtonClick(data);
    });
  }

  defaultState() {
    this._button.defaultState()
  }

  loadingState(text) {
    this._button.loadingState(text)
  }

  errorState(text) {
    this._button.errorState(text)
  }

}