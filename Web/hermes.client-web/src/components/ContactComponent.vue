<template>
  <div class="contact">
    <img  src="@/assets/user.png" />
    <p>
        <strong>{{name}}</strong>
        <span>{{email}}</span>
    </p>
    <div :class="hasNewMessages ? 'status online' : ''"></div>
  </div>
</template>
<script>
 export default {
   name: 'ContactComponent',
   props: [ 'name','hasNewMessages','email'],
 }
</script>
<style>
.contact {
  height: 70px;
  border-bottom: 1px solid #e7ebee;
  position: relative;
  cursor: pointer;
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
  float: left;
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
  float: left;
  width: 220px;
}
.contact p strong {
  font-weight: 600;
  font-size: 15px;
  color: #597a96;
}
.contact p span {
  font-size: 13px;
  font-weight: 400;
  color: #aab8c2;
}
.contact .status {
  background: #26c281;
  border-radius: 50%;
  width: 9px;
  height: 9px;
  position: absolute;
  top: 31px;
  right: 17px;
}
.contact {
  
  cursor: pointer;
}
.contact .status.offline{background:#eaeef0;}
</style>