<template>
  <div>LoginPage</div>
  <input type="text" v-model="username" />
  <input type="text" v-model="password" />
  <button @click="login">login</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as authApi from "@/api/auth";
import axios from "axios";

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
    login() {
        // TODO: create login 
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