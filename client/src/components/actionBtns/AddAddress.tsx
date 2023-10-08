import React from 'react';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useAddAddressMutation } from '../../services/users';
import { Address } from '../../services/types/users';

const AddAddress: React.FC = () => {
    const [addAddress] = useAddAddressMutation()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm<Address>();
    const toast = useToast();

    const onSubmit = (data: Address) => {
        if (typeof data.pincode === 'string')
            data.pincode = parseInt(data.pincode, 10);
        console.log('Form Data:', data);
        addAddress(data).unwrap()
            .then(() => {
                toast({
                    title: 'Added address successfully!',
                    status: 'success',
                    duration: 3000
                })
            })
            .catch((err: any) => {
                toast({
                    title: err.message || 'Error adding address',
                    status: 'error',
                    duration: 3000
                })
            }).finally(() => {
                reset()
            })
        onClose();
    };

    return (
        <>
            <Button
                leftIcon={<AiOutlinePlus />}
                colorScheme="messenger" onClick={onOpen}>
                Add Address
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Address</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <VStack spacing={4}>
                                <FormControl isInvalid={!!errors.name}>
                                    <FormLabel>Name</FormLabel>
                                    <Controller
                                        name="name"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => <Input {...field} />}
                                    />
                                    <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.address1}>
                                    <FormLabel>Address 1</FormLabel>
                                    <Controller
                                        name="address1"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => <Input {...field} />}
                                    />
                                    <FormErrorMessage>{errors.address1?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Address 2</FormLabel>
                                    <Controller
                                        name="address2"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => <Input {...field} />}
                                    />
                                </FormControl>
                                <FormControl isInvalid={!!errors.pincode}>
                                    <FormLabel>Pincode</FormLabel>
                                    <Controller
                                        name="pincode"
                                        control={control}
                                        render={({ field }) => <Input {...field} />}
                                    />
                                    <FormErrorMessage>{errors.pincode?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.mobile}>
                                    <FormLabel>Mobile</FormLabel>
                                    <Controller
                                        name="mobile"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => <Input {...field} />}
                                    />
                                    <FormErrorMessage>{errors.mobile?.message}</FormErrorMessage>
                                </FormControl>
                            </VStack>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="outline" onClick={onClose}>
                                Close
                            </Button>
                            &nbsp;
                            <Button colorScheme="messenger" type="submit">
                                Submit
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddAddress;
