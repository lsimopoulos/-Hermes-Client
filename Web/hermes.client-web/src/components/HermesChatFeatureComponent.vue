<template>
  <div class="view-container">
    <ContactsListComponent :contacts="contacts" v-model="contacts" />
    <ChatWindowComponent
      class="chat-window"
      v-if="isContactSelected"
      :messages="currentMessages"
      v-model="currentMessages"
    />
  </div>
</template>
<script>
  import ContactsListComponent from './ContactsListComponent.vue'
  import ChatWindowComponent from './ChatWindowComponent.vue'
  // import { mapState } from 'vuex';

  export default {
    name: "HermesChatFeatureComponent",
    setup()
    {
    },
    inject: ['$chatService'],
  
  mounted()
  {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      const self = this
      if (mutation.type === 'chat/addChatMessage' ) {
        
        const selectContact = self.$store.getters['user/selected_contact'];
        if( (selectContact!= null &&  mutation.payload.chatMessage.name !=selectContact.name && !mutation.payload.chatMessage.isSelf) || selectContact == null){
           let contact = self.contacts.find((item)=>item.id=== mutation.payload.contactId)
           if(contact != null){
            contact.hasNewMessages = true;
            contact.numberOfUnreadMessages++;
            }
              
         }
          for( var i = 0; i < self.contacts.length; i++){ 
            if ( self.contacts[i] .id=== mutation.payload.contactId && i!= 0) { 
              let ctt = self.contacts[i];
              self.contacts.splice(i,1); 
              self.contacts.splice(1,0,ctt);
            }
          }
      }
      if (mutation.type === 'user/setSelectedContact' ) {
        self.currentMessages = state.chat.chats[mutation.payload.contact.id]
      }
       if (mutation.type === 'user/addContact' ) {
        self.contacts.push(mutation.payload.contact)
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
     computed: {
    isContactSelected() {
      return this.$store.getters['user/selected_contact'] != null;
    }

   },
    methods : {
      connect () {
        this.$chatService.connect();
      },
   getContacts(){
      this.$chatService.getContacts()
      .then(response => 
      { 
        
        response.forEach(c => {
          this.$store.commit("chat/initiateChat", { contactId: c.id });
          this.contacts.push(c)
          });
      })
    }    
   },
    data() {
      return {
        currentMessages: [],
        chats:{},
        contacts:[]
      }
    },
     beforeUnmount() {
    this.unsubscribe();
  },
  }
</script>
<style scoped>
.view-container {
  margin-top: 5px;
  display: flex;
  gap: 10px;
}

.chat-window {
  margin-top: 5px;
}
</style>