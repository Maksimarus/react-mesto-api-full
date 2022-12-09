class Auth {
  constructor() {
    this.baseUrl = 'https://api.mesto.maksimar.nomoredomains.club'; 
    this._headers = {
      'Content-Type': 'application/json',
    };
  }
  _responseHandler(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }
  _request(url, options) {
    return fetch(url, options).then(this._responseHandler);
  }
  register(email, password) {
    return this._request(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }
  authorize(email, password) {
    return this._request(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
			credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }
  getMe() {
    return this._request(`${this.baseUrl}/users/me`, {
      method: 'GET',
			credentials: 'include',
      headers: {
        ...this._headers,
      },
    });
  }
	logout() {
		return this._request(`${this.baseUrl}/logout`, {
			method: 'POST',
			credentials: 'include',
      headers: {
        ...this._headers,
      },
		});
	}
}
export default new Auth();
