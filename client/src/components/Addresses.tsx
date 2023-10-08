import { Card, CardBody, Heading, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { HorizontalScrollItem, HorizontalScrollList } from './common/HorizontalScroll'
import { useGetUserQuery } from '../services/users'
import { Address } from '../services/types/users'
import AddAddress from './actionBtns/AddAddress'

type Props = {
    setAddress: React.Dispatch<string>
    address: string
}

const Addresses: React.FC<Props> = ({ setAddress, address }: Props) => {
    const { data: userData } = useGetUserQuery();
    const [addresses, setAddresses] = useState<Address[]>([]);


    useEffect(() => {
        if (userData && userData.addresses) {
            setAddresses(userData.addresses)
        }
    }, [userData])

    return (
        <Card my='5' borderRadius={'5px'}>
            <CardBody>
                <Heading fontSize="1em" fontFamily={'Nunito'} mb='3'>Select Delivery Address</Heading>
                <HorizontalScrollList>
                    {addresses.length > 0 && userData?.addresses.map((item, index) => (
                        <HorizontalScrollItem key={index.toString()}>
                            <Card h='full' w='300px' onClick={() => setAddress(item._id === address ? '' : (item._id || ''))}
                                border={item._id === address ? '2px solid #0078ff' : ''}
                                cursor={'pointer'}
                            >
                                <CardBody p='10px'>
                                    <Text fontSize='1.3em' fontWeight={'700'} mb='2'>{item.name}</Text>
                                    <Text fontWeight={'700'} color='gray.600'>Address:</Text>
                                    <Text>{item.address1} {item.address2}</Text>
                                    <Text fontWeight={'700'} color='gray.600' mt='2'>Pincode: {item.pincode}</Text>
                                    <Text fontWeight={'700'} color='gray.600' mt='2'>Mobile: {item.mobile}</Text>
                                </CardBody>
                            </Card>
                        </HorizontalScrollItem>
                    ))}
                    <HorizontalScrollItem>
                        <Card h='full' w='350px' >
                            <CardBody>
                                <Stack alignItems={'center'} justifyContent='center' h='full' w='full'>
                                    <AddAddress />
                                </Stack>
                            </CardBody>
                        </Card>
                    </HorizontalScrollItem>
                </HorizontalScrollList>
            </CardBody>
        </Card>
    )
}

export default Addresses