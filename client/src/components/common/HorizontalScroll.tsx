import { Box, Flex } from "@chakra-ui/react";
import React from "react";

type Props = {
    children: React.ReactNode
}

export const HorizontalScrollList: React.FC<Props> = ({ children }) => {
    return (
        <Flex
            overflowX="scroll"
            padding="10px"
            border="1px solid #eee"
            borderRadius={'10px'}
        >
            {children}
        </Flex>
    );
};

export const HorizontalScrollItem: React.FC<Props> = ({ children }) => {
    return (
        <Box
            flex="0 0 auto"
            marginRight="16px"
            className="item"
        >
            {children}
        </Box>
    );
};