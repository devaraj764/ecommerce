import {  Box, HStack, Link, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineHeart, AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai'
import { Link as RLink } from 'react-router-dom'
import { BsBoxSeam } from 'react-icons/bs'
import { useGetUserQuery } from '../services/users'

const BottomNavbar: React.FC = () => {
    const { data } = useGetUserQuery();
    return (
        <Box
            px={4}
            py={'10px'}
            borderBottom={'1px solid'}
            bg='#fff'
            position={'fixed'}
            bottom={'0'}
            right={'0'}
            left={'0'}
            zIndex={999}
            className='bottom-nav-bar'
        >
            <HStack justifyContent={'space-between'}>
                <Link as={RLink} to='/' color='gray.600'>
                    <VStack gap={'2px'}>
                        <AiOutlineHome size='24px' />
                        <Text fontSize={'14px'}>Home</Text>
                    </VStack>
                </Link>
                <Link as={RLink} to='/orders' color='gray.600'>
                    <VStack gap={'2px'}>
                        <BsBoxSeam size='20px' />
                        <Text fontSize={'14px'}>Orders</Text>
                    </VStack>
                </Link>
                <Link as={RLink} to='/wishlist' color='gray.600'>
                    <VStack gap={'2px'}>
                        <AiOutlineHeart size='24px' />
                        <Text fontSize={'14px'}>Wishlist</Text>
                    </VStack>
                </Link>
                <Link as={RLink} to='/wishlist' color='gray.600'>
                    <VStack gap={'2px'}>
                        <AiOutlineShoppingCart size='24px' />
                            <Text fontSize={'14px'}>Cart [ <b>{data?.cart.length}</b> ]</Text>
                    </VStack>
                </Link>
            </HStack>
        </Box>
    )
}

export default BottomNavbar