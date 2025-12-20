export default class Section {
  constructor(containerSelector, { data, renderer } = {}) {
    this._container = document.querySelector(containerSelector);
    this._items = data;
    this._render = renderer;

    this._validateItems();
  }

  _validateItems() {
    if (!Array.isArray(this._items)) {
      this._items = [this._items];
    }
  }

  render() {
    this._items.forEach((item) => {
      this._render(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}
