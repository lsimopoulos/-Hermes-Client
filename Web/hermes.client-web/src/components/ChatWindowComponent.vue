<template>
  <div class="chat-window-container">
    <div class="chatcontainer" @scroll="onScroll">
      <div
        v-for="(msg, index) in currentMessages"
        :key="index"
        ref="chat_container"
        :class="msg.isSelf ?  'my-message' : 'other-message'"
      >
        <ChatMessage
          :from="msg.name"
          :time="msg.time"
          :isSelf="msg.isSelf"
          :message="msg.message"
        />
      </div>
      <button
        v-if="!isBottom"
        type="submit"
        class="btn btn-primary float"
        @click="scrollToBottom"
      >
        <font-awesome-icon icon="angle-double-down" />
      </button>
    </div>
    <div class="chat-input-area">
      <input
        type="text"
        class="form-control text-input"
        v-model="chatMsg"
        v-on:keyup.enter="sendMessage"
      />
      <button
        type="submit"
        class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600 sendmessage-btn"
        @click="sendMessage"
      >
        <font-awesome-icon icon="paper-plane" />
      </button>
    </div>
  </div>
</template>
<script>
import ChatMessage from "./ChatMessage.vue";
import { chatService } from "../services/chat.service";

export default {
  name: "ChatWindowComponent",
  props: {
    messages: Array,
    unreadMessages: Number,
  },
  emits: ["update-unread"],
  computed: {
    currentMessages: {
      get() {
        return this.messages;
      },
    },
  },
  watch: {
    currentMessages: {
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal[0] != oldVal[0]) {
          this.$nextTick(() => {
            this.scrollToBottom();
          });
        }
        else
        {
          if (this.isBottom)
          {
             this.$nextTick(() => {
            this.scrollToBottom();
          });
          }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  components: {
    // eslint-disable-next-line
    ChatMessage,
  },
  methods: {
    sendMessage() {
      if (this.chatMsg) {
        chatService.sendMessage(this.chatMsg);
        this.chatMsg = "";

        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    onScroll(e) {
      if (!this.isScrollingFromCode) {
        const { scrollTop, offsetHeight, scrollHeight } = e.target;
        this.isBottom = scrollTop + offsetHeight + 50 > scrollHeight;
        if (this.isBottom && this.unreadMessages > 0) {
          this.$emit('update-unread', 0);
        }
      }
    },
    scrollToBottom() {
      this.isScrollingFromCode = true;
      const chatcontainer = this.$refs.chat_container;
      if (chatcontainer && chatcontainer.length > 0) {
        let divNumber =
          this.unreadMessages > 0
            ? chatcontainer.length - this.unreadMessages - 1
            : chatcontainer.length - 1;
        if (divNumber < 0) divNumber = 0;
        chatcontainer[divNumber].scrollIntoView({ behavior: "smooth" });
      }
      setTimeout(
        function () {
          this.isScrollingFromCode = false;
          if (this.isBottom && this.unreadMessages > 0) {
            this.$emit('update-unread', 0);
          }
        }.bind(this),
        500
      );
    },
  },
  data() {
    return {
      chatMsg: "",
      isBottom: true,
      isScrollingFromCode: false,
    };
  },
};
</script>
<style scoped>
.chat-window-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 90vh;
}
.chatcontainer {
  padding: 0 20px;
  margin: 0 auto;
  min-height: 92%;
  width: 100%;
  border: 3px solid #f1f1f1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.chat-input-area {
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
}
.sendmessage-btn {
  border-radius: 50%;
}
.text-input {
  width: 90%;
}
.float {
  position: fixed;
  width: 40px;
  height: 35px;
  bottom: 80px;
  right: 30px;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
}
.my-message {
  display: flex;
  justify-content: flex-end;
}
.other-message {
   display: flex;
  justify-content: flex-start;
}
</style>