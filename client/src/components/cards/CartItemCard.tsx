import React, { useState } from 'react'
import { AiFillStar, AiOutlineMinus } from 'react-icons/ai'
import AddToWishlistBtn from '../actionBtns/AddToWishlistBtn'
import ImageWithFallback from '../ImageWithFallback'
import { Badge, Button, Card, CardBody, Divider, HStack, Stack, Tag, Text } from '@chakra-ui/react'
import { CartItem } from '../../services/types/products'
import { AiOutlinePlus } from 'react-icons/ai'
import AddToCartBtn from '../actionBtns/AddToCartBtn'
import { useUpdateCartItemMutation } from '../../services/users'
import formatCurrency from '../../helpers/formatCurrency'


const ProductCard: React.FC<CartItem> = ({ product, quantity, _id }) => {
    const [count, setCount] = useState(quantity);
    const [updateCartItem] = useUpdateCartItemMutation()

    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (quantity !== count)
                updateCartItem({ product, quantity: count, _id });
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [count]);

    return (
        <Card>
            <CardBody p='3' position={'relative'}>
                <AddToWishlistBtn
                    productId={product._id}
                    variant={'outline'}
                    colorScheme={'gray'}
                    position='absolute'
                    IconSize='24px'
                    top='10px'
                    right='10px'
                />
                <HStack>
                    <ImageWithFallback
                        fallbackSrc={'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                        src={product.imageURL}
                        alt={product.name}
                        bgSize={'cover'}
                        h={'100px'}
                        borderRadius='5px'
                    />
                    <Stack>
                        <Text fontSize={'1em'} mb={0} fontWeight={700}>{product.brand}</Text>
                        <Text fontSize={'1em'} mt={-1} className='truncate-text' maxW={'250px'}>{product.name}</Text>
                        <HStack gap='10px'>
                            <Tag colorScheme='yellow' fontSize={'16px'}><AiFillStar size='18' />&nbsp;{product.rating}</Tag>
                            <Badge colorScheme={product.gender === 'MEN' ? 'blue' : 'pink'} fontSize={'14px'}>{product.gender}</Badge>
                            {
                                product.is_in_inventory &&
                                <Badge colorScheme={'gray'} fontSize={'14px'}>Only {product.items_left} left</Badge>
                            }
                        </HStack>
                    </Stack>
                </HStack>
                <Divider my='3' />
                <HStack justifyContent={'space-between'}>
                    <HStack>
                        {
                            count <= 1 ?
                                <AddToCartBtn
                                    productId={product._id}
                                    canUncart={true}
                                />
                                :
                                <Button isDisabled={count <= 1} onClick={() => setCount(prev => prev - 1)}><AiOutlineMinus /></Button>
                        }
                        <Text>{count}</Text>
                        <Button isDisabled={count >= product.items_left} onClick={() => setCount(prev => prev + 1)}><AiOutlinePlus /> </Button>
                    </HStack>
                    <Text fontSize={'1.5em'} fontWeight={700}>{formatCurrency(product.price)}/-</Text>
                </HStack>
            </CardBody>
        </Card>
    )
}

export default ProductCard