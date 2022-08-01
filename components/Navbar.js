import {
    Box,
    Button,
    Flex,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';


export default function Navbar() {
    var router = useRouter();
    return (

        <Box className='header' paddingX={2} paddingY={5} >
            <Flex as="header" width="100%" align="center" px={10} wrap={'wrap'} paddingBottom={2}>
                <Logo />

                <Box marginLeft={'auto'} >
                    <Button colorScheme='red' variant='outline' onClick={() => router.push('/seeAllFiles')}>
                        See all files.
                    </Button>
                    <ColorModeSwitcher />
                </Box>

            </Flex>
        </Box>

    )
        ;
}
