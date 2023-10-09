import React from 'react'
import { useGetOrdersQuery } from '../services/orders'
import OrdersGrid from '../components/grids/OrdersGrid';
import { Heading } from '@chakra-ui/react';
// import CustomPopover from '../components/common/CustomPopover';
// import { AiFillInfoCircle } from 'react-icons/ai';
// import { BiSolidMap } from 'react-icons/bi'


const OrdersPage: React.FC = () => {
  const { data: orders, isLoading, error, isSuccess } = useGetOrdersQuery();
  return (
    <>
      <Heading fontSize="2em" fontFamily={'Nunito'} mb='3'>Your Orders</Heading>
      <OrdersGrid data={orders || []} error={error} isLoading={isLoading} isSuccess={isSuccess} />
    </>
  )
}

export default OrdersPage