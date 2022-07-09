<template>
  <div class="container">
    <ContactsListComponent
      class="contacts-list"
      :contacts="contacts"
      v-model="contacts"
    />
    <ChatWindowComponent
      :messages="currentMessages"
      v-model="currentMessages"
    />
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#addContactModal"
    >
      Add a contact
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="addContactModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addContactModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addContactModalLabel">Add a contact</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label
              >Enter the email address of the contact you want to add</label
            >
            <input
              v-model="email"
              type="email"
              class="form-control"
              placeholder="Email"
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              id="close"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="addContact">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ContactsListComponent from './ContactsListComponent.vue'
  import ChatWindowComponent from './ChatWindowComponent.vue'
  import { mapState } from 'vuex';

  export default {
    name: "HermesChatFeatureComponent",
    setup()
    {
    },
    inject: ['$chatService'],
    created () {

    },
    computed: mapState(['chat/messages']),
  mounted()
  {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      var self = this
      if (mutation.type === 'chat/addChatMessage' ) {
      
        if( self.$store.getters['user/selected_contact'] != null && mutation.payload.chatMessage.name != self.$store.getters['user/selected_contact'].name && mutation.payload.chatMessage.isSelf == false){
           var contact = self.contacts.find((item)=>item.id=== mutation.payload.contactId)
           if(contact != null)
              contact.hasNewMessages = true;
         }

      }
      if (mutation.type === 'user/setSelectedContact' ) {
        self.currentMessages = state.chat.chats[mutation.payload.contact.id]
      }
    })
    this.connect()
    this.getContacts()
  },
    components: {
      // eslint-disable-next-line
       ContactsListComponent,
       ChatWindowComponent
    },
    methods : {
      connect () {
        this.$chatService.connect();
      },
      addContact(){
        if (this.email != "" ) {
          this.$chatService.addContact(this.email)
            .then(response => {
              const newContact = { id: response.id, name: response.name, hasNewMessages: false}
              this.contacts.push(newContact);
              this.$store.commit("chat/initiateChat", { contactId: response.id });
        })
        document.getElementById('close').click();
       }
   },
   getContacts(){
      this.$chatService.getContacts()
      .then(response => 
      { 
        
        response.forEach(c => {
          const newContact = { id: c.id, name : c.name, hasNewMessages : false}
          this.$store.commit("chat/initiateChat", { contactId: c.id });
          this.contacts.push(newContact)
          });
      })
    }    
   },
    data() {
      return {
        email: "",
        contacts: [],
        currentMessages: [],
        chats:{}
      }
    },
     beforeUnmount() {
    this.unsubscribe();
  },
  }
</script>
<style scoped>
.contacts-list {
  float: left;
}
</style>