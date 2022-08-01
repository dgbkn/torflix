import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Center, Container, Flex, Heading, HStack, Image, Stack, StackDivider, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FaFolder } from "react-icons/fa";
import SkeletonPage from "../components/SkeletonPage";
import Feature from '../components/Feature';
import { useRouter } from "next/router";
import { isAndroid } from "react-device-detect";

export default function SeeAllFiles() {

    // var { loading, error, data } = useFetch();

    var router = useRouter();

    const [filesAndFolders, setfilesAndFolders] = useState('');

    const [firstLoad, setfirstLoad] = useState(false);

    const refreshData = () => {
        fetch(`https://seedr.torrentdev.workers.dev/getAllFiles`)
            .then(res => {
                if (!res.ok) { // error coming back from server
                    console.log('Could Not fetch the data for that resource');
                }

                return res.json();
            })
            .then(data => {
                console.log(data);
                setfilesAndFolders(data);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    // auto catches network / connection error
                    console.log(err.message);
                }
            });
    };


    useEffect(() => {
        setTimeout(() => { refreshData(); setfirstLoad(true) }, 2000);
    }, []);

    return (
        <Box >

            <Flex width="100%" align="center" px={10} wrap={'wrap'} direction={'column'} paddingBottom={2}>

                <Head>
                    <title>
                        All Files.
                    </title>

                </Head>


                <Heading
                    fontWeight={'bold'}
                    fontSize={'3xl'}
                    lineHeight={'110%'}>
                    All
                    <Text as={'span'} color={'green.500'}>
                        {' '} Files.
                    </Text>
                </Heading>

                <br />


                {(!filesAndFolders || !firstLoad ) && <SkeletonPage />}


                {filesAndFolders && <VStack
                    align='stretch'
                >
                    <Accordion allowToggle>

                        {

                            filesAndFolders.map(
                                (el) => <>
                                    {el.map((ele) => <>

                                        <AccordionItem>
                                            <h2>
                                                <AccordionButton>
                                                    <HStack height={'50px'} padding={2}>
                                                        <Feature
                                                            icon={
                                                                <FaFolder w={5} h={5} />
                                                            }
                                                            text={ele.name}
                                                        />
                                                    </HStack>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel pb={4}>
                                                <a href={`https://seedr.torrentdev.workers.dev/download?id=${ele.id}`} target='_black'>
                                                    <Button colorScheme='yellow' variant='outline'>
                                                        Download.
                                                    </Button>
                                                </a>



                                                {(ele.name.includes(".mkv") || ele.name.includes(".mp4")) && <>

                                                    <a href={`https://seedr.torrentdev.workers.dev/playVid?id=${ele.id}&embed=1`} target='_black'>
                                                        <Button colorScheme='yellow' variant='outline'>
                                                            Play SD.
                                                        </Button>
                                                    </a>


                                                    <a href={`https://chromecast.link/#title=Playing_Torrent&poster=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2Fo76ZDm8PS9791XiuieNB93UZcRV.jpg&content=${encodeURIComponent("https://seedr.torrentdev.workers.dev" + "/download?id=" + ele.id)}`} target='_black'>
                                                        <Button colorScheme='yellow' variant='outline'>
                                                            Cast to TV.
                                                        </Button>
                                                    </a>

                                                    {isAndroid && <>
                                                        <br />
                                                        <br />
                                                        Select Your Favourite Player to Watch:
                                                        <br />
                                                        <HStack>
                                                            <a href={'vlc://' + "https://seedr.torrentdev.workers.dev" + "/download?id=" + ele.id}><Image alt={"VLC Player"} src='https://i.ibb.co/pnkzqQy/index.png' width='50' height='50' /></a>
                                                            <a href={'intent:' + "https://seedr.torrentdev.workers.dev" + "/download?id=" + ele.id+ '#Intent;package=com.mxtech.videoplayer.ad;S.title=;end'}><Image alt={"MX Player"}  src='https://play-lh.googleusercontent.com/D17gZhrvhTyMc68MPtR8sRMs9BBzi6XOhnxGgQDVrWmXCThKo9yFxVWO7HR359_by80=w480-h960' width='50' height='50' /></a>
                                                            <a href={'intent:' + "https://seedr.torrentdev.workers.dev" + "/download?id=" + ele.id + '#Intent;package=com.mxtech.videoplayer.pro;S.title=;end'}><Image  alt={"MX Player PRO"}  src='https://telegra.ph/file/55a9a39612e8a4645e9aa.png' width='50' height='50' /></a>
                                                            <a href={"nplayer-" + "https://seedr.torrentdev.workers.dev" + "/download?id=" + ele.id}><Image alt={"N-Player"}  src='https://play-lh.googleusercontent.com/sUfT6XnffHLlw6UcJ4UMwfAohc63xYGqdU1nEOcmQuvRg0qXZVZswFO4I7eT1zN_UigD=w480-h960' width='50' height='50' /></a>
                                                            {/* <a href={'podplayer//' + encodeURIComponent("https://seedr.torrentdev.workers.dev" + "/download?id=" + ele.id)}><Image alt={"PodPlayer"}  src='https://play-lh.googleusercontent.com/DFGmIrt1GvYT3t545ow8WkrmijWk82gcddWRtriSpcAO-e_zsSxdELDEpGz6_3yJVg=w480-h960' width='50' height='50' /></a> */}
                                                        </HStack>
                                                    </>}


                                                </>}

                                            </AccordionPanel>
                                        </AccordionItem>



                                        {/* <hr /> */}
                                        <br />
                                    </>)}
                                </>
                            )}

                    </Accordion>
                </VStack>}


                {filesAndFolders && filesAndFolders?.length == 0 &&
                    <Center>
                        <VStack>
                            <HStack>
                                <Player
                                    autoplay={true}
                                    loop={true}
                                    controls={false}
                                    src="https://assets2.lottiefiles.com/private_files/lf30_cgfdhxgx.json"
                                    style={{ height: '30vh', width: '30vh' }}
                                ></Player>
                                <Player
                                    autoplay={true}
                                    loop={true}
                                    controls={false}
                                    src="https://assets2.lottiefiles.com/packages/lf20_ydo1amjm.json"
                                    style={{ height: '30vh', width: '30vh' }}
                                ></Player>
                            </HStack>

                            <Heading
                                fontWeight={'bold'}
                                fontSize={'xl'}
                                lineHeight={'110%'}>
                                Server is
                                <Text as={'span'} color={'red.500'}>
                                    {' '} Empty.
                                </Text>
                                {' '} Add Some Torrent.
                            </Heading>

                        </VStack>
                    </Center>

                }

                <br />
                <br />
                <Stack direction='row' spacing={4} align='center'>
                    <Button colorScheme='red' variant='ghost' onClick={() => router.push('/')}>
                        Go To Home.
                    </Button>
                </Stack>


            </Flex>
        </Box>
    )
}
