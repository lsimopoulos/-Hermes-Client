import { sendRequest, addContactRequest } from '../proto/hermes_pb';
import { ChatterClient } from '../proto/hermes_grpc_web_pb';
import { CallCredentials } from '@grpc/grpc-js/build/src/call-credentials'
import store from '../store'

var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');


var token = null;
var metadata = null;
const client = new ChatterClient('https://localhost:55556', CallCredentials.createFromPlugin, null);


class ChatService {
  connect() {
    token = store.getters['auth/access_token']
    metadata = { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/grpc-web-text' }
    const streaming_call = client.connect(new google_protobuf_empty_pb.Empty, metadata)
    const ref_store = store;
    streaming_call.on('data', function (result) {
      console.log(result)
      const selectedContact = ref_store.getters['user/getContactIdByEmail'](result.getFrom())
      const msg = { message: result.getMessage(), name: selectedContact.name, time: result.getTime(), isSelf: false }
      ref_store.commit("chat/addChatMessage", { chatMessage: msg, contactId: selectedContact.id });
    }.bind(this));

    streaming_call.on('status', function (status) {

      console.log(status.code, status.details, status.metadata);
    });

    streaming_call.on("end", () => {
      console.log("Stream ended.");
    });
  }

  //code taken https://codepremix.com/detect-urls-in-text-and-create-a-link-in-javascript
  replaceURLs(message) {
    if(!message) return;
  /* eslint-disable-next-line */
    let urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return message.replace(urlRegex, function (url) {
      let hyperlink = url;
      /* eslint-disable-next-line */
      if (!hyperlink.match('^https?:\/\/')) {
        hyperlink = 'http://' + hyperlink;
      }
      return '<a href="' + hyperlink + '" target="_blank" rel="noopener noreferrer">' + url + '</a>'
    });
  }
  
  getNow() {
    return new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
  }

  addContact(email) {
    if (email != "") {
      let acr = new addContactRequest()
      acr.setEmail(email);
      return new Promise((resolve, reject) => client.addContact(acr, metadata, function (err, response) {
        if (err) {
          console.log(err.code);
          console.log(err.message);
          return reject(err)
        }
        const contact = response.toObject();
        const newContact = { id: contact.id, name: contact.name, email: contact.email, hasNewMessages: false, numberOfUnreadMessages: 0 }
        store.commit("user/addContact", { contact: newContact })
        resolve(contact);


      }))
    }
  }

  sendMessage(chatMsg) {
    let request = new sendRequest();
    chatMsg = this.replaceURLs(chatMsg)
    request.setMessage(chatMsg)

    const time = this.getNow();
    request.setTime(time);
    const selectedContact = store.getters['user/selected_contact'];
    request.setTo(selectedContact.id);
    request.setFrom(store.getters['auth/user_aliasname']);
    if (chatMsg) {
      const msg = { message: chatMsg, name: "Me:", time: time, isSelf: true }
      store.commit("chat/addChatMessage", { chatMessage: msg, contactId: selectedContact.id });
    }
    if (selectedContact.email != store.getters['auth/user_aliasname']) {
      client.chat(request, metadata, function (err) {
        if (err) {
          console.log(err.code);
          console.log(err.message);
        }
      });

    }

  }

  getContacts() {
    return new Promise((resolve, reject) => client.getContacts(new google_protobuf_empty_pb.Empty, metadata, function (err, response) {
      if (err) {
        return reject(err)
      }
      let contacts = [];
      response.toObject().contactsList.forEach(c => {
        const newContact = { id: c.id, name: c.name, email: c.email, hasNewMessages: false, numberOfUnreadMessages: 0 }
        contacts.push(newContact)
      });

      store.commit("user/saveContacts", { contacts: contacts })
      resolve(contacts);
    }))

  }
}
export const chatService = new ChatService();