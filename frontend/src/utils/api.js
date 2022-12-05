class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  _responseHandler(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }
  _request(url, options) {
    return fetch(url, options).then(this._responseHandler);
  }
  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this._dislikeCard(cardId) : this._likeCard(cardId);
  }
  _likeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
			credentials: 'include',
    });
  }
  _dislikeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
			credentials: 'include',
    });
  }
  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }
  postNewCard({name, link}) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
			credentials: 'include',
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }
  updateUserAvatar(avatar) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
			credentials: 'include',
      body: JSON.stringify({
        avatar,
      }),
    });
  }
  updateUserInfo({name, about}) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
			credentials: 'include',
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }
  getUser() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
			credentials: 'include',
    });
  }
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
			credentials: 'include', 
    });
  }
}

export default new Api({
  // baseUrl: 'http://api.mesto.maksimar.nomoredomains.club',
	baseUrl: 'http://localhost:3000',
  headers: {
    authorization: 'd9f8cf7e-4e37-4ac8-b9ec-4d3eff2c0e35',
    'Content-Type': 'application/json',
  },
});
