import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TProductResponse } from './types/products'
import { baseUrl } from '../config/config';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        getPorducts: builder.query<TProductResponse, number>({
            query: (pageNo = 1) => `/products?_page=${pageNo}&_limit=15`,
            providesTags: ['Products']
        }),
    }),
});

// Export hooks for usage in functional components, which are
export const { useGetPorductsQuery } = productsApi