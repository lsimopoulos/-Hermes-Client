export const chat = {
  namespaced: true,
  state: {
    chats: {}
  },
  actions: {

  },
  mutations: {
    initiateChat(state, { contactId }) {
      state.chats[contactId] = [];
    },
    addChatMessage(state, { chatMessage, contactId }) {
      state.chats[contactId].push(chatMessage);
      let ce = new CustomEvent( 'messagedAddedEvent', { detail : contactId});
      document.dispatchEvent(ce);
    },
  },
  getters: {

  }
};
