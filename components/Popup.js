export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._class = this._popup.classList[0];
    this._closeButton = this._popup.querySelector(`.${this._class}__close-button`);

    this._bindMethods('_handleClickClose', '_handleEscClose');
  }

  _bindMethods(...methods) {
    methods.forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  open() {
    this._popup.classList.add(`${this._class}_active`);
    this._popup.addEventListener('click', this._handleClickClose);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(`${this._class}_active`);
    this._popup.removeEventListener('click', this._handleClickClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleClickClose(event) {
    const isOverlay = event.target === this._popup;
    const isCloseButton = event.target === this._closeButton;

    if (isOverlay || isCloseButton) {
      this.close();
    }
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }
}
