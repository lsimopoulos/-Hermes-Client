<template>
  <div class="col-md-12" id="container"></div>

  <textarea  v-model="chatMsg"  ref="txtarea" />
   <input type="submit" class="btn btn-primary" @click="sendMessage"/>
</template>
<script>
  import { sendRequest } from '../proto/hermes_pb';
  import { ChatterClient} from '../proto/hermes_grpc_web_pb';
  import { CallCredentials } from '@grpc/grpc-js/build/src/call-credentials'
  import  ChatMessage  from './ChatMessage.vue'
  import { createApp, h } from 'vue'
  var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
  

  export default {
    name: "ChatComponent",
  
     created () {
   
   
  },
  mounted()
  {
    this.connect()
  },
    components: {
      // eslint-disable-next-line
       ChatMessage
    },
    methods : {
   connect () {
      
       this.client = new ChatterClient('https://localhost:5001', CallCredentials.createFromPlugin, null);
      const token = this.$store.getters['auth/access_token'];
      const metadata = { 'Authorization': 'Bearer ' + token , 'Content-Type' :'application/grpc-web-text'};
    
        var  call =  this.client.connect(new google_protobuf_empty_pb.Empty,metadata);
     call.on('data', function (result) {
       console.log(result)
       
          this.createChatMessageControl(result.getMessage(),result.getFrom(),result.getTime(),true)

       }.bind(this));

        call.on('status', function (status) {
          
          console.log(status.code, status.details, status.metadata);
    });

    call.on("end", () => {
      console.log("Stream ended.");
    });
   
   },
     getNow() {
                    const today = new Date();
                    return today.getHours() + ":" + today.getMinutes();
                },
   createChatMessageControl(message,from,time,isSelf)
   {
     var cm = createApp({ 
  setup () {
    return () => h(ChatMessage, { message: message,from:from, time: time,isSelf: isSelf})
  }
});
// inserting to dom
const wrapper = document.createElement("div")
cm.mount(wrapper)
document.body.appendChild(wrapper)
 
   },

   sendMessage()
   {
      const token = this.$store.getters['auth/access_token'];
      const metadata = { 'Authorization': 'Bearer ' + token , 'Content-Type' :'application/grpc-web-text'};
      var request = new sendRequest();
      request.setMessage(this.chatMsg)
      
      var time = this.getNow()
      request.setTime(time)
      
      if(this.chatMsg)
      {
        this.createChatMessageControl(this.chatMsg,"Me",time,false)
         this.$refs["txtarea"].value = "";
      }
      this.client.chat(request,metadata, function(err, response) {
  if (err) {
    console.log(err.code);
    console.log(err.message);
  } else {
    console.log(response.getMessage());
  }
});
  
    
   }
    },
    data() {
      return {
        chatMsg: "",
      }
    }
  }
</script>