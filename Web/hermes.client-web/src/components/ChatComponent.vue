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
  // import 'vue-advanced-chat/dist/vue-advanced-chat.css';
  import { SendRequest } from '../proto/hermes_pb';
  import { ChatterClient } from '../proto/hermes_grpc_web_pb';
  import { CallCredentials } from '@grpc/grpc-js/build/src/call-credentials'
  

  export default {
    name: "ChatComponent",
     created () {
   
    this.connect();
  },
    components: {
    //   ChatWindow
    },
    methods : {
   connect () {
       const token = this.$store.getters['auth/access_token'];
      const metadata = { 'authorization': 'Bearer ' + token };
      var request = new SendRequest();
      request.setMessage("Wow");
       this.client = new ChatterClient('https://localhost:5001', CallCredentials.createFromPlugin, null);
      this.client.Chat(request, metadata, (err, response) => {
        if (err) {
          console.log(`Unexpected error for sayHello: code = ${err.code}, message = "${err.message}"`)
        } else {
          console.log(response.getMessage())
        }
      })
    }
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