import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    
    // using chakra ui from styling.
    <ChakraProvider>
      < Component {...pageProps} />
    </ChakraProvider>
  )

}

export default MyApp
