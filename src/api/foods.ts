import { AxiosResponse } from 'axios'
import http from './http'
import { Food, FoodCreateDto } from "@/interfaces/Food"

export async function getFoods(take: number, lastId: number): Promise<AxiosResponse<any, any>> {
    return http.get(`/foods/getSome?take=${take}&lastId=${lastId}`)
}

export async function getOneFood(foodId: number): Promise<AxiosResponse<any, any>> {
    return http.get(`/foods/getone/${foodId}`)    
}

export async function addFood(foodCreateDto: FoodCreateDto): Promise<AxiosResponse<any, any>> {
    return http.post(`/foods/add`, foodCreateDto)
}

export async function updateOneFood(food: Food) {
    return http.patch(`/foods/${food.id}`, food)
}

export async function deleteOneFood(food: Food) {
    return http.delete(`/foods/${food.id}`)
    
}