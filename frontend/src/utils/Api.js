class Api {
  constructor(setting) {
    this._address = setting.baseUrl;
    this._headers = setting.headers;
  }

  _checkErrors(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`)
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(res => this._checkErrors(res))
  }

  getCardsList() {
    return fetch(`${this._address}/cards`, {
      headers: this._headers
    })
      .then(res => this._checkErrors(res))
  }

  setUserInfo(data) {
    return fetch(`${this._address}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
      .then((res) => this._checkErrors(res))
  }

  setUserAvatar(link) {
    return fetch(`${this._address}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link.avatar,
      }),
    })
      .then((res) => this._checkErrors(res))
  }

  createNewCard(data) {
    return fetch(`${this._address}cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: data.name, link: data.link
      })
    })
      .then((res) => this._checkErrors(res))
  }

  deleteCard(cardId) {
    return fetch(`${this._address}cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(res => this._checkErrors(res))
  }

  putLikeCard(cardId) {
    return fetch(`${this._address}cards/${cardId}/likes/`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(res => this._checkErrors(res))
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._address}cards/${cardId}/likes/`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(res => this._checkErrors(res))
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.deleteLikeCard(cardId);
    } else {
      return this.putLikeCard(cardId);
    }
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64/',
  headers: {
    authorization: 'd8c1ea30-e545-47be-9a07-052774c37113',
    'Content-Type': 'application/json'
  }
});


