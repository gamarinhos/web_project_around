// O nome "UserInfo" sugere que a classe representa apenas dados do usuário, quando na verdade ela manipula elementos DOM da UI de perfil.

export class UserInfo {
  constructor({ name, about }) {
    this._nameElement = name;
    this._aboutElement = about;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }
}
