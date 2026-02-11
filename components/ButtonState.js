export class ButtonState {
  constructor({ element, errorClass, loadingClass, disabledClass }) {
    this.button = element;
    this._defaultText = this.button.textContent;
    this._classes = {
      disabled: disabledClass,
      loading: loadingClass,
      error: errorClass,
    }
  }

  _removeClasses() {
    this.button.classList.remove(...Object.values(this._classes));
  }

  _renderText(text) {
    this.button.textContent = text ?? this._defaultText;
  }

  defaultState() {
    this._renderText();
    this._removeClasses();
  }

  disabledState(text) {
    this._renderText(text);
    this._removeClasses();
    this.button.classList.add(this._classes.disabled)
  }

  loadingState(text) {
    this._renderText(text);
    this._removeClasses();
    this.button.classList.add(this._classes.loading);
  }

  errorState(text) {
    this._renderText(text);
    this._removeClasses();
    this.button.classList.add(this._classes.error);
  }
}