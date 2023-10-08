import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Address, TUser, TUserLogin, TUserRegister } from './types/users'
import { CartItem, TProduct } from './types/products';
import { baseUrl } from '../config/config';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            headers.set('authorization', 'Bearer ' + localStorage.getItem('token'))
        }
    }),
    tagTypes: ['User', 'Order', 'CartItems', 'WishlistItems'],
    endpoints: (builder) => ({
        getUser: builder.query<TUser, void>({
            query: () => (`/users/profile`),
            providesTags: ['User']
        }),
        getWishlistItems: builder.query<TProduct[], void>({
            query: () => (`/products/wishlist-items`),
            providesTags: ['WishlistItems']
        }),
        getCartItems: builder.query<CartItem[], void>({
            query: () => {
                return `/products/cart-items`;
            },
            providesTags: ['CartItems']
        }),
        loginUser: builder.mutation<{ token: string }, TUserLogin>({
            query: (data) => ({
                url: `/auth/login`,
                method: 'POST',
                body: data
            }),
        }),
        registerUser: builder.mutation<{ token: string }, TUserRegister>({
            query: (data) => ({
                url: `/auth/signup`,
                method: 'POST',
                body: { ...data, wishlist: [], cart: [] },
            })
        }),
        updateCart: builder.mutation<{}, (CartItem | { product: any; quantity: number; })[]>({
            query: (data) => ({
                url: `/users/update`,
                method: 'PUT',
                body: { cart: data },
            }),
            invalidatesTags: ['CartItems', 'User']
        }),
        updateCartItem: builder.mutation<{}, CartItem>({
            query: (data) => ({
                url: `/users/update-cart-item`,
                method: 'PUT',
                body: { itemId: data._id, quantity: data.quantity },
            }),
            invalidatesTags: ['CartItems', 'User']
        }),
        updateWishlist: builder.mutation<null, string[]>({
            query: (data) => ({
                url: `/users/update`,
                method: 'PUT',
                body: { wishlist: data },
            }),
            invalidatesTags: ['User', 'WishlistItems']
        }),
        addAddress: builder.mutation<null, Address>({
            query: (data) => ({
                url: `/users/add-address`,
                method: 'PUT',
                body: { address: data },
            }),
            invalidatesTags: ['User']
        })
    }),
})

// Export hooks for usage in functional components, which are
export const {
    useGetUserQuery,
    useGetWishlistItemsQuery,
    useGetCartItemsQuery,
    useUpdateCartItemMutation,
    useLoginUserMutation,
    useRegisterUserMutation,
    useUpdateCartMutation,
    useUpdateWishlistMutation,
    useAddAddressMutation
} = userApi