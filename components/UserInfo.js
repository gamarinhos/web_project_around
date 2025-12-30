// O nome "UserInfo" sugere que a classe representa apenas dados do usuário, quando na verdade ela manipula elementos DOM da UI de perfil.

export class UserInfo {
  constructor({ name, job }) {
    this._nameElement = name;
    this._jobElement = job;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}
