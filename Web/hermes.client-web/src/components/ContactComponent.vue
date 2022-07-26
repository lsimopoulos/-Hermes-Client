<template>
  <div class="contact">
    <img src="@/assets/user.png" />
    <strong
      :class="hasNewMessages ? 'contact-p-strong-bold' : 'contact-p-strong'"
      >{{ name }}</strong>
    <div v-if="hasNewMessages" class="status online">{{numberOfUnreadMessages}}</div>
  </div>
</template>
<script>
 export default {
   name: 'ContactComponent',
   props: [ 'name','hasNewMessages','email', 'numberOfUnreadMessages'],
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

.selected {
  background: #f1f4f6;
}
.contact:hover {
  background: #f1f4f6;
  cursor: pointer;
}
.contact img {
  width: 40px;
  border-radius: 50%;
  margin: 15px;
  /* float: left; */
}
.floatingImg {
  width: 40px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 12px;
  border: 3px solid #fff;
}
.contact p {
  padding: 15px 0 0 0;
  /* float: left; */
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
  color: white ;
}
.contact {
  cursor: pointer;
}
</style>