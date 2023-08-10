<template>
  <div class="view-container">
    <ContactsListComponent :contacts="contacts" v-model="contacts" />
    <ChatWindowComponent class="chat-window" v-if="isContactSelected" :messages="currentMessages"
      :unreadMessages="unreadMessages" v-model="currentMessages" @update-unread="updateUnreadMessages" />
  </div>
</template>
<script>
import ContactsListComponent from "./ContactsListComponent.vue";
import ChatWindowComponent from "./ChatWindowComponent.vue";
import { mapState } from 'vuex'

export default {
  name: "HermesChatFeatureComponent",
  setup() { },
  inject: ["$chatService"],
  created() {
    document.addEventListener('updateStatusEvent', this.updateStatusEvent);
    document.addEventListener('messagedAddedEvent', this.messageAddedEvent)
    document.addEventListener('setSelectedContactEvent', this.setSelectedContactEvent);
    document.addEventListener('addContactEvent', this.addContactEvent);
  },
  mounted() {
    this.connect();
    this.getContacts();
  },
  components: {
    // eslint-disable-next-line
    ContactsListComponent,
    ChatWindowComponent,
  },
  computed: {
    ...mapState('user', {
      isContactSelected: state => state.selected_contact !== null
    }),
    ...mapState('chat', {
      chats: state => state.chats
    })
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
        if (status.from === this.contacts[index].id && !this.contacts[index].isGroup) {
          this.contacts[index].isonline = status.isonline;
        }
      }
    },
    messageAddedEvent(event) {
      const selectContact = this.$store.getters["user/selected_contact"];

      for (var i = 0; i < this.contacts.length; i++) {
        if (this.contacts[i].id === event.detail.id && i != 0) {
          let ctt = this.contacts[i];
          if (
            (selectContact != null &&
              event.detail.chatMessage.name != selectContact.name &&
              !event.detail.chatMessage.isSelf) ||
            selectContact == null) {
            ctt.hasNewMessages = true;
            ctt.numberOfUnreadMessages++;
          } else if (
            selectContact &&
            event.detail.chatMessage.name == selectContact.name &&
            !event.detail.chatMessage.isSelf
          ) {
            this.unreadMessages = this.unreadMessages + 1;
            const event = new CustomEvent('changeChatContentEvent', {
              detail: {
                sourceChanged: false,
                newMessage: true
              }
            });
            document.dispatchEvent(event);
          }
          this.contacts.splice(i, 1);
          this.contacts.splice(1, 0, ctt);
        }
      }

    },
    addContactEvent(event) {
      this.contacts.push(event.detail.contact);
    },
    setSelectedContactEvent(event) {
      if (this.chats[event.detail.contact.id][0] !== this.currentMessages[0]) {
        const event = new CustomEvent('changeChatContentEvent', {
          detail: {
            sourceChanged: true,
            newMessage: false
          }
        });
        document.dispatchEvent(event);
      }
      this.currentMessages = this.chats[event.detail.contact.id];
      this.unreadMessages = 0;
      for (let index = 0; index < this.contacts.length; index++) {
        if (event.detail.contact.id === this.contacts[index].id) {
          const contact = this.contacts[index];
          this.unreadMessages = contact.numberOfUnreadMessages;
          contact.numberOfUnreadMessages = 0;
          this.contacts.splice(index, 1);
          this.contacts.splice(index, 0, contact);
        }
      }
    }
  },
  beforeUnmount() {
    document.removeEventListener('updateStatusEvent', this.updateStatusEvent);
    document.removeEventListener('messagedAddedEvent', this.messageAddedEvent)
    document.removeEventListener('setSelectedContactEvent', this.setSelectedContactEvent);
    document.removeEventListener('addContactEvent', this.addContactEvent);
  },
  data() {
    return {
      currentMessages: [],
      contacts: [],
      unreadMessages: 0,
    };
  }
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