<template>
    <div class="col-md-12">
        <!-- <chat-window
            :current-user-id="currentUserId"
            :rooms="rooms"
            :messages="messages"
        /> -->
        Hello!!
    </div>
</template>
<script>
//   import ChatWindow from 'vue-advanced-chat';
  import 'vue-advanced-chat/dist/vue-advanced-chat.css';

  export default {
    name: "Chat",
    components: {
    //   ChatWindow
    },
    data() {
      return {
        rooms: [],
        messages: [],
        currentUserId: 1234
      }
    }
  }
</script>