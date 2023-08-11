<template>
  <div class="view-container">
    <ContactsListComponent :contacts="contacts" v-model="contacts" />
    <ChatWindowComponent class="chat-window" v-if="isContactSelected" :messages="currentMessages"
      :unreadMessages="unreadMessages" v-model="currentMessages" @update-unread="updateUnreadMessages" :contactName="contactName" />
  </div>
</template>
<script>
import ContactsListComponent from "./ContactsListComponent.vue";
import ChatWindowComponent from "./ChatWindowComponent.vue";

export default {
  name: "HermesChatFeatureComponent",
  setup() { },
  inject: ["$chatService"],
  created() {
    document.addEventListener('updateStatusEvent', this.updateStatusEvent);
  },
  mounted() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      const self = this;
      if (mutation.type === "chat/addChatMessage") {
        const selectContact = self.$store.getters["user/selected_contact"];

        for (var i = 0; i < self.contacts.length; i++) {
          if (self.contacts[i].id === mutation.payload.contactId && i != 0) {
            let ctt = self.contacts[i];
            if (
              (selectContact != null &&
                mutation.payload.chatMessage.name != selectContact.name &&
                !mutation.payload.chatMessage.isSelf) ||
              selectContact == null
            ) {
              ctt.hasNewMessages = true;
              ctt.numberOfUnreadMessages++;
            } else if (
              selectContact &&
              mutation.payload.chatMessage.name == selectContact.name &&
              !mutation.payload.chatMessage.isSelf
            ) {
              self.unreadMessages = self.unreadMessages + 1;
            }
            self.contacts.splice(i, 1);
            self.contacts.splice(1, 0, ctt);
          }
        }
      }
      if (mutation.type === "user/setSelectedContact") {
        self.currentMessages = state.chat.chats[mutation.payload.contact.id];
        self.unreadMessages = 0;
        for (let index = 0; index < self.contacts.length; index++) {
          if (mutation.payload.contact.id === self.contacts[index].id) {
            const contact = self.contacts[index];
            self.unreadMessages = contact.numberOfUnreadMessages;
            contact.numberOfUnreadMessages = 0;
            self.contacts.splice(index, 1);
            self.contacts.splice(index, 0, contact);
          }
        }
      }
      if (mutation.type === "user/addContact") {
        self.contacts.push(mutation.payload.contact);
      }
    });
    this.connect();
    this.getContacts();
  },
  components: {
    // eslint-disable-next-line
    ContactsListComponent,
    ChatWindowComponent,
  },
  computed: {
    isContactSelected() {
      return this.$store.getters["user/selected_contact"] != null;
    },
    contactName(){
      return this.$store.getters["user/selected_contact"].name;
    }
  },
  methods: {
    connect() {
      this.$chatService.connect();
    },
    updateUnreadMessages(numberOfUnreadMessages) {
      this.unreadMessages = numberOfUnreadMessages;
    },
    getContacts() {
      this.$chatService.getContacts().then((response) => {
        response.forEach((c) => {
          this.$store.commit("chat/initiateChat", { contactId: c.id });
          this.contacts.push(c);
        });
      });
    },
    updateStatusEvent(event) {
      const status = event.detail;
      console.log(status);
      for (let index = 0; index < this.contacts.length; index++) {
        if (status.from === this.contacts[index].id &&  !this.contacts[index].isGroup) {
          this.contacts[index].isonline = status.isonline;
        }
      }
    },
  },
  data() {
    return {
      currentMessages: [],
      chats: {},
      contacts: [],
      unreadMessages: 0,
    };
  },
  beforeUnmount() {
    this.unsubscribe();
  },
};
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