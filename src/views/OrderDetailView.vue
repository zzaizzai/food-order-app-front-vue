<template>
    <div>

        Detail

        {{orderData.id}}
        {{orderData.status}}
        {{orderData.totalPrice}}

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import { Message } from "@/interfaces/Message";
import { Order } from "@/interfaces/Order";
import * as apiOrder from "@/api/orders"
import { AxiosResponse } from "axios";
import { LocationQueryValue, useRoute } from "vue-router";
export default defineComponent({
    name: "OrderDetailView",
    data(): any {
        return {
            orderData: {
            } as Order
        };
    },
    components: {},
    mounted() {
        this.getOrderData()
    },

    methods: {
        showMessage({ type, msg }: Message): void {
            store.dispatch("addMsg", { msg, type })
        },
        
        async getOrderData(): Promise<void> {
            const route = useRoute();
            const orderIdValue: LocationQueryValue |  LocationQueryValue[] = route.query.id

            let orderId : string | null = null;
            if  (Array.isArray(orderIdValue)) {
                orderId = orderIdValue[0]
            } else {
                orderId = orderIdValue
            }

            const order: AxiosResponse<Order, any> = await apiOrder.getOrderOne(1)
            this.orderData = order.data
        } 
    },
});
</script>


<style scoped>
.order-list-layout {
    justify-content: center;
    width: 900px;
}
</style>