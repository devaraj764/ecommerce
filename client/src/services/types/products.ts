export interface TProduct {
    _id: string
    name: string
    brand: string
    gender: string
    category: string
    price: number,
    is_in_inventory: boolean,
    items_left: number,
    imageURL: string,
    slug: string,
    rating: number
}

export interface TProductResponse {
    products: TProduct[]
    currentPage: number
    totalPages: number
}

export interface CartItem {
    product: TProduct,
    quantity: number,
    _id: string
}