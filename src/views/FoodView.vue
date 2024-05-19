<template>
  <div class="home">
    <FoodCard></FoodCard>
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>Its food view</div>
    {{ price }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FoodCard from "@/components/FoodCard.vue"; // @ is an alias to /src

export default defineComponent({
  name: "FoodView",
  data() {
    return {
      price: 90,
    };
  },
  components: { FoodCard },
});
</script>
