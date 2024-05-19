<template>
  <div class="foodcard">
    <b-row>
      <b-col cols="10"
        ><h4>
          <strong>{{ food.name }}</strong>
        </h4></b-col
      >
      <b-col cols="2"><b-button pill>X</b-button> </b-col>
    </b-row>
    <b-row>
      {{ food.description }}
      Content Content ContentContent ContentContentContent Content Content
      Content</b-row
    >
    <b-row>
      <b-col cols="4">Qty.</b-col>
      <b-col cols="2"
        ><input style="width: 48px" type="number" v-model="qty"
      /></b-col>
      <b-col cols="1"
        ><b-button variant="warning" @click="decrementQty">-</b-button></b-col
      >
      <b-col cols="1"
        ><b-button variant="warning" @click="incrementQty">+</b-button></b-col
      >
      <b-col cols="4"
        ><b-button
          :variant="buttonVariant"
          class="button-color-transition"
          @click="orderFood"
          >Order</b-button
        ></b-col
      >
    </b-row>
    <b-row
      ><span>store:{{ food.store }}</span></b-row
    >
    <b-row>
      <strong
        >Total Price: <sapn>{{ totalPrice }}</sapn>
        <span> ({{ food.price }})</span></strong
      ></b-row
    >

    <span><strong class="msgCard">{{ msgCard }}</strong></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Food {
  id: number;
  name: string;
  price: number;
  description: string;
  store: string;
}

export default defineComponent({
  name: "FoodCard",
  props: {
    msg: String,
    food: {
      type: Object as () => Food,
      required: true,
    },
  },
  data() {
    return {
      msgCard: "",
      qty: 1,
      orderStateIng: false,
    };
  },
  methods: {
    incrementQty(): void {
      this.qty++;
    },
    decrementQty(): void {
      if (this.qty > 1) {
        this.qty--;
      }
    },
    orderFood(): void {
      this.msgCard = "";

      if (this.qty < 1) {
        this.msgCard = "Error !!!";
        return;
      }

      this.orderStateIng = true;

      setTimeout(() => {
        this.qty = 1;
        this.orderStateIng = false;
      }, 1000);
    },
  },
  computed: {
    buttonVariant(): string {
      return this.orderStateIng ? "warning" : "success";
    },
    totalPrice(): number {
      return this.food.price * this.qty;
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button-color-transition {
  transition: background-color 0.5s;
}

.msgCard{
    color: red;
}

.foodcard {
  padding: 5px;
  background: #eee;
  border-radius: 16px;
  height: 200px;
  width: 350px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
