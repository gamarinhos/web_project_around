export class Section {
  constructor({ selector, renderer = () => { } } = {}) {
    this._container = document.querySelector(selector);
    this._renderer = renderer;
  }

  render(collection) {
    collection.forEach((data) => {
      this._renderer(data);
    });
  }

  addItem(element) {
    if (this._container) {
      this._container.prepend(element);
    }
  }
}
