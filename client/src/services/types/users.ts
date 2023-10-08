import { CartItem } from "./products"

export interface TUser {
    _id: string
    fullname: string
    email: string
    image: string
    wishlist: string[]
    cart: CartItem[]
    addresses: Address[]
}

export interface Address {
    _id?: string
    address1: string
    address2?: string
    pincode: number
    name: string
    mobile: string
}

export interface TUserLogin {
    email: string
    password: string
}

export interface TUserRegister {
    fullname: string
    email: string
    password: string
    confirmPassword?: string
}

export interface TAddToCart {
    productId: string
    userId: string
}