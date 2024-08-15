import { Food } from "./Food"

interface OrderBase {
    id: number
    status: string
    quantity: number
    totalPrice: number
}

export interface Order extends OrderBase {
    food: Food
    createdAt: Date
}

export interface OrderTable extends OrderBase {
    foodName: string
    createdAt: string
}

export interface OrderCreateDto {
    foodId: number
    // userId: number
    quantity: number
    totalPrice: number
}