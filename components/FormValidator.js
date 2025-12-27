export class FormValidator {
  constructor({ form, submitter }) {
    this._form = form;
    this._submitButton = this._form.querySelector('button[type="submit"]');
    this._inputs = this._getFormInputs();

    this._formSubmission = submitter;
  }

  _getFormInputs() {
    const inputs = Array.from(this._form.querySelectorAll('input'));

    return inputs.reduce((obj, input) => {
      obj[input.name] = input;
      return obj;
    }, {});
  }

  //// Form validation
  enableValidation() {
    this._form.addEventListener('input', (event) => {
      this._inputValidation(event.target);
      this._toggleButtonState();
    });

    this._form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (profileForm.hasInvalidInput()) {
        return; // stop execution
      }

      this._formSubmission();
    });
  }

  _inputValidation(input) {
    const isInvalid = !input.validity.valid;

    if (isInvalid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }

    return isInvalid;
  }

  _getElementClass(element) {
    return element.classList[0];
  }

  _showInputError(input) {
    const inputClass = this._getElementClass(input);
    input.classList.add(`${inputClass}_status_invalid`);

    const errorElement = input.nextElementSibling;
    errorElement.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    const inputClass = this._getElementClass(input);
    input.classList.remove(`${inputClass}_status_invalid`);

    const errorElement = input.nextElementSibling;
    errorElement.textContent = '';
  }

  _toggleButtonState() {
    const buttonClass = this._getElementClass(this._submitButton);
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(`${buttonClass}_disabled`);
      return;
    }
    // else
    this._submitButton.classList.remove(`${buttonClass}_disabled`);
  }

  _hasInvalidInput() {
    const res = Object.values(this._inputs).some((input) => {
      return this._inputValidation(input);
    });
    return res;
  }
}
