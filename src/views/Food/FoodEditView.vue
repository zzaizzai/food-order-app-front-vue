<template>
	<b-container>
		<b-row>
			<div>
				<h3>Food Edit View</h3>
			</div>
		</b-row>

		<b-row class="justify-content-center">
			<b-col sm="2"><label><strong>name</strong></label></b-col>
			<b-col sm="5"><b-form-input placeholder="Food Name" type="text" v-model="foodData.name" /></b-col>
		</b-row>

		<b-row class="justify-content-center">
			<b-col sm="2"><label><strong>store</strong></label></b-col><b-col sm="5"><b-form-input
					placeholder="Store Name" type="text" v-model="foodData.store" /></b-col>
		</b-row>

		<b-row class="justify-content-center">
			<b-col sm="2"><label><strong>price</strong></label></b-col>
			<b-col sm="5"><b-form-input placeholder="Price" type="number" v-model="foodData.price" /></b-col></b-row>

		<b-row class="justify-content-center">
			<b-col sm="2"><label><strong>category</strong></label></b-col>
			<b-col sm="5"><b-form-input placeholder="Category" type="text"
					v-model="foodData.category" /></b-col></b-row>

		<b-row class="justify-content-center">
			<b-col sm="2"><label><strong>description</strong></label></b-col>
			<b-col sm="5"><b-form-textarea placeholder="Description" type="text"
					v-model="foodData.description" /></b-col></b-row>

		<br>
		<br>

		<!-- Edit Button -->
		<b-row class="justify-content-center">
			<b-col sm="2">

				<!-- Loading -->
				<b-button v-if="isAdding" variant="success" @click="updateFood" disabled>
					<b-spinner small></b-spinner>
					<span>Edit</span>
				</b-button>

				<!-- Default Button -->
				<b-button v-else variant="success" @click="updateFood">Edit</b-button>

			</b-col>

			<b-col sm="4">

				<!-- Default Button -->
				<b-button variant="danger" @click="deleteFood">
					<span>Delete</span>
				</b-button>

			</b-col>

		</b-row>

		<!-- Delete Button -->
		<b-row class="justify-content-center">

		</b-row>

	</b-container>
	<strong><span :class="msgVariant">{{ msg }}</span></strong>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import * as foodApi from "@/api/foods";
import { Food, FoodCreateDto } from "@/interfaces/Food";

export default defineComponent({
	name: "FoodAddView",
	data() {
		return {
			isAdding: false,
			msg: "",
			isMsgError: false,
			foodId: "",
			foodData: {} as Food,
		};
	},
	async created() {
		this.foodId = String(this.$route.query.foodId);
		try {
			const result = await this.getFoodInformation(Number(this.foodId));
			const data = result.data;
			this.foodData = {
				category: data.category,
				id: data.id,
				name: data.name,
				price: data.price,
				store: data.store,
				description: data.description,
				createdAt: data.createdAt,
			};
		} catch (error) {
			console.log(error);
			this.onErrorMode()
			this.msg = "Failed to get Food Information";
		}
	},
	methods: {
		deleteFood(): void {
			console.log("")
			if (confirm("Do you want to delete this food") == true) {
				this.msg = "ok"
			} else {
				return;
			}
		},
		onErrorMode(): void {
			this.isMsgError = true
		},
		offtErrorMode(): void {
			this.isMsgError = false
		},
		getFoodInformation(foodId: number) {
			const food = foodApi.getOneFood(foodId);
			return food;
		},
		resetAllInput(): void {
			this.foodData.name = "";
			this.foodData.store = "";
			this.foodData.category = "";
			this.foodData.price = 0;
		},

		async updateFood(): Promise<void> {
			// reset message
			this.msg = "";
			this.isAdding = false;

			// check
			if (this.foodData.store === "" || this.foodData.name === "" || this.foodData.category === "") {
				this.msg = "input error";
				return;
			}

			const newFood: Food = {
				id: this.foodData.id,
				name: this.foodData.name,
				store: this.foodData.store,
				category: this.foodData.category,
				price: this.foodData.price,
				createdAt: this.foodData.createdAt,
				description: this.foodData.description
			};
			this.isAdding = true;

			try {
				const result = await foodApi.updateOneFood(newFood);
				console.log(result);

			} catch (error) {
				console.log("Error", error);
			}

			// Effect
			setTimeout(() => {
				this.isAdding = false;
				this.msg = "Added a new Food successfully.";
				// this.resetAllInput();
				this.offtErrorMode();
			}, 2000);
		},
	},
	computed: {
		msgVariant(): string {
			return this.isMsgError ? "msg-error" : "";
		},
		// buttonVariant(): string {
		// 	return this.isAdding ? "warning" : "success";
		// },
		// buttonText(): string {
		// 	return this.isAdding ? "Editing" : "Edit";
		// },
	},
});
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.msg-error {
	color: red;
}
</style>
