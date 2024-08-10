import { AxiosResponse } from 'axios'
import http from './http'
import { FoodCreateDto } from "@/interfaces/Food"

export async function getFoods(take: number, lastId: number): Promise<AxiosResponse<any, any>> {
    return http.get(`/foods/getSome?take=${take}&lastId=${lastId}`)
}

export async function getOneFood(foodId: number): Promise<AxiosResponse<any, any>> {
    return http.get(`/foods/getone/${foodId}`)    
}

export async function addFood(foodCreateDto: FoodCreateDto): Promise<AxiosResponse<any, any>> {
    return http.post(`/foods/add`, foodCreateDto)
}