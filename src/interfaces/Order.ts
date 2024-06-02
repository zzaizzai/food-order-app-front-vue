import Food from "./Food"

export interface Order {
    id: number
    food: Food
    status: string
    quantity: number
    totalPrice: number
    createdAt: Date
}

export interface OrderTable {
    id: number
    foodName: string
    status: string
    quantity: number
    totalPrice: number
    createdAt: string
}

export interface OrderCreateDto {
    foodId: number
    userId: number
    quantity: number
    totalPrice: number
}