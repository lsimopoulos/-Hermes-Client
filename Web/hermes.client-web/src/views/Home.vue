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
  <Chat v-if="loggedin" /> 
 
   
</div>
</template>
<script>
 import Chat from '../components/Chat';

export default {
  name: 'home',
  components: {
     Chat
  },
  data() {
    return {
      loggedin: true
    }
  }
}
</script>
<style>
 
</style>