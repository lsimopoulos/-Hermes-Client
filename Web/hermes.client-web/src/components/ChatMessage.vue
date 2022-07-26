<template>
  <div :class="isSelf ? 'msgContainer' : 'msgContainer darker'">
    <p :class="isSelf ? 'right' : 'left'">{{ from }}</p>
    <p v-dompurify-html="message"></p>
    <span :class="isSelf ? 'time-right' : 'time-left'">{{ time }}</span>
  </div>
</template>
<script>
 export default {
   name: 'ChatMessage',
   props: [ 'message','from','time','isSelf' ],
 }
</script>
<style>
/* Chat containers */
.msgContainer {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}

/* Darker chat container */
.darker {
  border-color: #ccc;
  background-color: #ddd;
}

/* Clear floats */
.msgContainer::after {
  content: "";
  clear: both;
  display: table;
}

/* Style images */
.msgContainer img {
  float: left;
  max-width: 60px;
  width: 100%;
  margin-right: 20px;
  border-radius: 50%;
}

.msgContainer p.right {
  float: right;
  margin-left: 20px;
  margin-right: 0;
}
.msgContainer p.left {
  float: left;
  margin-right: 20px;
  border-radius: 50%;
}

/* Style time text */
.time-right {
  float: right;
  color: #aaa;
}

/* Style time text */
.time-left {
  float: left;
  color: #999;
}
</style>