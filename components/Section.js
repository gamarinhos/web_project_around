/**
/**
 * Classe responsável por gerenciar uma seção de elementos no DOM.
 *
 * @class
 * @param {string} containerSelector - O seletor do container onde os elementos serão renderizados.
 * @param {Object} param1 - Objeto de configuração.
 * @param {Array} [param1.data] - Array de dados iniciais a serem renderizados.
 * @param {Function} [param1.renderer] - Função responsável por criar e renderizar cada item.
 */
export default class Section {
  constructor(containerSelector, { data, renderer } = {}) {
    this._container = document.querySelector(containerSelector);
    this._initialArray = data ?? [];
    this._render = renderer ?? function () {};

    this._validateObjectParams();
  }

  get element() {
    return this._container;
  }

  _validateObjectParams() {
    if (!Array.isArray(this._initialArray)) {
      this._initialArray = [this._initialArray];
    }
  }

  render() {
    if (!Array.isArray(items)) {
      items = [items];
    }

    items.forEach((item) => {
      const element = new classe(item);

      this.append(element);
    });
  }

  append(element) {
    if (element.nodeType) {
      this._container.append(element);
    }
  }

  clear() {
    this._container.innerHTML = '';
  }
}
