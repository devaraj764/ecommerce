import { CartItem } from "./products"

export interface TOrder{
    _id?: string
    items: CartItem[]
    totalAmount: number
    address: string
    status: string
    isPaid: boolean
    createdAt: number
    updatedAt: number
}

export interface TOrderCreate{
    items: CartItem[]
    totalAmount: number
    address: string
    isPaid?: boolean
}