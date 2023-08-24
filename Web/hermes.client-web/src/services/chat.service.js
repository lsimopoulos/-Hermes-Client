import { sendRequest, addContactRequest, addGroupRequest, groupMember, chatStatus, sendIsTyping, historyMessagesRequest } from '../proto/hermes_pb';
import { ChatterClient } from '../proto/hermes_grpc_web_pb';
import { CallCredentials } from '@grpc/grpc-js/build/src/call-credentials'
import store from '../store'

var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');


var token = null;
var metadata = null;
const client = new ChatterClient('https://localhost:55556', CallCredentials.createFromPlugin, null);
let messages_streaming_call = null;
let status_streaming_call = null;
//https://hermes.simopoulos.net:55556 https://localhost:55556

class ChatService {
  connect() {

    token = store.getters['auth/access_token']
    metadata = { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/grpc-web-text' }
    document.addEventListener('sendIsTypingEvent', this.sendIsTyping);
    messages_streaming_call = client.connectMessages(new google_protobuf_empty_pb.Empty, metadata);
    status_streaming_call = client.connectStatus(new google_protobuf_empty_pb.Empty, metadata)

    const ref_store = store;
    //streaming call for messages
    messages_streaming_call.on('data', function (result) {
      const selectedContact = ref_store.getters['user/getContactIdById'](result.getFrom())
      const msg = { message: result.getMessage(), name: selectedContact.name, time: result.getTime(), isSelf: false }
      const gpId = result.getGroupid()
      ref_store.commit("chat/addChatMessage", { chatMessage: msg, contactId: gpId ? gpId : selectedContact.id });
    }.bind(this));

    messages_streaming_call.on('status', function (status) {
      //display error
      console.log(status.code, status.details, status.metadata);
      if (status.code > 1)
        ref_store.commit('auth/loginFailure');
      messages_streaming_call.cancel();
    });

    messages_streaming_call.on('error', function (error) {
      //display error
      console.log(error);

      messages_streaming_call.cancel();
    });

    messages_streaming_call.on("end", () => {
      console.log("Stream ended.");
      ref_store.commit('auth/loginFailure');
      client.cancel();
    });

    //streaming call for status
    status_streaming_call.on('data', function (result) {
      const status = result.toObject();
      let customEvent;
      if (status.isonline && status.istyping) {
        customEvent = new CustomEvent('isTypingEvent', {
          detail: status,
        });
      }
      else {
        customEvent = new CustomEvent('updateStatusEvent', {
          detail: status,
        });
      }

      document.dispatchEvent(customEvent);
    }.bind(this));

    messages_streaming_call.on('status', function (status) {
      //display error
      console.log(status.code, status.details, status.metadata);
      if (status.code > 1)
        ref_store.commit('auth/loginFailure');
      status_streaming_call.cancel();
    });

    messages_streaming_call.on('error', function (error) {
      //display error
      console.log(error);

      status_streaming_call.cancel();
    });

    messages_streaming_call.on("end", () => {
      console.log("Stream ended.");
      ref_store.commit('auth/loginFailure');
      client.cancel();
    });


  }

  disconnect() {
    if (messages_streaming_call)
      messages_streaming_call.cancel();
    if (status_streaming_call)
      status_streaming_call.cancel();

    document.removeEventListener('sendIsTypingEvent', this.sendIsTyping);
  }
  //code taken https://codepremix.com/detect-urls-in-text-and-create-a-link-in-javascript
  replaceURLs(message) {
    if (!message) return;
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
    const now = new Date();

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
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
        const newContact = { id: contact.id, name: contact.name, email: contact.email, hasNewMessages: false, numberOfUnreadMessages: 0, isGroup: false, isonline: contact.isonline }
        store.commit("user/addContact", { contact: newContact });
        let customEvent = new CustomEvent('addContactEvent', {
          detail: { contact: newContact },
        });

        document.dispatchEvent(customEvent);

        request.setFrom(store.getters['auth/user_id'])
        resolve(contact);
      }))
    }
  }

  addGroup(nameOfGroup, members) {
    if (nameOfGroup && members.length > 0) {
      let agr = new addGroupRequest()
      agr.setName(nameOfGroup);
      const mem = [];
      members.forEach((member) => mem.push(new groupMember().setId(member)))
      agr.setMembersList(mem);
      return new Promise((resolve, reject) => client.addGroup(agr, metadata, function (err, response) {
        if (err) {
          console.log(err.code);
          console.log(err.message);
          return reject(err)
        }
        const contact = response.toObject();
        const newContact = { id: contact.id, name: contact.name, email: contact.email, hasNewMessages: false, numberOfUnreadMessages: 0, isGroup: true }
        store.commit("user/addContact", { contact: newContact })
        let customEvent = new CustomEvent('addContactEvent', {
          detail: { contact: newContact },
        });

        document.dispatchEvent(customEvent);
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
    request.setFrom(store.getters['auth/user_id']);
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
  fetchOldMessages(messageId) {
    let request = new historyMessagesRequest();

    const selectedContact = store.getters['user/selected_contact'];
    request.setContactid(selectedContact.id);
    if (messageId) {
      request.setPageLastid(messageId);
    }

    return new Promise((resolve, reject) => client.historyMessages(request, metadata, function (err,response) {
      if (err) {
        return reject(err)
      }
      const resp = response.toObject();
      let fetchedMessages = [];

      resp.messagesList.forEach(c => {
        store.commit("chat/addOldChatMessage", { chatMessage: c, contactId: selectedContact.id });
        fetchedMessages.push(c);
      })
     var result = { lastid : resp.nextPageToken, messages: fetchedMessages}
      resolve(result);
    }))

  }

  sendIsTyping() {
    let cs = new chatStatus();
    cs.setFrom(store.getters['auth/user_id']);
    cs.setIstyping(true);
    cs.setIsonline(true);
    const selectedContact = store.getters['user/selected_contact'];
    if (selectedContact.isonline) {
      cs.setTo(selectedContact.id);
      client.sendIsTyping(cs, metadata, function (err) {
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
        const newContact = { id: c.id, name: c.name, email: c.email, hasNewMessages: false, numberOfUnreadMessages: 0, isonline: c.isonline, isTyping: false, isGroup: c.isgroup }
        contacts.push(newContact)
      });
      store.dispatch("auth/setUserId", {
        userId: contacts[0].id
      })

      store.commit("user/saveContacts", { contacts: contacts })
      resolve(contacts);
    }))
  }
}
export const chatService = new ChatService();