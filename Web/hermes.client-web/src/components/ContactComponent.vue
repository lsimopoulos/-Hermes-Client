<template>
  <div class="contact">
    <div class="status-indicator" :class="!isgroup ? { online: isonline, offline: !isonline }: 'normal'"></div>
    <img src="@/assets/user.png" />
    <strong :class="hasNewMessages ? 'contact-p-strong-bold' : 'contact-p-strong'">{{ name }}</strong>
    <div v-if="hasNewMessages" class="status online">{{ numberOfUnreadMessages }}</div>
  </div>
</template>

<script>
export default {
  name: 'ContactComponent',
  props: ['name', 'hasNewMessages', 'email', 'numberOfUnreadMessages', 'isonline', 'isTyping', 'isgroup'],
}
</script>
<style>
.contact {
  height: 70px;
  border-bottom: 1px solid #e7ebee;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: red;
  /* Default color for offline */
  margin-right: 10px;
}
.status-indicator.normal {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: white;
  /* Default color for offline */
  margin-right: 10px;
}

.status-indicator.online {
  background-color: green;
}

.contact img {
  width: 40px;
  border-radius: 50%;
  margin: 15px;
}

.contact p {
  padding: 15px 0 0 0;
  width: 220px;
}

.contact-p-strong {
  font-weight: 300;
  font-size: 15px;
  color: #597a96;
}

.contact-p-strong-bold {
  font-weight: 600;
  font-size: 15px;
  color: #597a96;
}

.contact .status {
  background: #26c281;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  text-align: center;
  font-weight: 600;
  font-size: 11px;
  color: white;
}

.contact {
  cursor: pointer;
}
</style>