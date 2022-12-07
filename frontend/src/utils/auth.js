class Auth {
  constructor() {
    this.baseUrl = 'http://api.mesto.maksimar.nomoredomains.club';
		// this.baseUrl = 'http://localhost:3000';
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
  // checkToken(token) {
  //   return this._request(`${this.baseUrl}/users/me`, {
  //     method: 'GET',
  //     headers: {
  //       ...this._headers,
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // }
}
export default new Auth();
