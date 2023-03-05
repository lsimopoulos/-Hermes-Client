<template>
  <div id="app">
    <nav class="relative flex flex-wrap items-center content-between py-3 px-4 flex-no-wrap content-start text-white bg-blue-600">
      <a href="/" class="navbar-icon">
        <img
          src="@/assets/logo.png"
          width="40"
          height="40"
          class="inline-block align-top"
          alt=""
        />
        Hermes</a
      >
      <div class="flex flex-wrap list-reset pl-0 mb-0 mr-auto">
          <router-link to="/" class="inline-block py-2 px-4 no-underline">
            <font-awesome-icon icon="home" />
            <span class="navbar-icon-text">Home</span>
          </router-link>
      
      
          <router-link to="/about" class="inline-block py-2 px-4 no-underline">
            <font-awesome-icon icon="info" />
            <span class="navbar-icon-text">About</span>
          </router-link>
       
      </div>

    

      <div v-if="isLoggedIn" class="flex flex-wrap list-reset pl-0 mb-0 ml-auto">
       
          <a class="inline-block py-2 px-4 no-underline active"  href="javascript:void(0);" @click="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
       
      </div>
        <div v-else class="flex flex-wrap list-reset pl-0 mb-0 ml-auto">
       
          <router-link to="/sign" class="inline-block py-2 px-4 no-underline">
            <font-awesome-icon icon="user-plus" />
            <span class="navbar-icon-text">Sign</span>
          </router-link>
      
      </div>
    </nav>

    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
   inject: ["$chatService"],
   computed: {
    isLoggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
   },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/sign');
      this.$chatService.disconnect();
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar-icon {
  display: flex;
  align-items: center;
  column-gap: 0.5em;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: 1rem;
  font-size: 1.25rem;
  color: #fff;
}
.navbar-icon:hover {
  text-decoration: none;
  color: #fff;
}

.navbar-nav {
  column-gap: 1em;
}

.navbar-dark .navbar-nav .nav-link {
  color: #fff !important;
}

.navbar-icon-text {
  margin-left: 0.5em;
}
</style>
