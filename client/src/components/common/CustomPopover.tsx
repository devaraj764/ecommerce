import React from 'react'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
} from '@chakra-ui/react'

type Props = {
    children: React.ReactNode
    triggerComponent: React.ReactNode
}

const CustomPopover: React.FC<Props> = ({ children, triggerComponent }: Props) => {
    return (
        <Popover>
            <PopoverTrigger>
                {triggerComponent}
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                    {children}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default CustomPopover