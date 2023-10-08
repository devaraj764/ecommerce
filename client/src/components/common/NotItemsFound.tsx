import { HStack, Text } from '@chakra-ui/react'
import React from 'react'

type Props = {
    message: string
}

const NotItemsFound: React.FC<Props> = ({ message }: Props) => {
    return (
        <HStack justifyContent={'center'} minH='30vh' borderRadius='10px' border='1px solid #ccc' w='full'>
            <Text fontSize={'20px'}>{message || '😢 No items in ound'}</Text>
        </HStack>
    )
}

export default NotItemsFound