import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TOrder, TOrderCreate } from './types/orders';
import { baseUrl } from '../config/config';

export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            headers.set('authorization', 'Bearer ' + localStorage.getItem('token'))
        }
    }),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        getOrders: builder.query<TOrder[], void>({
            query: () => (`/orders`),
            providesTags: ['Order']
        }),
        createOrder: builder.mutation<{}, TOrderCreate>({
            query: (data) => ({
                url: `/orders/create-order`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Order']
        }),
    }),
});

// Export hooks for usage in functional components, which are
export const { useGetOrdersQuery, useCreateOrderMutation } = ordersApi