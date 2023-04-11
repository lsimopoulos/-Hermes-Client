export const user = {
  namespaced: true,
  state: {
    contacts: []
  },
  actions: {
  },
  mutations: {
    saveContacts(state, { contacts }) {
      contacts.forEach(contact => {
        state.contacts.push(contact)
      });

    },
    addContact(state, { contact }) {
      state.contacts.push(contact)
    },
    updateContact(state, { contact }) {
      for (let index = 0; index < state.contacts; index++) {
        if (contact.id === state.contacts[index].id) {
          state.contacts.splice(index, 1);
          self.contacts.splice(index, 0, contact);
        }
      }
    },
    setSelectedContact(state, { contact }) {
      state.selected_contact = contact
    },
  },
  getters: {
    contacts: state => state.contacts,
    selected_contact: state => state.selected_contact,
    getContactIdByEmail: (state) => (email) => {
      return state.contacts.find((item) => item.email === email)
    },
    getContactIdById: (state) => (id) => {
      return state.contacts.find((item)=>item.id===id)
    }
  }
};
