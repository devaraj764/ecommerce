import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './services/users'
import { productsApi } from './services/products';
import { ordersApi } from './services/orders';


export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(productsApi.middleware).concat(ordersApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch