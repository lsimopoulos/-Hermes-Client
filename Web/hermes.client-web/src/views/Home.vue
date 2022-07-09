<template>
<div class="home">
<section class="hero is-dark">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Welcome to the Hermes chat          
        </h1>
        <h2 class="subtitle">
          A chat based on grpc
        </h2>
      </div>
    </div>
  </section> 
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