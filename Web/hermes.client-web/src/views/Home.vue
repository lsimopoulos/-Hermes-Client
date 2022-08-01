<template>
<div>

  <ChatComponent v-if="isLoggedIn" /> 
 
   
</div>
</template>
<script>
 import ChatComponent from '../components/HermesChatFeatureComponent';

export default {
  name: 'HomeView',
  components: {
     ChatComponent
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
   },
}
</script>
<style>
</style>