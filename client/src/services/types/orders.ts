import { CartItem } from "./products"
import { Address } from "./users"

export interface TOrder{
    _id?: string
    items: CartItem[]
    totalAmount: number
    address: Address
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