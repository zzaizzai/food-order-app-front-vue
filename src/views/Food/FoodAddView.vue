<template>
    <b-container>
        <b-row>
            <div>Food Add View</div>
        </b-row>
        <b-row class="justify-content-center"><b-col sm="3"><b-form-input placeholder="Food Name" type="text"
                    v-model="foodname" /></b-col></b-row>
        <b-row class="justify-content-center"><b-col sm="3"><b-form-input placeholder="Store Name" type="text"
                    v-model="store" /></b-col></b-row>
        <b-row class="justify-content-center"><b-col sm="3"><b-form-input placeholder="Price" type="number"
                    v-model="price" /></b-col></b-row>
        <b-row class="justify-content-center"><b-col sm="3"><b-form-input placeholder="Category" type="text"
                    v-model="category" /></b-col></b-row>
        <b-row class="justify-content-center"><b-col><b-button class="button-color-transition" :variant="buttonVariant"
                    @click="addFodd">{{ buttonText }}</b-button></b-col></b-row>
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
            isAdding: false,
            msg: "",
            store: "",
            foodname: "",
            category: "",
            price: 0,
        };
    },
    methods: {
        resetAllInput(): void {
            this.foodname = ""
            this.store = ""
            this.category = ""
            this.price = 0
        },

        async addFodd(): Promise<void> {
            // reset message
            this.msg = "";
            this.isAdding = false;

            // check
            if (this.store === "" || this.foodname === "" || this.category === "") {
                this.msg = "input error";
                return;
            }

            const newFood: FoodCreateDto = {
                name: this.foodname,
                store: this.store,
                category: this.category,
                price: this.price,
                description: "",
            };
            this.isAdding = true;

            try {
                const result = await foodApi.addFood(newFood);
                console.log(result);

            } catch (error) {
                console.log("Error", error);
            }

            // Effect
            setTimeout(() => {
                this.isAdding = false;
                this.msg = "Added a new Food successfully.";
                this.resetAllInput()
            }, 2000);
        },
    },
    computed: {
        buttonVariant(): string {
            return this.isAdding ? "warning" : "success";
        },
        buttonText(): string {
            return this.isAdding ? "Adding" : "Add";
        },
    },
});
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* hide spin button */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.button-color-transition {
    transition: background-color 0.5s;
}

.msgCard {
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
