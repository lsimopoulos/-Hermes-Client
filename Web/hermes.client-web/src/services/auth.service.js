import axios from 'axios';

const API_URL = 'https://localhost:7001/';

class AuthService {

  handleErrorResponse(error) {
    let errorResponse;
    if(error.response && error.response.data) {
      // I expect the API to handle error responses in valid format
      errorResponse = error.response.data;
      // JSON stringify if you need the json and use it later
    } else if(error.request) {
      // TO Handle the default error response for Network failure or 404 etc.,
      errorResponse = error.request.message || error.request.statusText;
    } else {
      errorResponse = error.message;
    }
    throw new Error(errorResponse);
  }

  async login({email,password}) {
    var body =
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
    'client_secret='  +
    encodeURI('websuperdupersecret') +
    '&' +
    'scope=' +
    encodeURI('hermes+offline_access');
    
    const headers =  { 
      'Content-Type': 'application/x-www-form-urlencoded'
    }
     const response = await axios
      .post(API_URL + 'connect/token', body, headers);
    return response.data;
  }

  


  register(user) {
    return axios.post(API_URL + 'api/Users/Register/', {
      username: user.email,
      password: user.password,
      name: user.name
    })
  }
}

export default new AuthService();