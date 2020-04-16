class Api {
  constructor({ baseUrl, token }) {
    this.url = baseUrl;
    this.token = token;
  }
  _handleResult(res) {
    if (res.ok) return res.json();
    return Promise.reject(`ответ от сервера: ${res.status}`)
  }

  _handleError(err) {
    throw new Error(err)
  }

  getInitialCards() {
    return fetch(`${this.url}cards`, {
      headers: {
        authorization: this.token
      }
    })
      .then(this._handleResult)
      .catch(this._handleError)
  }

  createCardOnServer(name, link) {
    return fetch(`${this.url}cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, link })
    })
      .then(this._handleResult)
      .catch(this._handleError)
  }

  getProfile() {
    return fetch(`${this.url}users/me`, {
      headers: {
        authorization: this.token
      }
    })
      .then(this._handleResult)
      .catch(this._handleError)
  }

  patchProfile({ name, about }) {
    return fetch(`${this.url}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._handleResult)
      .catch(this._handleError)
  }

  deleteOwnCardsOnServer(id) {
    return fetch(`${this.url}cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token
      }
    })
      .then(this._handleResult)
      .catch(this._handleError)
  }

  putLike(id) {
    return fetch(`${this.url}cards/like/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(this._handleResult)
      .catch(this._handleError)
  }

  delLike(id) {
    return fetch(`https://praktikum.tk/cohort9/cards/like/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
    })
      .then(this._handleResult)
      .catch(this._handleError)
  }
}
