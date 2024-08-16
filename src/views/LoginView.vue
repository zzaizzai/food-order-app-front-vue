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
      <b-col sm="4"><b-form-input placeholder="password" type="text" v-model="password" /></b-col>
    </b-row>

    <b-row><b-col><b-button variant="success" @click="login">Login</b-button></b-col></b-row>
    <div>
    </div>


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
    showMessage({ type, msg }: Message): void {
      store.dispatch("addMsg", { msg, type })
    },

    async login() {
      try {
        const res = await store.dispatch("login", {
          username: this.username,
          password: this.password,
        });
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const res = error.response

          if (res?.status === 401) {
            this.showMessage({ type: "error", msg: "password wrong!" })
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