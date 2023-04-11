import axios from 'axios';
//https://hermes.simopoulos.net:55555/server/  https://localhost:7001/
const API_URL = 'https://localhost:7001/';

class AuthService {

  handleErrorResponse(error) {
    let errorResponse;
    if (error.response && error.response.data) {
      const errormessage = error.response.data.error ? error.response.data.error + '- ' + error.response.data.error_description : error.response.data;
      errorResponse = errormessage;
      // JSON stringify if you need the json and use it later
    } else if (error.request) {
      // TO Handle the default error response for Network failure or 404 etc.,
      errorResponse = error.request.message || error.request.statusText;
    } else {
      errorResponse = error.message;
    }
    if (!errorResponse)
      errorResponse = error.message;
    throw new Error(errorResponse);
  }

  async login({ email, password }) {
    try {
      const body =
        'username=' +
        encodeURIComponent(email) +
        '&' +
        'password=' +
        encodeURIComponent(password) +
        '&' +
        'grant_type=' +
        encodeURI('password') +
        '&' +
        'client_id=' +
        encodeURI('chat_web_client') +
        '&' +
        'client_secret=' +
        encodeURI('websuperdupersecret') +
        '&' +
        'scope=' +
        encodeURI('hermes+offline_access');

      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      const response = await axios
        .post(API_URL + 'connect/token', body, headers);
      return response.data;
    } catch (error) {
      this.handleErrorResponse(error)
    }
  }

  async register(user) {
    try {
      return await axios.post(API_URL + 'api/Users/Register/', {
        username: user.email,
        password: user.password,
        name: user.name
      })
    } catch (error) {
      this.handleErrorResponse(error)
    }

  }
}

export default new AuthService();