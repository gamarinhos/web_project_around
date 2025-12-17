class FormValidator {
  constructor({ form }) {
    this._form = form;
    this._submitButton = this._form.querySelector('button[type="submit"]');
    this._inputs = Array.from(this._form.querySelectorAll('input')).reduce(
      (obj, input) => {
        obj[input.name] = input;
        return obj;
      },
      {}
    );
  }

  get form() {
    return this._form;
  }

  get inputs() {
    return this._inputs;
  }

  //// Form validation
  enableValidation() {
    this._form.addEventListener('input', (event) => {
      this._inputValidation(event.target);
      this.toggleButtonState();
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

  _showInputError(input) {
    const errorElement = input.nextElementSibling;
    input.classList.add('popup__input_status_invalid');
    errorElement.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    const errorElement = input.nextElementSibling;
    input.classList.remove('popup__input_status_invalid');
    errorElement.textContent = '';
  }

  toggleButtonState() {
    if (this.hasInvalidInput()) {
      this._submitButton.classList.add('popup__submit_disabled');
      return;
    }
    // else
    this._submitButton.classList.remove('popup__submit_disabled');
  }

  hasInvalidInput() {
    const res = Object.values(this._inputs).some((input) => {
      return this._inputValidation(input);
    });
    return res;
  }
}

/* Me peguei repetindo os métodos a seguir para os popups e,
 * para não ter que declará-los no FormValidator, extendi a classe.
 * Assim posso obter os métodos de manipulação do popup sem comprometer
 * a lógica principal do validador de formulário.
 *
 * ainda é o FormValidator... com alguns adicionais que achei necessários :)
 */
class FormPopup extends FormValidator {
  constructor(data = {}) {
    super(data);
    this._popup = this._form.closest('.popup');
    this._container = this._popup.querySelector('.popup__container');

    this._bindMethods('closePopup', '_handleEscapeKey');
  }

  _bindMethods(...methods) {
    methods.forEach((method) => {
      this[method] = this[method].bind(this);
    });
    /* Sei que ainda não vimos isso nessa sprint,
     * mas, como decidi adicionar os métodos de manipulação do popup, precisei usar.
     */
  }

  openPopup() {
    this._popup.classList.add('popup_active');

    this._container.addEventListener('click', this._handleContainerClick);
    this._popup.addEventListener('click', this.closePopup);
    document.addEventListener('keydown', this._handleEscapeKey);
  }

  closePopup() {
    this._popup.classList.remove('popup_active');

    this._container.removeEventListener('click', this._handleContainerClick);
    this._popup.removeEventListener('click', this.closePopup);
    document.removeEventListener('keydown', this._handleEscapeKey);
  }

  _handleContainerClick(e) {
    e.stopPropagation();
  }

  _handleEscapeKey(event) {
    if (event.key === 'Escape') {
      this.closePopup();
    }
  }
}

export { FormValidator, FormPopup };
