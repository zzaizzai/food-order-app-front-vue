<template>
  <b-row>
    <div>LoginPage</div>
  </b-row>

  <br>
  <div v-if="isLoggedIn">
    <div>
      Hello {{ usernameLoggedIn }}!! You are logged in!
    </div>
    <b-button variant="danger" @click="logout">Logout</b-button>
  </div>
  <div v-else>

    <b-row class="justify-content-center">
      <b-col sm="2"><label><strong>user name</strong></label></b-col>
      <b-col sm="4"><b-form-input placeholder="user name" type="text" v-model="username" /></b-col>
    </b-row>

    <b-row class="justify-content-center">
      <b-col sm="2"><label><strong>password</strong></label></b-col>
      <b-col sm="4"><b-form-input placeholder="password" type="text" v-model="password" @keyup.enter="login" /></b-col>
    </b-row>

    <b-row class="my-2"><b-col><b-button variant="success" @click="login">Login</b-button></b-col></b-row>


    <a href="/signup"><strong>go to sign up page</strong></a>
  </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import { Message } from "@/interfaces/Message";
import { AxiosError } from "axios";

export default defineComponent({
  name: "FoodView",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  components: {},
  computed: {
    isLoggedIn() {
      return store.getters.isAuthenticated;
    }
    ,
    usernameLoggedIn() {
      return store.getters.getUsername
    }

  },
  methods: {
    showAlertBar({ type, msg }: Message): void {
      store.dispatch("addMsg", { msg, type })
    },
    clearAlertBar(): void {
      store.dispatch("clearMsg")
    },
    async login() {
      this.clearAlertBar()
      try {
        const res = await store.dispatch("login", {
          username: this.username,
          password: this.password,
        });
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const res = error.response

          if (res?.status === 400) {
            this.showAlertBar({ type: "error", msg: "Bad Request!" })
          }

          // wrong password
          if (res?.status === 401) {
            this.showAlertBar({ type: "error", msg: "password wrong!" })
          }
        }
      }
    },
    async logout() {
      store.dispatch("logout");
    },
  },
});
</script>


<style scoped>
.order-list-layout {
  justify-content: center;
  width: 700px;
}
</style>