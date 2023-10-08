import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl, FormLabel, Input, Button, VStack,
    Tabs, TabList, TabPanels, Tab, TabPanel, Box, FormErrorMessage, HStack, useToast
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { useGetUserQuery, useLoginUserMutation, useRegisterUserMutation } from '../../services/users';
import { TUserLogin, TUserRegister } from '../../services/types/users';


const SignInButton: React.FC<any> = ({ children, ...styles }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [tabIndex, setTabIndex] = useState(0)

    const handleTabsChange = (index: number) => {
        setTabIndex(index)
    }

    return (
        <>
            <Button onClick={onOpen} {...styles}>
                {children}
            </Button>
            <Modal size={'xl'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody mt='10'>
                        <Tabs isFitted colorScheme='messenger' variant='enclosed' index={tabIndex} onChange={handleTabsChange}>
                            <TabList>
                                <Tab fontWeight={'700'}>Login</Tab>
                                <Tab fontWeight={'700'}>SignUp</Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <SignInComponent handleTabsChange={handleTabsChange} onClose={onClose} />
                                </TabPanel>
                                <TabPanel>
                                    <SignUpComponent handleTabsChange={handleTabsChange} onClose={onClose} />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </ModalBody>
                </ModalContent>
            </Modal>

        </>
    )
}

const SignInComponent: React.FC<{ handleTabsChange: (index: number) => void, onClose: () => void }> = ({ handleTabsChange, onClose }) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TUserLogin>();
    const toast = useToast()

    const [loginUser, { data, isSuccess, error }] = useLoginUserMutation();
    const { refetch } = useGetUserQuery()

    useEffect(() => {
        if (isSuccess && data) {
            localStorage.setItem('token', data.token);
            toast({
                title: "Login Successful",
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
            refetch();
            onClose();
        }
        else if (error) {
            console.log(error);
            toast({
                // @ts-ignore
                title: error?.data?.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
    }, [error, isSuccess]);

    return (
        <Box py={4}>
            <form onSubmit={handleSubmit(loginUser)}>
                <VStack spacing={4}>
                    <FormControl id="email" isInvalid={!!errors.email}>
                        <FormLabel fontSize={'14px'}>Email Address</FormLabel>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Email is required' }} // Add validation rule
                            render={({ field }) => (
                                <Input {...field} type="email" placeholder="Enter your email" />
                            )}
                        />
                        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl id="password" isInvalid={!!errors.password}>
                        <FormLabel fontSize={'14px'}>Password</FormLabel>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Password is required' }} // Add validation rule
                            render={({ field }) => (
                                <Input {...field} type="password" placeholder="Enter your password" />
                            )}
                        />
                        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                    </FormControl>
                    <HStack w='full' mt='5'>
                        <Button w='full' variant={'outline'} onClick={() => handleTabsChange(1)}>
                            Create Account
                        </Button>
                        <Button w='full' type="submit" colorScheme="messenger">
                            Login
                        </Button>
                    </HStack>
                </VStack>
            </form>
        </Box>
    )
}

const SignUpComponent: React.FC<{ handleTabsChange: (index: number) => void, onClose: () => void }> = ({ handleTabsChange, onClose }) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        watch,
    } = useForm<TUserRegister>();
    const toast = useToast();

    const [registerUser, { data, error, isSuccess }] = useRegisterUserMutation();
    const { refetch } = useGetUserQuery()

    const onSubmit = async (data: TUserRegister) => {
        // You can handle form submission logic here
        delete data.confirmPassword;
        await registerUser(data);
    };

    useEffect(() => {
        if (isSuccess && data) {
            localStorage.setItem('token', data.token);
            toast({
                title: "Login Successful",
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
            refetch();
            onClose();
        }
        if (error) {
            toast({
                // @ts-ignore
                title: error?.data?.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
    }, [error, isSuccess]);

    const password = watch('password');
    return (
        <Box py={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={4}>
                    <FormControl id="fullname" isInvalid={!!errors.fullname}>
                        <FormLabel fontSize={'14px'}>Full Name</FormLabel>
                        <Controller
                            name="fullname"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Full Name is required' }}
                            render={({ field }) => (
                                <Input {...field} type="text" placeholder="Enter your full name" />
                            )}
                        />
                        <FormErrorMessage>{errors.fullname && errors.fullname.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl id="email1" isInvalid={!!errors.email}>
                        <FormLabel fontSize={'14px'}>Email Address</FormLabel>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Email is required', pattern: /^\S+@\S+$/i }}
                            render={({ field }) => (
                                <Input {...field} type="email" placeholder="Enter your email" />
                            )}
                        />
                        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl id="password1" isInvalid={!!errors.password}>
                        <FormLabel fontSize={'14px'}>Password</FormLabel>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Password is required', minLength: 6 }}
                            render={({ field }) => (
                                <Input {...field} type="password" placeholder="Enter your password" />
                            )}
                        />
                        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl id="confirmPassword" isInvalid={!!errors.confirmPassword}>
                        <FormLabel fontSize={'14px'}>Confirm Password</FormLabel>
                        <Controller
                            name="confirmPassword"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'Confirm Password is required',
                                validate: (value) => value === password || 'Passwords do not match',
                            }}
                            render={({ field }) => (
                                <Input {...field} type="password" placeholder="Confirm your password" />
                            )}
                        />
                        <FormErrorMessage>
                            {errors.confirmPassword && errors.confirmPassword.message}
                        </FormErrorMessage>
                    </FormControl>
                    <HStack w='full' mt='5'>
                        <Button w='full' variant={'outline'} onClick={() => handleTabsChange(0)}>
                            Already a user ?
                        </Button>
                        <Button w='full' type="submit" colorScheme="messenger">
                            SignUp
                        </Button>
                    </HStack>
                </VStack>
            </form>
        </Box>
    )
}

export default SignInButton