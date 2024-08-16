<template>
    <div>
        <h2><strong>History View</strong></h2>
    </div>
    <div class="container order-list-layout mx-auto">
        <b-table striped hover :items="formattedOrderList" :fields="fields">
            ddaaa
        </b-table>
        <div v-for="(order, index) in orderList" cols="12" md="6" :key="index"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as apiOrders from "@/api/orders";
import { Order, OrderTable } from "@/interfaces/Order";
import { formatDisplayDate } from "@/utils/formatDate";
export default defineComponent({
    name: "FoodView",
    data() {
        return {
            fields: [
                { key: "id", label: "Order ID" },
                { key: "foodName", label: "Food Name" },
                { key: "status", label: "Status" },
                { key: "quantity", label: "Quantity" },
                { key: "totalPrice", label: "Total Price ($)" },
                { key: "createdAt", label: "createdAt" },
            ],
            formattedOrderList: [] as OrderTable[],
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
                const response = await apiOrders.getOrdersAll();
                console.log(response.data);
                this.orderList = response.data;

                const orders = response.data;
                orders.forEach((order: Order) => {
                    this.formattedOrderList.push({
                        id: order.id,
                        foodName: order.food?.name || "food name",
                        status: order.status || "status",
                        quantity: order.quantity || 0,
                        totalPrice: order.totalPrice || 0,
                        createdAt: formatDisplayDate(order.createdAt) || "no date",
                    });
                });
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