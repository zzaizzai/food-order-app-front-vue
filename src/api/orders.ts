import { AxiosResponse } from 'axios'
import http from './http'


export async function getOrdersAll(): Promise<AxiosResponse<any, any>> {
    return http.get('/orders/all')
}