import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);

    this._popupImage = this._popup.querySelector(`.${this._class}__image`);
    this._popupTitle = this._popup.querySelector(`.${this._class}__title`);
  }

  open({ name, link }) {
    super.open();

    this._popupTitle.textContent = name;
    this._popupImage.src = link;
  }

  close() {
    super.close();

    this._popupImage.src = '';
    this._popupTitle.textContent = '';
  }
}