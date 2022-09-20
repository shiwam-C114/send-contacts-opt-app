import {
    Heading,
    Box,
    Center,
    Text,
    Stack,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import Router, { useRouter } from 'next/router';
import Nav from '../components/Nav';

export default function UserDetail() {
    const router = useRouter()
    const { name, gender, email, phone_no } = router.query

    return (
        <Nav>
            <Center py={24}>
                {/* box to show info about the contact */}
                <Box
                    border={""}
                    maxW={'35%'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'md'}>
                    <Box p={6}>
                        <Stack spacing={0} align={'center'} mb={5}>
                            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                                {name}
                            </Heading>
                            <br />
                            <br />
                            <Text color={'gray.500'}>Gender: {gender}</Text>
                            <Text color={'gray.500'}>Phone no.: {phone_no}</Text>
                            <Text color={'gray.500'}>Email: {email}</Text>
                        </Stack>

                        {/* button to go to the next page with query parameters */}
                        <Button
                            onClick={() => Router.push({
                                pathname: "/sendMsg",
                                query: {
                                    name,
                                    phone_no
                                }
                            })}
                            w={'full'}
                            mt={8}
                            bg={useColorModeValue('#151f21', 'gray.900')}
                            color={'white'}
                            rounded={'md'}
                            _hover={{
                                transform: 'translateY(-2px)',
                                boxShadow: 'lg',
                            }}>
                            Send Message
                        </Button>
                    </Box>
                </Box>
            </Center>
        </Nav>

    );
}