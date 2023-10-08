import { useEffect, useState } from 'react'
import { Button, useToast } from '@chakra-ui/react'
import { useGetUserQuery, useUpdateCartMutation } from '../../services/users'
import { AiOutlineCheck, AiOutlineDelete, AiOutlineShoppingCart } from 'react-icons/ai';
import { CartItem } from '../../services/types/products';

const AddToCartBtn = ({ productId, childern, canUncart, ...props }: any) => {
    const { data: userData } = useGetUserQuery();
    const [updateCart, { isLoading: isUpdaingCartLoading }] = useUpdateCartMutation();
    const [cart, setCart] = useState<CartItem[] | []>([])
    const [isInCart, setIsInCart] = useState(false);
    const toast = useToast();

    useEffect(() => {
        if (userData) {
            setCart(userData?.cart)
            const incart = userData.cart.some(obj => obj.product === productId);
            setIsInCart(incart)
        }
    }, [userData, productId])

    const addToCart = async () => {
        if (!userData) return toast({ title: "Please signin to your account!!", status: 'warning', duration: 3000 })
        const tcart = [...cart, { product: productId, quantity: 1 }];
        await updateCart(tcart);
    }

    const removeFromCart = async () => {
        if (!userData) return toast({ title: "Please signin to your account!!", status: 'warning', duration: 3000 })
        const tcart = cart.filter(c => c.product !== productId);
        await updateCart(tcart);
    }

    return (
        <Button
            onClick={isInCart ? removeFromCart : addToCart}
            leftIcon={!canUncart && (isInCart ? <AiOutlineCheck size='20px' /> : <AiOutlineShoppingCart size='20px' />)}
            isDisabled={(isInCart || isUpdaingCartLoading) && !canUncart}
            {...props}
        >
            {isInCart ?
                canUncart ?
                    <AiOutlineDelete size='20px' color='red' />
                    : 'ADDED TO CART'
                : childern || "ADD TO CART"}
        </Button>
    )
}

export default AddToCartBtn