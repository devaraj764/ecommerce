import { useEffect, useState } from 'react'
import { Button, useToast } from '@chakra-ui/react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useGetUserQuery, useUpdateWishlistMutation } from '../../services/users';

const AddToWishlistBtn = ({ productId, children, IconSize, ...props }: any) => {
    const { data: userData } = useGetUserQuery();
    const [updateWishlist, { isSuccess: updateWishlistSuccess, error: updateWishlistError, isLoading: isUpdaingWishlistLoading }] = useUpdateWishlistMutation()
    const [wishlist, setWishlist] = useState<string[] | []>([]);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const toast = useToast();

    useEffect(() => {
        if (userData && productId) {
            setWishlist(userData?.wishlist)
            const inwishlist = userData.wishlist?.includes(productId);
            setIsInWishlist(inwishlist)
        }
    }, [userData, productId])

    const addToWishlist = async () => {
        if (!userData) return toast({ title: "Please signin to your account!!", status: 'warning', duration: 3000 })
        const tWishlist = [...wishlist, productId];
        await updateWishlist(tWishlist)
    }

    const removeFromWishlist = async () => {
        if (!userData) return toast({ title: "Please signin to your account!!", status: 'warning', duration: 3000 })
        const tWishlist = wishlist.filter(c => c !== productId);
        await updateWishlist(tWishlist)
    }

    useEffect(() => {
        if (updateWishlistError) {
            console.log(updateWishlistError)
        }
    }, [updateWishlistError, updateWishlistSuccess])

    return (
        <Button
            onClick={isInWishlist ? removeFromWishlist : addToWishlist}
            isDisabled={isUpdaingWishlistLoading}
            {...props}
            p='10px'
        >
            {isInWishlist ?
                <AiFillHeart color='red' size={IconSize || '32px'} />
                :
                <AiOutlineHeart size={IconSize || '32px'} />
            }
        </Button>
    )
}

export default AddToWishlistBtn