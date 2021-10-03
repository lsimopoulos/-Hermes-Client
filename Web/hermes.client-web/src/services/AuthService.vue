import { createOidcAuth, SignInType } from 'vue-oidc-client/vue3';

const appUrl = 'https://localhost:55555/';

const tokenClient = createOidcAuth('main', SignInType.Window, appUrl , {
  authority: 'https://localhost:7000/',
  client_id: 'chat_web_client',
  response_type: 'id_token token',
  scope: 'hermes'
});

idsrvAuth.events.addAccessTokenExpiring(function() {
  
})

idsrvAuth.events.addAccessTokenExpired(function() {

})

idsrvAuth.events.addUserSignedOut(function() {
})
export default tokenClient;