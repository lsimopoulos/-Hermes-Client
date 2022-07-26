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
      addContact(state, { contact }){
        state.contacts.push(contact)
      },
      setSelectedContact(state, { contact }){
        state.selected_contact = contact
      },
    },
    getters: {
      contacts: state => state.contacts,
      selected_contact: state => state.selected_contact,
      getContactIdByEmail: (state) => (email) => {
        return state.contacts.find((item)=>item.email===email)
      }
    }
  };
  