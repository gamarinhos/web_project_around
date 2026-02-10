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

  _request(url, options) {
    return fetch(url, options)
      .then((response) => response.ok ? response.json() : Promise.reject(`Error: ${response.status} ${response.statusText}`));
  }

  getUser() {
    const userURL = `${this._baseURL}/users/me`;

    return this._request(userURL, {
      method: "GET",
      headers: this._headers,
    });
  }

  getCards() {
    const cardsURL = `${this._baseURL}/cards`;

    return this._request(cardsURL, {
      method: "GET",
      headers: this._headers,
    });
  }

  editUserInfo({ name, about }) {
    const userURL = `${this._baseURL}/users/me`;

    return this._request(userURL, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about })
    });
  }

  editUserAvatar({ avatar }) {
    const avatarURL = `${this._baseURL}/users/me/avatar`

    return this._request(avatarURL, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar })
    });
  }

  createCard({ name, link }) {
    const cardsURL = `${this._baseURL}/cards/`;

    return this._request(cardsURL, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link })
    });
  }

  deleteCard(id) {
    const cardURL = `${this._baseURL}/cards/${id}`;

    return this._request(cardURL, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  likeCard(id) {
    const cardLikeURL = `${this._baseURL}/cards/${id}/likes`;

    return this._request(cardLikeURL, {
      method: "PUT",
      headers: this._headers,
    });
  }

  dislikeCard(id) {
    const cardLikeURL = `${this._baseURL}/cards/${id}/likes`;

    return this._request(cardLikeURL, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}
