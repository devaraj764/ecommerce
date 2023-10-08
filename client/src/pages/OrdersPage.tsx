import React from 'react'
import { useGetOrdersQuery } from '../services/orders'
import { Card, CardBody, Divider, Grid, GridItem, HStack, Text } from '@chakra-ui/react';
import { TOrder } from '../services/types/orders';
import formatTimestamp from '../helpers/getDates';
// import CustomPopover from '../components/common/CustomPopover';
// import { AiFillInfoCircle } from 'react-icons/ai';
// import { BiSolidMap } from 'react-icons/bi'


const OrdersPage: React.FC = () => {
  const { data: orders, isLoading, error, isSuccess } = useGetOrdersQuery();
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading data</p>}
      {(isSuccess && orders && orders.length > 0) &&
        <Grid
          templateColumns={'repeat(auto-fill, minmax(370px,auto))'}
          gap='2em'
          w='100%'
        >
          {orders.map((order: TOrder, index: number) => (
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
                    <Text color='gray.600' fontSize='18px' fontWeight='700'>₹ {order.totalAmount}</Text>
                  </HStack>
                  <HStack>
                    <Text fontSize='14px'>No.of Items</Text>:
                    <Text color='gray.600' fontSize='18px' fontWeight='700'>{order.items.length}</Text>
                  </HStack>
                  <HStack>
                    <Text fontSize='14px'>Status</Text>:
                    <Text color='gray.600' fontSize='18px' fontWeight='700'>{order.status}</Text>
                  </HStack>
                </CardBody>
              </Card>
            </GridItem>
          ))}
        </Grid>
      }
    </>
  )
}

export default OrdersPage