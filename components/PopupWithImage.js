import Popup from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);

    this._getImagePopupElements();
  }

  _getImagePopupElements() {
    Object.assign(this._popup, {
      image: this._popup.querySelector('img'),
      imageTitle: this._popup.querySelector(`.${this._class}__title`),
    });
  }

  openPopup() {
    super.openPopup();

    this._popup.image.src = this._cardImage.src;
    this._popup.imageTitle.textContent = this._title;
  }

  closePopup() {
    super.closePopup();

    this._popup.image.src = '';
    this._popup.imageTitle.textContent = '';
  }
}
