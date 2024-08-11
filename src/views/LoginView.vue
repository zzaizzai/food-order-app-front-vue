<template>
  <b-row>
    <div>LoginPage</div>
  </b-row>
  <b-row><b-col><input type="text" v-model="username" /></b-col></b-row>
  <b-row><b-col><input type="text" v-model="password" /></b-col></b-row>
  <b-row><b-col><b-button variant="success" @click="login">Login</b-button></b-col></b-row>

  <br>
  <div v-if="isLoggedIn">
    <div>
      Hello {{ usernameLoggedIn }}!! You are logged in!
    </div>
    <b-button variant="danger" @click="logout">Logout</b-button>
  </div>
  <div v-else>You are not logged in.</div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";

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
    async login() {
      store.dispatch("login", {
        username: this.username,
        password: this.password,
      });
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