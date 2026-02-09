export class Card {
  constructor({
    name,
    link,
    _id,
    isLiked,
    cardClickHandler = () => { },
    trashClickHandler = () => { },
    likeClickHandler = () => { },
  } = {}) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked ?? false;
    this._handleCardClick = cardClickHandler;
    this._handleTrashClick = trashClickHandler;
    this._handleLikeClick = likeClickHandler;
  }

  getCardInfo() {
    return {
      name: this._name,
      link: this._link,
      id: this._id,
      isLiked: this._isLiked,
      element: this._card,
    };
  }

  getCardElement(templateSelector) {
    this._card = document
      .querySelector(templateSelector)
      ?.content.firstElementChild.cloneNode(true);

    this._cardSelector = this._card.classList[0];
    this._nameElement = this._card.querySelector(`.${this._cardSelector}__title`);
    this._imageElement = this._card.querySelector(`.${this._cardSelector}__image`);
    this._cardLikeButton = this._card.querySelector(`.${this._cardSelector}__like-button`);
    this._cardTrashButton = this._card.querySelector(`.${this._cardSelector}__trash-button`);

    if (this._isLiked) this._cardLikeButton.classList.add('card__like-button_active');

    this._nameElement.textContent = this._name;
    this._nameElement.title = this._name;
    this._imageElement.src = this._link;

    this._setCardEvents();

    return this._card;
  }

  _setCardEvents() {
    this._card.addEventListener('click', (event) => {
      const target = event.target;
      const targetIs = (element) => target === element;

      if (targetIs(this._imageElement)) {
        this._handleCardClick(this.getCardInfo());
        return;
      }

      if (targetIs(this._cardLikeButton)) {
        this._handleLikeClick(this.getCardInfo())
          .then(() => {
            target.classList.toggle('card__like-button_active');
            this._isLiked = !this._isLiked;
          })
        return;
      }

      if (targetIs(this._cardTrashButton)) {
        this._handleTrashClick(this.getCardInfo());
        return;
      }
    });

    this._imageElement.addEventListener('error', (event) => {
      const errorPath = '../images/image-error.png';
      event.target.src = errorPath;
      this._link = errorPath;
    });
  }
}
