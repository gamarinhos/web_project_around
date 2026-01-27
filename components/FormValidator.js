export class FormValidator {
  constructor(form) {
    this._form = form;
    this._inputs = this._getFormInputs();

    this._enableValidation();
  }

  _getFormInputs() {
    const inputs = Array.from(this._form.querySelectorAll('input'));

    return inputs.reduce((object, input) => {
      object[input.name] = input;
      return object;
    }, {});
  }

  //// Form validation
  _enableValidation() {
    this._form.addEventListener('input', (event) => {
      this._inputValidation(event.target);
    });    
  }

  _inputValidation(input) {
    return !input.validity.valid;
  }
  
  hasInvalidInput() {
    const result = Object.values(this._inputs).some((input) => {
      return this._inputValidation(input);
    });
    return result;
  }

  reset() {
    this._form.reset();
  }
}

/* A manipulação dos estilos dos elementos do formulário deve estar em PopupWithForm */