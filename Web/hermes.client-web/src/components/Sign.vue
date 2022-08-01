<template>
  <div class="login-page">
    <div class="wallpaper"></div>

    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
          <div
            v-if="!registerActive"
            class="card login"
            v-bind:class="{ error: emptyFields }"
          >
            <h1>Sign In</h1>
            <form class="form-group" @submit.prevent>
              <input
                v-model="emailLogin"
                type="email"
                class="form-control"
                placeholder="Email"
                required
              />
              <input
                v-model="passwordLogin"
                type="password"
                class="form-control"
                placeholder="Password"
                required
              />
              <input type="submit" class="btn btn-primary" @click="doLogin" />
              
              <p>
                Don't have an account?
                <a
                  href="#"
                  @click="
                    (registerActive = !registerActive), (emptyFields = false)
                  "
                  >Sign up here</a
                >
              </p>
            </form>
          </div>

          <div
            v-else
            class="card register"
            v-bind:class="{ error: emptyFields }"
          >
            <h1>Sign Up</h1>
            <form class="form-group">
              <input
                v-model="emailReg"
                type="email"
                class="form-control"
                placeholder="Email"
                required
              />
               <input
                v-model="name"
                type="text"
                class="form-control"
                placeholder="Name"
                required
              />
              <input
                v-model="passwordReg"
                type="password"
                class="form-control"
                placeholder="Password"
                required
              />
              <input
                v-model="confirmReg"
                type="password"
                class="form-control"
                placeholder="Confirm Password"
                required
              />
              <input
                type="submit"
                class="btn btn-primary"
                @click="doRegister"
              />
              <p>
                Already have an account?
                <a
                  href="#"
                  @click="
                    (registerActive = !registerActive), (emptyFields = false)
                  "
                  >Sign in here</a
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignComponent",
  data() {
    return {
      registerActive: false,
      emailLogin: "",
      passwordLogin: "",
      emailReg: "",
      passwordReg: "",
      confirmReg: "",
      name:"",
      emptyFields: false,
    }
    
  },
  methods: {
    doLogin() {
      if (this.emailLogin === "" || this.passwordLogin === "") {
        this.emptyFields = true;
        this.loading = true;
      } else {
        this.$store.dispatch("auth/attemptLogin", {
          email: this.emailLogin,
          password: this.passwordLogin,
        })
        .then(
            () => {
              this.$router.push("/");
            }
          );
      }
      return false;
    },

    doRegister() {
      if (
        this.emailReg === "" ||
        this.passwordReg === "" ||
        this.confirmReg === "" ||
        this.name === ""
      ) {
        this.emptyFields = true;
      } else {
        this.$store
          .dispatch("auth/attemptRegister", {
            email: this.emailReg,
            password: this.passwordReg,
            name: this.name
          });
      }
       this.registerActive = false;
       this.emailLogin = this.emailReg;
    },
  },
};
</script>
<style scoped >
p {
  line-height: 1rem;
}

.card {
  padding: 20px;
}

input {
  margin-bottom: 20px;
}

.login-page {
  align-items: center;
  display: flex;
  height: 100vh;
}
.wallpaper {
  background: url(https://images.pexels.com/photos/698333/pexels-photo-698333.jpeg?auto=compress&cs=tinysrgb&h=1280&w=1920)
    no-repeat center center;
  background-size: cover;
  height: 100%;
  position: absolute;
  left: 0;
  top: 66px;
  width: 100%;
  z-index: -1;
}

h1 {
  margin-bottom: 1.5rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.error {
  animation-name: errorShake;
  animation-duration: 0.3s;
}

@keyframes errorShake {
  0% {
    transform: translateX(-25px);
  }
  25% {
    transform: translateX(25px);
  }
  50% {
    transform: translateX(-25px);
  }
  75% {
    transform: translateX(25px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>