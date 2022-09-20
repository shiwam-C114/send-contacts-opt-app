import {
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import Router from 'next/router';

export default function Nav({children}) {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            <Box pos={"sticky"} bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={12} alignItems={'center'} justifyContent={'space-between'}>
                    <Box cursor={"pointer"} onClick={()=>{Router.push("/")}}> <strong> Send Contact OTP App </strong></Box>

                    <Flex alignItems={'center'}>                   
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>
                    </Flex>
                </Flex>
            </Box>
            {children}
        </>
    );
}