<template>
    <div>
        <h2><strong>Its food view</strong></h2>
        <b-button href="/foodadd">Add Food</b-button>
    </div>
    <div class="food-list-layout mx-auto">
        <b-row class="">
            <b-col v-for="food in foodList" cols="12" md="6" :key="food.id">
                <FoodCard :food="food" class="mx-1 my-1"></FoodCard>
            </b-col>
        </b-row>
    </div>

    <b-button @click="updateFoods">get more</b-button>
    {{ foodOldestId }}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FoodCard from "@/components/FoodCard.vue"; // @ is an alias to /src
import * as apiFoods from "@/api/foods";
import { Food } from "@/interfaces/Food";

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
            ] as Food[],
        };
    },
    components: { FoodCard },
    mounted() {
        this.fetchFoodList();
    },
    methods: {
        async fetchFoodList() {
            try {
                const response = await apiFoods.getFoods(6, this.foodOldestId);
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
                this.foodOldestId = minValueId;
            } catch (error) {
                console.log(error);
            }
        },

        async updateFoods() {
            // no more data
            if (this.foodOldestId < 0) {
                return;
            }

            try {
                const response = await apiFoods.getFoods(6, this.foodOldestId);
                const foods: Food[] = response.data;

                this.foodList = [...this.foodList, ...foods];

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
                this.foodOldestId = minValueId;
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