import React from 'react';
import {
    Box, Flex, Link, Spacer, Text, Container, HStack, Image, Badge,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
} from '@chakra-ui/react';
import BrandLogo from '../assets/brand-logo.svg';
import { Link as RLink, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiOutlineLogout, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { BsBoxSeam } from 'react-icons/bs'
import { useGetUserQuery } from '../services/users';
import SignInButton from './actionBtns/SignInButton';

const Navbar: React.FC = () => {
    const { data, error } = useGetUserQuery();
    const location = useLocation();
    const navigate = useNavigate();
    const pathname = location.pathname;

    React.useEffect(() => {
        if (!data && error) {
            if (pathname.includes('/cart') || pathname.includes('/wishlist') || pathname.includes('/orders')) navigate('/')
        }
    }, [data, error]);

    const Logout = async () => {
        localStorage.removeItem('token')
        window.location.reload();
    }

    return (
        <Box py={4} borderBottom={'1px solid'} bg='#fff' borderColor={'blackAlpha.100'}
            position={'fixed'}
            top={'0'}
            right={'0'}
            left={'0'}
            zIndex={999}
        >
            <Container maxW="container.xl">
                <Flex align="center">
                    <RLink to='/'>
                        <HStack>
                            <Image src={BrandLogo} alt="brand-logo" h='3em' color='#ecc94b' />
                            <Text fontWeight={'700'} fontSize="1.5em">ShoeShore</Text>
                        </HStack>
                    </RLink>
                    <Spacer />
                    {
                        data ?
                            <>
                                <Menu>
                                    <MenuButton color='gray.600' className='nav-items-lg' ml={10} _hover={{ color: '#0078ff' }}>
                                        <Flex alignItems={'center'}>
                                            <AiOutlineUser size='24' /> &nbsp; {data.fullname}
                                        </Flex>
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem className='nav-items-lg'>
                                            <Link as={RLink} to='/wishlist' ml={10} className='flex nav-items-lg' color='gray.600'>
                                                <AiOutlineHeart size='24' /> Wishlist
                                            </Link>
                                        </MenuItem>
                                        <MenuItem className='nav-items-lg'>
                                            <Link as={RLink} to='/orders' ml={10} className='flex nav-items-lg' color='gray.600'>
                                                <BsBoxSeam size='22' /> Orders
                                            </Link>
                                        </MenuItem>
                                        <MenuItem as={Box}>
                                            <Button variant={'outline'} leftIcon={<AiOutlineLogout />} colorScheme='red' w={'full'} onClick={Logout}>
                                                Logout
                                            </Button>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                                <Link as={RLink} to='/cart' ml={10} className='flex nav-items-lg' color='gray.600'>
                                    <AiOutlineShoppingCart size='24' /> Cart <Badge fontSize={'1em'}>{data.cart.length}</Badge>
                                </Link>
                            </>
                            :
                            <SignInButton variant={'outline'} colorScheme="messenger">
                                Sign In
                            </SignInButton>
                    }
                </Flex>
            </Container>
        </Box>
    );
}

export default Navbar