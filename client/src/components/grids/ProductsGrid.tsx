import { Button, Grid, GridItem, HStack, useToast } from '@chakra-ui/react'
import React from 'react'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'
import { TProduct } from '../../services/types/products'
import AddToCartBtn from '../actionBtns/AddToCartBtn'
import ProductCard from '../cards/ProductCard'

type Props = {
    data: TProduct[] | undefined
    isLoading: boolean
    isSuccess: boolean
    error: FetchBaseQueryError | SerializedError | undefined
}

const ProductsGrid: React.FC<Props> = ({ data, isLoading, isSuccess, error }: Props) => {
    const toast = useToast();
    React.useEffect(() => {
        if (error) {
            toast({
                // @ts-ignore
                title: error.data?.message || "Internal Server Error",
                duration: 2000,
                status: 'warning',
            });
        }
    }, [error]);
    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading data</p>}
            {(isSuccess && data && data.length > 0) &&
                <Grid
                    templateColumns={'repeat(auto-fill, minmax(370px,auto))'}
                    gap='2em'
                    w='100%'
                >
                    {data?.map((product, index) => {
                        return (
                            <GridItem key={index.toString()} minW='370px' minH='370px'>
                                <ProductCard product={product}>
                                    <HStack mt={5}>
                                        {
                                            product.is_in_inventory ?
                                                <AddToCartBtn
                                                    productId={product._id}
                                                    variant={'solid'} colorScheme='messenger' w='full'
                                                    fontSize={'14px'}
                                                >
                                                    ADD TO CART
                                                </AddToCartBtn>
                                                :
                                                <Button isDisabled={true} w='full'
                                                    fontSize={'14px'}
                                                >
                                                    OUT OF STOCK
                                                </Button>
                                        }
                                    </HStack>
                                </ProductCard>
                            </GridItem>
                        )
                    })}
                </Grid>
            }
        </>
    )
}

export default ProductsGrid