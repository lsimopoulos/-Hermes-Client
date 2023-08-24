export const chat = {
  namespaced: true,
  state: {
    chats: {}
  },
  actions: {

  },
  mutations: {
    initiateChat(state, { contactId }) {
      if ((!Array.isArray(state.chats[contactId]) && state.chats[contactId].length == 0) || !state.chats.hasOwnProperty(contactId))
        state.chats[contactId] = [];
    },
    addChatMessage(state, { chatMessage, contactId }) {
      state.chats[contactId].push(chatMessage);
      let ce = new CustomEvent('messagedAddedEvent', { detail: { id: contactId, chatMessage: chatMessage } });
      document.dispatchEvent(ce);
    },
    addOldChatMessage(state, { chatMessage, contactId }) {
      state.chats[contactId].splice(0, 0, chatMessage);
    },
  },
  getters: {
    chats: state => state.chats,
    getCachedMessages: (state) => (contactId) => {
      return state.chats[contactId];
    },
  }
};
