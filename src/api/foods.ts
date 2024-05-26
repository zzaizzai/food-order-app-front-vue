import { AxiosResponse } from 'axios'
import http from './http'

export async function getFoods(take: number, lastId: number): Promise<AxiosResponse<any, any>> {
    return http.get(`/foods/getSome?take=${take}&lastId=${lastId}`)


}