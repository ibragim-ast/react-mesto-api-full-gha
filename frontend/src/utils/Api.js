class Api {
  constructor(setting) {
    this._address = setting.baseUrl;
  }

  _checkErrors(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`)
  }

  getUserInfo() {
    const token = localStorage.getItem('jwt');
    
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      }
    })
      .then(res => this._checkErrors(res))
  }

  getCardsList() {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    })
      .then(res => this._checkErrors(res));
  }

  setUserInfo(data) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
      .then((res) => this._checkErrors(res))
  }

  setUserAvatar(data) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
      .then((res) => this._checkErrors(res))
  }

  createNewCard({ name, link }) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name, 
        link,
      })
    })
      .then((res) => this._checkErrors(res))
  }

  deleteCard(cardId) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._address}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(res => this._checkErrors(res))
  }

  putLikeCard(cardId) {
    const token = localStorage.getItem('jwt');
    
    return fetch(`${this._address}/cards/${cardId}/likes/`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => this._checkErrors(res))
  }

  deleteLikeCard(cardId) {
    const token = localStorage.getItem('jwt');
    
    return fetch(`${this._address}/cards/${cardId}/likes/`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
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
  //baseUrl: 'https://api.akhtool.mesto.nomoredomains.work',
  baseUrl: 'http://localhost:3000',
  //baseUrl: 'https://api.ibragimast.nomoredomains.xyz',
});


