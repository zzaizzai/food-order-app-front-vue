<template>
  <div>

      <b-row> <div>Food Add View</div></b-row>
      <b-row><b-col><input type="text" v-model="username" /></b-col></b-row>
      <b-row><b-col><input type="text" v-model="password" /></b-col></b-row>
      <b-row><b-col><b-button variant="success" @click="login">OK</b-button></b-col></b-row>
  </div>
</template>


<script lang="ts">
export default {
  name: "FoodAddView",
  data(): {
    store: string;
    name: string;
    price: number
    } {
    return {
      store: "",
      name: "",
      price: 0
    };
  },
  methods: {
    
  }
};
</script>