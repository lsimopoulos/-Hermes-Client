import axios from 'axios';

const API_URL = 'https://localhost:7001/';

class AuthService {
  
  login({email,password}) {
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
    'secret=' +
    encodeURI('sdEV08N34f95x2Z/mFlx+gXyy3tzrqi6LEsvFwM1+p+M=ecre') +
    '&' +
    'scope=' +
    encodeURI('hermes+offline_access');

     return  axios
      .post(API_URL + 'connect/token', body,
      {
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic' + ' ' + btoa('chat_web_client:websuperdupersecret'),
        Accept: 'application/json'
      }})
      .then(response => {
        return response.data;
      }) .catch((err) => {
        console.log(err);
    });
  }


  register(email,password) {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    return axios.post(API_URL + 'api/Users/Register/', {
      username: email,
      password: password
    },{
      httpsAgent : agent

    })
    .catch((error) => {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } 
      else if (error.request) {
        // The request was made but no response was received
        console.log('Error:', error.message);
        console.log(error.request);
      } 
      else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error:', error.message);
      }

  
    })
  }
}

export default new AuthService();