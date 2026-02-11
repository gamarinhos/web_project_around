// O nome "UserInfo" sugere que a classe representa apenas dados do usuário, quando na verdade ela manipula elementos DOM da UI de perfil.

export class UserInfo {
  constructor({ name, about, avatar }) {
    this._nameElement = document.querySelector(name);
    this._aboutElement = document.querySelector(about);
    this._avatarElement = document.querySelector(avatar);
    this._isLoaded = false; // Remove os placeholders apenas uma vez
  }

  _removePlaceholders() {
    const elements = [this._nameElement, this._aboutElement, this._avatarElement];

    elements.forEach((element) => {
      const base = element.classList[0];
      element.classList.remove(`${base}_placeholder`);
    })
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
  }

  setUserInfo({ name, about, avatar }) {
    if (name) this._nameElement.textContent = name;
    if (about) this._aboutElement.textContent = about;
    if (avatar) this._avatarElement.src = avatar;

    if (!this._isLoaded) {
      this._isLoaded = true;
      this._removePlaceholders();
    }
  }

  storeUserId(id) {
    this._id = id;
  }

  get id() { return this._id }
}
