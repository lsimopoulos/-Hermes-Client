<template>
  <div class="col-md-12"></div>
  
  <textarea  v-model="chatMsg" />
   <input type="submit" class="btn btn-primary" @click="sendMessage"/>
</template>
<script>
//   import ChatWindow from 'vue-advanced-chat';
  // import 'vue-advanced-chat/dist/vue-advanced-chat.css';
  import { sendRequest } from '../proto/hermes_pb';
  import { ChatterClient } from '../proto/hermes_grpc_web_pb';
  import { CallCredentials } from '@grpc/grpc-js/build/src/call-credentials'
  

  export default {
    name: "ChatComponent",
  
     created () {
   
   
  },
  mounted()
  {
    this.connect()
  },
    components: {
    //   ChatWindow
    },
    methods : {
   connect () {
      
       this.client = new ChatterClient('https://localhost:5001', CallCredentials.createFromPlugin, null);
   
   },
   sendMessage()
   {

      const token = this.$store.getters['auth/access_token'];
      const metadata = { 'Authorization': 'Bearer ' + token , 'Content-Type' :'application/grpc-web-text'};
      var request = new sendRequest();
      request.setMessage(this.chatMsg);
      
      var  call =  this.client.chat(request,metadata);
     call.on('data', function (result) {
       
       console.log(result)
       });

        call.on('status', function (status) {
          
          console.log(status.code, status.details, status.metadata);
    });

    call.on("end", () => {
      console.log("Stream ended.");
    });
   }
    
    },
    data() {
      return {
        chatMsg: ""
      }
    }
  }
</script>