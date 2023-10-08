import React, { useEffect, useState } from 'react'
import { CartItem } from '../services/types/products';
import { useGetCartItemsQuery } from '../services/users';
import { Box, Button, HStack, Heading, useToast } from '@chakra-ui/react';
import CartItemsGrid from '../components/grids/CartItemsGrid';
import AnimatedDiv from '../components/common/AnimatedDiv';
import Addresses from '../components/Addresses';
import { FaRegMoneyBill1 } from 'react-icons/fa6'
import { AiOutlineClose } from 'react-icons/ai';
import { useCreateOrderMutation } from '../services/orders';
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [createOrder] = useCreateOrderMutation()
  const { data, error, isLoading, isSuccess } = useGetCartItemsQuery();
  const [address, setAddress] = useState<string>('')
  const [totalAmount, setTotalAmount] = useState(0)
  const [checkout, setCheckout] = useState(false);
  const toast = useToast();
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      setCartItems(data);
      const total = data.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      setTotalAmount(total)
      if (total == 0) setCheckout(false);
    }
  }, [data]);

  const handlePay = () => {
    const data = {
      items: cartItems,
      address,
      totalAmount
    }
    createOrder(data)
      .unwrap()
      .then(() => {
        toast({
          title: 'Added address successfully!',
          status: 'success',
          duration: 3000
        })
      })
      .catch((err) => {
        toast({
          title: err.message || 'Error adding address',
          status: 'error',
          duration: 3000
        })
      }).finally(() => {
        navigate('/orders')
      })
  }

  return (
    <Box mb='10'>
      <HStack justifyContent='space-between' mb='5' >
        <Heading fontSize="2em" fontFamily={'Nunito'}>{checkout ? 'Checkout' : "Cart Items"}</Heading>
        {
          !checkout && totalAmount > 0 &&
          <Button
            fontSize={'16px'}
            colorScheme='messenger' onClick={() => setCheckout(!checkout)}>
            ₹ {totalAmount}/- CheckOut
          </Button>
        }
      </HStack>
      <CartItemsGrid data={cartItems} error={error} isLoading={isLoading} isSuccess={isSuccess} />
      <AnimatedDiv toogle={checkout}>
        <Addresses address={address} setAddress={setAddress} />
        <HStack justifyContent={'flex-end'} mt='2'>
          <Button onClick={() => setCheckout(false)} borderRadius={'0'} leftIcon={<AiOutlineClose />} fontSize={'1.3em'}> Cancel</Button>
          <Button onClick={handlePay} isDisabled={address === ''} borderRadius={'0'} leftIcon={<FaRegMoneyBill1 />} colorScheme='green' fontSize={'1.3em'}>Pay {totalAmount}/-</Button>
        </HStack>
      </AnimatedDiv>
    </Box>
  )
}

export default CartPage