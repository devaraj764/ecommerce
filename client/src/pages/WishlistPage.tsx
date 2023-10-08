import React, { useEffect, useState } from 'react'
import { TProduct } from '../services/types/products';
import ProductsGrid from '../components/grids/ProductsGrid';
import { useGetWishlistItemsQuery } from '../services/users';
import { Box, Heading } from '@chakra-ui/react';
import NotItemsFound from '../components/common/NotItemsFound';


const WishlistPage: React.FC = () => {
    const [products, setProducts] = useState<TProduct[]>([])
    const { data, error, isLoading, isSuccess } = useGetWishlistItemsQuery();
    useEffect(() => {
        if (data)
            setProducts(data);
    }, [data])
    return (
        <Box>
            <Heading fontSize="2em" fontFamily={'Nunito'} mb='5'>Your wishlist</Heading>
            {
                error || products.length > 0 ?
                    <ProductsGrid data={products} error={error} isLoading={isLoading} isSuccess={isSuccess} />
                    :
                    <NotItemsFound message='Your wishlist is empty 😢' />
            }
        </Box>
    )
}

export default WishlistPage