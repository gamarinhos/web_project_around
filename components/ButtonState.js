export class ButtonState {
  constructor({ element, errorClass, loadingClass, disabledClass }) {
    this._button = element;
    this._defaultText = this._button.textContent;
    this._classes = {
      disabled: disabledClass,
      loading: loadingClass,
      error: errorClass,
    }
  }

  getElement() { return this._button }

  _removeClasses() {
    this._button.classList.remove(...Object.values(this._classes));
  }

  _renderText(text) {
    this._button.textContent = text ?? this._defaultText;
  }

  defaultState() {
    this._renderText();
    this._removeClasses();
  }

  disabledState(text) {
    this._renderText(text);
    this._removeClasses();
    this._button.classList.add(this._classes.disabled)
  }

  loadingState(text) {
    this._renderText(text);
    this._removeClasses();
    this._button.classList.add(this._classes.loading);
  }

  errorState(text) {
    this._renderText(text);
    this._removeClasses();
    this._button.classList.add(this._classes.error);
  }
}