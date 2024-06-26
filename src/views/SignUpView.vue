<template>
  <b-row> <div>SignUpPage</div></b-row>
  <b-row><b-col><input type="text" v-model="username" /></b-col></b-row>
  <b-row><b-col><input type="text" v-model="password" /></b-col></b-row>
  <b-row><b-col><input type="text" v-model="passwordCheck" /></b-col></b-row>

  <b-row><b-col><b-button variant="success" @click="signUp">signup</b-button></b-col></b-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
  name: "SignUpView",
  data() {
    return {
      username: "",
      password: "",
      passwordCheck: "",

    };
  },
  components: {},
  methods: {
    async signUp() {
        try {
            const res = store.dispatch("signup", {
            username: this.username,
            password: this.password,
        });
            
        } catch (error: any) {
            console.log(error.response)
            
        }
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