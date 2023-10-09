import React from 'react'
import { TOrder } from '../../services/types/orders'
import { Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Text, Divider, Box, HStack, Tag } from '@chakra-ui/react';
import { useGetUserQuery } from '../../services/users';
import { Address } from '../../services/types/users';
import formatTimestamp from '../../helpers/getDates';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import formatCurrency from '../../helpers/formatCurrency';

type Props = {
  order: TOrder
}

const OrderDetailsBtn: React.FC<Props> = ({ order }: Props) => {
  const { data: userData } = useGetUserQuery();
  const [address, setAddress] = React.useState<Address>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const itemsCount = order.items.reduce((acc, item) => acc += item.quantity, 0)

  React.useEffect(() => {
    if (userData) {
      const filtered = userData?.addresses.filter(address => address._id === order.address)
      setAddress(filtered[0]);
    }
  }, [userData])

  return (
    <>
      <Button colorScheme='twitter' size={'sm'} leftIcon={<AiOutlineInfoCircle size='16px' />} onClick={onOpen}>Details</Button>
      <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
        <ModalOverlay />
        <ModalContent py='10px'>
          <ModalCloseButton />
          <ModalBody >
            <Text fontSize={'20px'} fontWeight="bold" >OID: #{order._id}</Text>
            <Text fontSize={'14px'} mb='2'>Placed on : {formatTimestamp(order.createdAt)}</Text>
            <Divider my='2' />
            <Text fontSize={'16px'} fontWeight="bold" mb='2'>Order Items List : {itemsCount}</Text>
            {
              order.items.map((item) => (
                <HStack key={item._id} justifyContent={'space-between'} py='2' borderBottom={'1px solid #eee'}>
                  <Text fontSize={'16px'} color='gray'>{item.product.name}<br /><b>{item.product.brand}</b></Text>
                  <Text fontSize={'16px'} color='gray' fontWeight="bold">{item.quantity}X  {formatCurrency(item.product.price)}</Text>
                </HStack>
              ))
            }
            <Box border={'1px solid #eee'} borderRadius={'5px'} mt='4' p='5px'>
              <Text fontSize={'16px'} fontWeight="bold" >Deliver To:</Text>
              <Text>Name: {address?.name}</Text>
              <Text>Address: {address?.address1} {address?.address2}</Text>
              <Text>Mobile: {address?.mobile}</Text>
            </Box>
            <HStack gap='1em' mt='3'>
              <HStack>
                <Text fontSize='14px'>Total amount: </Text>:
                <Text color='gray.600' fontSize='18px' fontWeight='700'>{formatCurrency(order.totalAmount)}</Text>
              </HStack>
              <HStack>
                <Text fontSize='14px'>Status</Text>:
                <Tag color='gray.600' fontSize='14px' fontWeight='700' textTransform={'uppercase'}>{order.status}</Tag>
              </HStack>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default OrderDetailsBtn