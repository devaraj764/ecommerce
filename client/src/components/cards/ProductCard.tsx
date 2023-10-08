import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import AddToWishlistBtn from '../actionBtns/AddToWishlistBtn'
import ImageWithFallback from '../ImageWithFallback'
import { Badge, Box, Card, CardBody, HStack, Tag, Text } from '@chakra-ui/react'
import { TProduct } from '../../services/types/products'

type Props = {
    product: TProduct
    children: any
}

const ProductCard: React.FC<Props> = ({ product, children }: Props) => {
    return (
        <Card>
            <CardBody>
                <Box
                    position={'relative'}
                    borderRadius={'10px'}
                    bgColor={'#F6F6F6'}
                    border={'1px solid #eee'}
                >
                    <AddToWishlistBtn
                        productId={product._id}
                        variant={'outline'}
                        colorScheme={'gray'}
                        position='absolute'
                        top='10px'
                        right='10px'
                    />
                    <center>
                        <ImageWithFallback
                            fallbackSrc={'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                            src={product.imageURL}
                            bgSize={'cover'}
                            alt={product.name}
                            h={'350px'}
                        />
                    </center>
                </Box>
                <HStack justifyContent={'space-between'}>
                    <Box>
                        <Text fontSize={'1em'} mt={3} fontWeight={700}>{product.brand}</Text>
                        <Text fontSize={'1em'} className='truncate-text' maxW={'250px'}>{product.name}</Text>
                    </Box>
                    <Text fontSize={'1.5em'} fontWeight={700}>₹ {product.price}/-</Text>
                </HStack>
                <HStack mt={3} gap='10px'>
                    <Tag colorScheme='yellow' fontSize={'16px'}><AiFillStar size='18' />&nbsp;{product.rating}</Tag>
                    <Badge colorScheme={product.gender === 'MEN' ? 'blue' : 'pink'} fontSize={'14px'}>{product.gender}</Badge>
                    {
                        product.is_in_inventory &&
                        <Badge colorScheme={'gray'} fontSize={'14px'}>Only {product.items_left} left</Badge>
                    }
                </HStack>
                {children}
            </CardBody>
        </Card>
    )
}

export default ProductCard