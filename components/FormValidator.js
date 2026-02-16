export class FormValidator {
  constructor(form) {
    this._form = form;
    this._inputs = this._getFormInputs();
  }

  _getFormInputs() {
    const inputs = Array.from(this._form.querySelectorAll('input'));

    return inputs.reduce((object, input) => {
      object[input.name] = input;
      return object;
    }, {});
  }

  enableValidation(callback) {
    this._validationCallback = callback;

    this._form.addEventListener('input', (event) => {
      const input = event.target;
      const isValid = this.inputIsValid(input);

      this._validationCallback(input, isValid);
    })

    return this;
  }

  inputIsValid(input) {
    return input.validity.valid;
  }

  hasInvalidInput() {
    return Object.values(this._inputs).some((input) => {
      return !this.inputIsValid(input);
    });
  }

  reset() {
    this._form.reset();
  }
}

/* A manipulação dos estilos dos elementos do formulário deve estar em PopupWithForm */