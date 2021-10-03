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
  import { SendRequest } from '../proto/hermes_pb';
  import { ChatterClient } from '../proto/hermes_grpc_web_pb';

  const client = new ChatterClient('http://localhost:8080');

  const message = new SendRequest();
  message.setMessage("WOW");

  client.chat(message, {}, (err, response) => {
    console.log(response.getMessage());
  });

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