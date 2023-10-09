import { Grid, GridItem, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'
import { CartItem } from '../../services/types/products'
import NotItemsFound from '../common/NotItemsFound'
import CartItemsCard from '../cards/CartItemCard'

type Props = {
    data: CartItem[]
    isLoading: boolean
    isSuccess: boolean
    error: FetchBaseQueryError | SerializedError | undefined
}

const CartItemsGrid: React.FC<Props> = ({ data, isLoading, isSuccess, error }: Props) => {
    const toast = useToast();
    useEffect(() => {
        if (error) {
            toast({
                // @ts-ignore 
                title: error.data?.message,
                duration: 2000,
                status: 'warning',
            });
        }
    }, [error]);
    
    return (
        <>
            {isLoading && <p>Loading...</p>}
            {(isSuccess && data && data.length > 0) ?
                <Grid
                    templateColumns={'repeat(auto-fill, minmax(370px,auto))'}
                    gap='2em'
                    w='100%'
                >
                    {data?.map((item, index) => {
                        return (
                            <GridItem key={index.toString()} minW='370px'>
                                <CartItemsCard {...item} />
                            </GridItem>
                        )
                    })}
                </Grid>
                : !isLoading && <NotItemsFound message='😢 No items in cart' />
            }
        </>
    )
}

export default CartItemsGrid