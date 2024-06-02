<template>
  <div>
    <h2><strong>Its History view</strong></h2>
  </div>
  <div class="container order-list-layout mx-auto">
    <div v-for="(order, index) in orderList" cols="12" md="6" :key="index">
      <b-row>
        {{ order.id }} {{ order.food?.name ?? "food name" }}
        {{ order.status ?? "status" }}
        {{ order.quantity ?? "quantity" }}
        {{ order.totalPrice ?? "totalPrice" }}
      </b-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as apiOrders from "@/api/orders";


export default defineComponent({
  name: "FoodView",
  data() {
    return {
      orderList: [
        // {
        //   id: 1,
        //   price: 200,
        //   name: "pizza",
        //   store: "pizza hut",
        //   description: "very tasty",
        // },
        // {
        //   id: 2,
        //   price: 500,
        //   name: "fired chiken",
        //   store: "KFC",
        //   description: "yammy",
        // },
        // {
        //   id: 3,
        //   price: 700,
        //   name: "sushi",
        //   store: "sushiro",
        //   description: "raw fish",
        // },
      ],
    };
  },
  components: {},
  mounted() {
    this.fetchOrderList();
  },
  methods: {
    async fetchOrderList() {
      try {
        const response = await apiOrders.getOrdersAll()
        console.log(response.data)
        this.orderList = response.data;
      } catch (error) {
        console.log(error);
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