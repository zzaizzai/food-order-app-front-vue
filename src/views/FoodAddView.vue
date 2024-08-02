<template>
  <b-container>
    <b-row> <div>Food Add View</div></b-row>
    <b-row class="justify-content-center"
      ><b-col sm="3"
        ><b-form-input
          placeholder="Food Name"
          type="text"
          v-model="foodname" /></b-col
    ></b-row>
    <b-row class="justify-content-center"
      ><b-col sm="3"
        ><b-form-input
          placeholder="Store Name"
          type="text"
          v-model="store" /></b-col
    ></b-row>
    <b-row class="justify-content-center"
      ><b-col sm="3"
        ><b-form-input
          placeholder="Price"
          type="number"
          v-model="price" /></b-col
    ></b-row>
    <b-row class="justify-content-center"
      ><b-col sm="3"
        ><b-form-input
          placeholder="Category"
          type="number"
          v-model="category" /></b-col
    ></b-row>
    <b-row class="justify-content-center"
      ><b-col
        ><b-button variant="success" @click="addFodd">OK</b-button></b-col
      ></b-row
    >
  </b-container>
  <strong>{{ msg }}</strong>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import * as foodApi from "@/api/foods";
import { FoodCreateDto } from "@/interfaces/Food";

export default defineComponent({
  name: "FoodAddView",
  data() {
    return {
      msg: "",
      store: "",
      foodname: "",
      category: "",
      price: 0,
    };
  },
  methods: {
    async addFodd() {
      // reset message
      this.msg = "";

      // check
      if (this.store === "" || this.foodname === "" || this.category === "") {
        this.msg = "pls input";
        return;
      }

      const newFood: FoodCreateDto = {
        name: this.foodname,
        store: this.store,
        category: this.category,
        price: this.price,
        description: "",
      };

      const result = await foodApi.addFood(newFood);
    },
  },
});
</script>