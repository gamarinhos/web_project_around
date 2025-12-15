export default class Card {
  constructor({ title, link, alt }) {
    this._title = title;
    this._link = link;
    this._alt = alt ?? this._title;
    this._isLiked = false;

    this._bindMethods('_closeImagePopup', '_handleEscapeKey');
  }

  _bindMethods(...methods) {
    methods.forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  getCardElement(templateSelector) {
    this._card = document
      .querySelector(templateSelector)
      ?.content.firstElementChild.cloneNode(true);

    if (this._card) {
      // Works for templates with different block name:
      this._cardSelector = this._card.className;
      this._cardTitle = this._card.querySelector(
        `.${this._cardSelector}__title`
      );
      this._cardImage = this._card.querySelector(
        `.${this._cardSelector}__image`
      );

      this._cardTitle.textContent = this._title;
      this._cardTitle.title = this._title;
      this._cardImage.src = this._link;
      this._cardImage.alt = this._alt;

      this._getPopupElement();

      this._setCardEvents();

      return this._card;
    }
  }

  _getPopupElement() {
    this._imagePopup = document.querySelector('#image-popup');
    Object.assign(this._imagePopup, {
      image: this._imagePopup.querySelector('.popup__image'),
      imageTitle: this._imagePopup.querySelector('.popup__title'),
    });
  }

  _setCardEvents() {
    this._card.addEventListener('click', (event) => {
      const el = event.target;
      const hasClass = (name) => el.classList.contains(name);

      if (hasClass('card__image')) {
        this._openImagePopup();
      }

      if (hasClass('card__like-button')) {
        el.classList.toggle('card__like-button_active');
        this._isLiked = !this._isLiked;
      }

      if (hasClass('card__trash-button')) {
        this._card.remove();
      }
    });

    this._cardImage.addEventListener('error', (event) => {
      event.target.src = '../images/image-error.png';
    });
  }

  _openImagePopup() {
    this._imagePopup.image.src = this._cardImage.src;
    this._imagePopup.imageTitle.textContent = this._title;
    this._imagePopup.classList.add('popup_active');

    this._imagePopup.addEventListener('click', this._closeImagePopup);
    document.addEventListener('keydown', this._handleEscapeKey);
  }

  _closeImagePopup() {
    this._imagePopup.image.src = '';
    this._imagePopup.imageTitle.textContent = '';
    this._imagePopup.classList.remove('popup_active');

    this._imagePopup.removeEventListener('click', this._closeImagePopup);
    document.removeEventListener('keydown', this._handleEscapeKey);
  }

  _handleEscapeKey(event) {
    if (event.key === 'Escape') {
      this._closeImagePopup();
    }
  }
}
