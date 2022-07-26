<template>
  <div class="chat-window-container">
    <div class="chatcontainer">
      <div v-for="msg in messages" :key="msg">
        <ChatMessage
          :from="msg.name"
          :time="msg.time"
          :isSelf="msg.isSelf"
          :message="msg.message"
        />
      </div>
    </div>
    <div class="chat-input-area">
      <input
        type="text"
        class="form-control text-input"
        v-model="chatMsg"
        v-on:keyup.enter="sendMessage"
      />
      <input
        type="submit"
        class="btn btn-primary sendmessage-btn"
        @click="sendMessage"
      />
    </div>
  </div>
</template>
<script>
  import  ChatMessage  from './ChatMessage.vue'
  import {chatService} from '../services/chat.service'
  

  export default {
    name: "ChatWindowComponent",
    created () {
   },
    mounted(){
  },
   props:{
     messages:{
          type:  Array
      }
   },
  components: {
      // eslint-disable-next-line
       ChatMessage,
    },
    methods : {
      sendMessage(){
        if(this.chatMsg){
          chatService.sendMessage(this.chatMsg);
          this.chatMsg = "";
        }
   },
 
    },
    computed: {
   },
    data() {
      return {
        chatMsg: "",
      }
    }
  }
</script>
<style scoped>
.chat-window-container{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 85vh;
}
.chatcontainer {
  padding: 0 20px;
  margin: 0 auto;
  min-height: 90%;
  height: 90%;
  width: 100%;
  border: 3px solid #f1f1f1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.chat-input-area {
  width: 100%;
  /* height: 40px; */
  /* padding: 10px; */
  margin-bottom: 10px;
}
.sendmessage-btn {
}
.text-input {
  width: 90%;
}
</style>