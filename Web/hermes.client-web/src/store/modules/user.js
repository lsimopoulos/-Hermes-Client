export const user = {
    namespaced: true,
    state: {
      contacts: []
    },
    actions: {
     
    },
    mutations: {
      saveContacts(state, { contacts }) {
       state.contacts.push(contacts)
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
        return state.contacts[0].find((item)=>item.name===email)
      }
    }
  };
  