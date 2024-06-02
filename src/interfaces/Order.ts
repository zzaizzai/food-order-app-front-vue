import Food from "./Food"

export interface Order {
    id: number
    food: Food
    status: string
    quantity: number
    totalPrice: number
}

export interface OrderTable {
    id: number
    foodName: string
    status: string
    quantity: number
    totalPrice: number
}