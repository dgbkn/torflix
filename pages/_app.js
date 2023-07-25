
import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
// import "./plyr.css";
import Script from 'next/script';



function MyApp({ Component, pageProps }) {

  return <ChakraProvider theme={theme}>
    {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1402284079761185"
      crossorigin="anonymous"></script> */}
    <Script
      id="Adsense-id"
      // data-ad-client="ca-pub-1402284079761185"
      async="true"
      strategy="beforeInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1402284079761185"
    />

    <Navbar />
    <Component {...pageProps} />
  </ChakraProvider>

}

export default MyApp
