import React from 'react';
import { Box, Heading, HStack, Image, Spacer } from '@chakra-ui/react';
import { Player } from "@lottiefiles/react-lottie-player";
import Link from 'next/link';



export const Logo = props => {
    return <>

        <Link href="/">
            <a>
                <HStack >
                    <Box w={50} >
                        <Player
                            autoplay={true}
                            loop={true}
                            controls={false}
                            src="https://assets4.lottiefiles.com/packages/lf20_21peszd4.json"
                            style={{ height: '100px', width: '100px' }}
                        ></Player>
                    </Box>



                    <Spacer w={10}>
                    </Spacer>


                    <Heading as="h1" size="xl"
                        fontWeight='extrabold'>
                        Torflix
                    </Heading>
                </HStack>
                </a>
        </Link>



    </>;
};
