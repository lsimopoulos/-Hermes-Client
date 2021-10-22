<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-primary">
      <a href="/" class="navbar-icon">
        <img
          src="@/assets/logo.png"
          width="40"
          height="40"
          class="d-inline-block align-top"
          alt=""
        />
        Hermes</a
      >
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">
            <font-awesome-icon icon="home" />
            <span class="navbar-icon-text">Home</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">
            <font-awesome-icon icon="info" />
            <span class="navbar-icon-text">About</span>
          </router-link>
        </li>
      </div>

      <div v-if="!isLoggedIn" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/sign" class="nav-link">
            <font-awesome-icon icon="user-plus" />
            <span class="navbar-icon-text">Sign</span>
          </router-link>
        </li>
      </div>

      <div v-if="isLoggedIn" class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link active"  href="javascript:void(0);" @click="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  
   computed: {
    isLoggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
   },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/sign');
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
