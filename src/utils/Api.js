class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  async _request(url, options) {
    const res = await fetch(url, options);
    return this._checkResponse(res);
  }

  getUserInfoData() {
    return this._request(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    });
  }

  getInitialCards() {
    return this._request(`${this.baseUrl}/cards`, {
      headers: this.headers,
    });
  }

  editProfile({ name, about }) {
    return this._request(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  addNewCard({ name, link }) {
    return this._request(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  deleteCard(id) {
    return this._request(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    });
  }

  changeLikeCardStatus(id, state) {
    return this._request(`${this.baseUrl}/cards/${id}/likes`, {
      method: state,
      headers: this.headers,
    });
  }

  editProfileAvatar(link) {
    return this._request(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    });
  }

  singup({ email, password }) {
    return this._request(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    });
  }

  singin({ email, password }) {
    return this._request(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    });
  }

  checkToken(token) {
    return this._request(`${this.baseUrl}/users/me`, {
      headers: { ...this.headers, Authorization: `Bearer ${token}` },
    });
  }

  // другие методы работы с API
}

export const api = new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/cohort-63`,
  headers: {
    authorization: '2f3491e1-4e2a-4578-a239-f8abfd519bd8',
    'Content-Type': 'application/json',
  },
});

export const apiAuth = new Api({
  baseUrl: `https://auth.nomoreparties.co`,
  headers: {
    'Content-Type': 'application/json',
  },
});
