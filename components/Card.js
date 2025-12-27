export class Card {
  constructor({ title, link, alt = title }, { imageClickHandler }) {
    this._title = title;
    this._link = link;
    this._alt = alt;
    this._isLiked = false;
    this._handleImageClick = imageClickHandler;
  }

  getCardElement(templateSelector) {
    this._card = document
      .querySelector(templateSelector)
      ?.content.firstElementChild.cloneNode(true);

    // Works for templates with different block name:
    this._cardSelector = this._card.classList[0];
    this._cardTitle = this._card.querySelector(`.${this._cardSelector}__title`);
    this._cardImage = this._card.querySelector(`.${this._cardSelector}__image`);

    this._cardTitle.textContent = this._title;
    this._cardTitle.title = this._title;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;

    this._setCardEvents();

    return this._card;
  }

  _setCardEvents() {
    this._cardLikeButton = this._card.querySelector(`.${this._cardSelector}__like-button`);
    this._cardTrashButton = this._card.querySelector(`.${this._cardSelector}__trash-button`);

    this._card.addEventListener('click', (event) => {
      const target = event.target;
      const targetIs = (element) => target === element;

      if (targetIs(this._cardImage)) {
        this._handleImageClick();
      }

      if (targetIs(this._cardLikeButton)) {
        target.classList.toggle('card__like-button_active');
        this._isLiked = !this._isLiked;
      }

      if (targetIs(this._cardTrashButton)) {
        this._card.remove();
      }
    });

    this._cardImage.addEventListener('error', (event) => {
      event.target.src = '../images/image-error.png';
    });
  }
}
