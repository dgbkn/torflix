import { Box, Button, Divider, Flex, Heading, Text, useColorModeValue as mode } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import SkeletonPage from '../../components/SkeletonPage'
import useFetchAll from '../../hooks/useFetchtorlock'
import Link from 'next/link';
import useFetch1337x from '../../hooks/useFetch1337x'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function QueryPage() {
    const router = useRouter()

    // var { loading2, error2, data2 } = useFetch1337x(router.query.query);
    var { loading, error, data } = useFetchAll(router.query.query);


    const [resp, setGitData] = useState([]);

    useEffect(() => {

        const abortCont = new AbortController();
        var uri_1337x = `https://1337x.to/sort-search/${encodeURIComponent(router.query.query)}/time/desc/1/`;
        var selector = "tr";

        const fetchData = async () => {
            var respGlobal = await fetch(
                `https://scrap.torrentdev.workers.dev/?url=${encodeURIComponent(uri_1337x)}&selector=${encodeURIComponent(selector)}`
            );

            respGlobal = await respGlobal.json();

            var final_ = [];

            respGlobal.result.forEach(element => {
                var html = element.innerHTML;
                console.log(html);

                var snip = element.text.split("\n");
                const parser = new DOMParser();
                var post = parser.parseFromString(html, "text/html");

                var name = snip[1];
                var href = post.getElementsByTagName('a')[1]?.href;
                var seeds = snip[2];
                var ssiss = snip[5].substring(0, snip[5].indexOf('B') + 1);
                var size = parseFloat(ssiss);
                var GB = ssiss.includes('GB') ? true : false;
                var uploader = snip[6];
                var datae = snip[4];

                if (name != "name") {
                    final_.push({
                        "name": name,
                        "href": href,
                        "seeds": seeds,
                        "size": size,
                        "GB": GB,
                        "uploader": uploader,
                        "datae": datae
                    });
                }



            });

            setGitData(final_);
        };

        fetchData();
    }, []);

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

                <Divider height={5}></Divider>

                <Tabs variant='soft-rounded' colorScheme='green'>
                    <TabList>
                        <Tab>1337x</Tab>
                        <Tab>All Sites</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {!resp && <SkeletonPage />}


                            {resp &&
                                resp.filter(function (el) {
                                    return (!el.GB || (el.GB && el.size <= 4.0));
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
                                                            {'Seeds:' + s.seeds + ' | ' + s.uploader + ' | ' + s.datae + ' | ' + s.size + " " + s.GB}
                                                        </Text>
                                                    </Box>
                                                    <Divider />
                                                </Box>
                                            </Box>
                                        </a>
                                    </Link>

                                ))
                            }






                        </TabPanel>

                        <TabPanel>
                            {loading && <SkeletonPage />}

                            {data && !error &&
                                data.torrents.filter(function (el) {
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
                                                            {s.title}
                                                        </Text>

                                                        <Text as={'span'} color={'red.500'}>
                                                            {'Seeds:' + s.seeds + ' | ' + s.source + ' | ' + s.size}
                                                        </Text>
                                                    </Box>
                                                    <Divider />
                                                </Box>
                                            </Box>
                                        </a>
                                    </Link>

                                ))
                            }
                        </TabPanel>

                    </TabPanels>
                </Tabs>




            </Flex>



            {error && <center style={{ padding: 10 }}><h5>Oops, an error occurred.</h5></center>}

        </div>
    )
}
