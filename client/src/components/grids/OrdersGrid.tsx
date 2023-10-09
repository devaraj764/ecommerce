import React from 'react'
import { Card, CardBody, Divider, Grid, GridItem, HStack, Text, useToast } from '@chakra-ui/react';
import { TOrder } from '../../services/types/orders';
import formatTimestamp from '../../helpers/getDates';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'
import OrderDetailsBtn from '../actionBtns/OrderDetailsBtn';
import NotItemsFound from '../common/NotItemsFound';
import formatCurrency from '../../helpers/formatCurrency';

type Props = {
    data: TOrder[]
    isLoading: boolean
    isSuccess: boolean
    error: FetchBaseQueryError | SerializedError | undefined
}

const OrdersGrid: React.FC<Props> = ({ data, isLoading, isSuccess, error }: Props) => {
    const toast = useToast();
    React.useEffect(() => {
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
            {error && <p>Error loading data</p>}
            {(isSuccess && data && data.length > 0) ?
                <Grid
                    templateColumns={'repeat(auto-fill, minmax(370px,auto))'}
                    gap='2em'
                    w='100%'
                >
                    {data.map((order: TOrder, index: number) => (
                        <GridItem key={index.toString()}>
                            <Card>
                                <CardBody p='10px'>
                                    <HStack justifyContent={'space-between'}>
                                        <Text color='#0078ff' fontSize='14px' fontWeight='700'>OID: #{order._id || ''}</Text>
                                        <Text fontSize='14px' color='gray.400'>{formatTimestamp(order.createdAt)}</Text>
                                    </HStack>
                                    <Divider my='2' />
                                    <HStack>
                                        <Text fontSize='14px'>Total amount: </Text>:
                                        <Text color='gray.600' fontSize='18px' fontWeight='700'>{formatCurrency(order.totalAmount)}</Text>
                                    </HStack>
                                    <HStack>
                                        <Text fontSize='14px'>No.of Items</Text>:
                                        <Text color='gray.600' fontSize='18px' fontWeight='700'>{order.items.length}</Text>
                                    </HStack>
                                    <HStack>
                                        <Text fontSize='14px'>Status</Text>:
                                        <Text color='gray.600' fontSize='18px' fontWeight='700'>{order.status}</Text>
                                    </HStack>
                                    <Divider my='2' />
                                    <HStack justifyContent={'flex-end'}>
                                        <OrderDetailsBtn order={order} />
                                    </HStack>
                                </CardBody>
                            </Card>
                        </GridItem>
                    ))}
                </Grid>
                : !isLoading && <NotItemsFound message='😢 No orders' />
            }
        </>
    )
}

export default OrdersGrid