<template>
  <div>
    <h2><strong>Its food view</strong></h2>
  </div>
  <div class="food-list-layout mx-auto">
    <b-row class="">
      <b-col v-for="(food, index) in foodList" cols="12" md="6" :key="index">
        <FoodCard msg="good" :food="food" class="mx-1 my-1"></FoodCard>
      </b-col>
    </b-row>
  </div>

  <button>get more</button>
  {{foodOldestId}}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import FoodCard from "@/components/FoodCard.vue"; // @ is an alias to /src


export default defineComponent({
  name: "FoodView",
  data() {
    return {
      foodOldestId: -1,
      foodList: [
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
  components: { FoodCard },
  mounted() {
    this.fetchFoodList();
  },
  methods: {
    async fetchFoodList() {
      try {
        const response = await axios.get(
          "http://localhost:3000/foods/getNew?take=6"
        );
        console.log(response);
        const foods = response.data;
        this.foodList = foods;

        let minValueId = -1;
        for (let food of foods) {
          if (minValueId < 0) {
            minValueId = food.id;
            continue;
          }
          if (minValueId < food.id) {
            continue;
          }
          minValueId = food.id;
        }
        this.foodOldestId = minValueId

      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>


<style scoped>
.food-list-layout {
  justify-content: center;
  width: 700px;
}

@media (max-width: 800px) {
  .food-list-layout {
    width: 350px;
  }
}
</style>