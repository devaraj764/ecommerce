import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TProductResponse } from './types/products'
import { baseUrl } from '../config/config';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        getPorducts: builder.query<TProductResponse, { pageNo: number, query?: string, limit?: number, search?: string}>({
            query: (data) => `/products?${data?.query}_page=${data.pageNo || 1}&_limit=${data.limit || 15}&search=${data.search}`,
            providesTags: ['Products']
        }),
    }),
});

// Export hooks for usage in functional components, which are
export const { useGetPorductsQuery } = productsApi