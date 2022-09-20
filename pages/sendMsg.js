import {
    Box,
    Button,
    Center,
    Input,
    Spinner,
    useColorModeValue,
    useDisclosure,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay
} from '@chakra-ui/react'
import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'


export default function SendMsg() {
    const router = useRouter()
    const { name, phone_no } = router.query
    const cancelRef = React.useRef()
    const [OTP, setOTP] = useState(0)
    const [msg, setMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [value, setValue] = useState(`Hi. ${name} your OTP is: `)

    // function to send msg to contact using our backend.
    async function sendMsgToContanct() {
        setIsLoading(true)
        let body = { name, phone_no, OTP }
        fetch(`${process.env.NEXT_PUBLIC_BASE}/api/server`, {
            method: 'POST',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => {
            return (res.json())
        }).then(data => {
            if (data.msg.status) {
                console.log(data.msg['error-text']);
                setMsg(`Hey there, I am using Vonage for OTP service and currently its in demo mode(non-paid) so I need to whitelist this number first. For that you need to help me by giving me a call @ +916206987538 and then otp sent to this number, then you can see OTP comming to this number too :). and I swear its working for my phone no.`)
                setIsLoading(false)
            } else {
                console.log(data.msg);
                setMsg(data?.msg);
                setIsLoading(false)
            }
        }).catch(err => console.log(err))
    }

    // function to generate a OTP
    function calculateOTP() {
        return parseInt(Math.random() * 1000000)
    }
    useEffect(() => {
        setOTP(calculateOTP())
    }, [])


    return (
        <div>
            <Nav>
                <Center py={24}>

                    {/* alert box which apears after seding msg */}
                    <AlertDialog
                        motionPreset='slideInBottom'
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                        isOpen={isOpen}
                        isCentered
                    >
                        <AlertDialogOverlay />
                        <AlertDialogContent>
                            <AlertDialogHeader>Wait.</AlertDialogHeader>

                            <AlertDialogBody padding={"20px 0"} textAlign={"center"}>
                                {
                                    isLoading ?
                                        <Spinner /> :
                                        msg
                                }
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={() => { onClose(); Router.replace("/") }}>
                                    Go to Home
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    {/* alert box end */}

                    {/* main box having input and send button */}
                    <Box
                        border={""}
                        w={"35%"}
                        bg={useColorModeValue('white', 'gray.800')}
                        boxShadow={'2xl'}
                        rounded={'md'}>
                        <Box p={6}>
                            <Input w={"full"} variant='filled' onChange={(e) => { setValue(e.target.value) }} value={value + OTP} placeholder='Filled' />
                            <Button
                                onClick={() => { sendMsgToContanct(); onOpen() }}
                                w={'full'}
                                mt={8}
                                bg={useColorModeValue('#151f21', 'gray.900')}
                                color={'white'}
                                rounded={'md'}
                                _hover={{
                                    transform: 'translateY(-2px)',
                                    boxShadow: 'lg',
                                }}>
                                Send
                            </Button>
                        </Box>
                    </Box>
                </Center>
            </Nav>
        </div>
    )
}
