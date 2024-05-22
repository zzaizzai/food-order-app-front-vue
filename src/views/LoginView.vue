<template>
  <div>LoginPage</div>
  <input type="text" v-model="username" />
  <input type="text" v-model="password" />
  <button @click="login">login</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as authApi from "@/api/auth";
import axios, { AxiosError } from 'axios';

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
        try {
            const response = await authApi.login(this.username, this.password);
            console.log('Response:', response);
            console.log('Token:', response.data.accessToken);
        } catch (error: any) {
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }
    }
  },
});
</script>


<style scoped>
.order-list-layout {
  justify-content: center;
  width: 700px;
}
</style>