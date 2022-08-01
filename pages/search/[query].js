import { Box, Divider, Flex, Heading, Text, useColorModeValue as mode } from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/router'
import SkeletonPage from '../../components/SkeletonPage'
import useFetchAll from '../../hooks/useFetchtorlock'
import Link from 'next/link';


export default function QueryPage() {
    const router = useRouter()

    var { loading, error, data } = useFetchAll(router.query.query);


    return (
        <div>


            <Flex width="100%" align="center" px={10} wrap={'wrap'} direction={'column'} paddingBottom={2}>

                <Heading
                    fontWeight={'bold'}
                    fontSize={'3xl'}
                    lineHeight={'110%'}>
                    Search
                    <Text as={'span'} color={'purple.500'}>
                        {' '} Results.
                    </Text>
                </Heading>


                {data && !error &&
                    data.data.filter(function (el) {
                        return (parseFloat(el.size) <= 4.0 || parseInt(el.size) > 100) &&
                            el.magnet != undefined;
                    }
                    ).map((s, i) => (
                             <Link key={i + 1} href={`/addTorrent/${encodeURIComponent(s.magnet)}`}>
                                <a>
                                    <Box as="section" py="2" mx="3">
                                        <Box maxW="3xl" mx="auto" px={{ md: '8' }}
                                            borderWidth='1px'
                                            bg={mode('white', 'gray.700')}
                                            rounded={{ md: 'lg' }}
                                            shadow="base"
                                            overflow="hidden"
                                            borderRadius='20px'
                                        >
                                            <Box px="6" py="4">
                                                <Text as="h3" fontWeight="bold" fontSize="md">
                                                    {s.name}
                                                </Text>

                                                <Text as={'span'} color={'red.500'}>
                                                    {' | ' + s.size}
                                                </Text>
                                            </Box>
                                            <Divider />
                                        </Box>
                                    </Box>
                                </a>
                            </Link>

                    ))
                }

            </Flex>
            {loading && <SkeletonPage />}



            {error && <center style={{ padding: 10 }}><h5>Oops, an error occurred.</h5></center>}

        </div>
    )
}
