import { AxiosResponse } from 'axios'
import http from './http'
import { OrderCreateDto } from '@/interfaces/Order'


export async function getOrdersAll(): Promise<AxiosResponse<any, any>> {
    return http.get('/orders/all')
}

export async function addOne(orderCreateDto: OrderCreateDto): Promise<AxiosResponse<any, any>> {
    return http.post('/orders/addOne', orderCreateDto
    )

}