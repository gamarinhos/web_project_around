/**
 * Faz requisições pelo user e pelos cards de uma API
 * @param {String} baseURL - A URL base da requisição
 * @param  {Object} headers - Os dados do header da requisição
 */

export class Api {
  constructor({ baseURL, headers = {} }) {
    this._baseURL = baseURL;
    this._headers = headers;

  }

  _processResponse(response) {
    if (!response.ok) {
      return Promise.reject(response.status);
    }

    return response.json();
  }

  getUser() {
    const userURL = `${this._baseURL}/users/me`;
    return fetch(userURL, {
      method: "GET",
      headers: this._headers,
    })
      .then(this._processResponse);
  }

  getInitialCards() {
    const cardsURL = `${this._baseURL}/cards`;
    return fetch(cardsURL, {
      method: "GET",
      headers: this._headers,
    })
      .then(this._processResponse);
  }

  editUser({ name, about, avatar }) {
    const userURL = `${this._baseURL}/users/me`;
    const body = {};
    if (name !== undefined) body.name = name;
    if (about !== undefined) body.about = about;
    if (avatar !== undefined) body.avatar = avatar;

    return fetch(userURL, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(body)
    })
      .then(this._processResponse);
  }


  createCard({ name, link }) {
    const cardsURL = `${this._baseURL}/cards`;

    return fetch(cardsURL, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
      .then(this._processResponse);
  }

  deleteCard({ cardId }) {
    const cardURL = `${this._baseURL}/cards/${cardId}`;

    return fetch(cardURL, {
      method: "POST",
      headers: this._headers,
    })
      .then(this._processResponse);
  }

  likeCard({ cardId }) {
    const cardLikeURL = `${this._baseURL}/cards/${cardId}/likes`;

    return fetch(cardLikeURL, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._processResponse);
  }

  dislikeCard({ cardId }) {
    const cardLikeURL = `${this._baseURL}/cards/${cardId}/likes`;

    return fetch(cardLikeURL, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._processResponse);
  }
}