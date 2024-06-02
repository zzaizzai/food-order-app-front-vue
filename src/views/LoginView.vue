<template>
  <b-row> <div>LoginPage</div></b-row>
  <b-row><b-col><input type="text" v-model="username" /></b-col></b-row>
  <b-row><b-col><input type="text" v-model="password" /></b-col></b-row>
  <b-row><b-col><b-button variant="success" @click="login">login</b-button></b-col></b-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
  name: "FoodView",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  components: {},
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