import { Alert, AlertIcon, Button, Center, CircularProgress, Container, Heading, HStack, Spacer, Stack, Text, VStack, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function AddMagnet() {
  const router = useRouter();
  const toast = useToast();
  const [initialMagnetData, setInitialMagnetData] = useState(null);
  const [progData, setProgData] = useState(null);

  const fetchData = async (url, options = {}) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error.message);
      toast({
        title: 'An error occurred.',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      throw error;
    }
  };

  const loadProguri = async () => {
    try {
      const data = await fetchData('https://seedr.torrentdev.workers.dev/getAllFilesandFoldersandTorrents');
      const progUri = data.torrents[0].progress_url;
      setonInit(progUri);
    } catch (error) {
      console.error('Could not load progress URI.');
      setTimeout(() => {
        loadProguri();
      }, 1000);
    }
  };

  const setonInit = (progUri) => {
    const interVal = setInterval(async () => {
      try {
        const data = await fetchData(`https://seedr.torrentdev.workers.dev/getStatusWithURL?url=${encodeURIComponent(progUri)}`);

        if ((data.warnings && data.warnings !== '[]') || data.download_rate === 0) {
          clearInterval(interVal);
          toast({
            title: 'Slow Speed',
            description: 'Not enough seeds',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
          setTimeout(() => router.back(), 3000);
          return;
        }

        const prog = data.progress ? parseFloat(data.progress) : 0;
        setProgData(prog);

        if (prog >= 98.0) {
          clearInterval(interVal);
          router.push('/seeAllFiles');
        }

        if (!('status' in data)) {
          localStorage.setItem('pr', JSON.stringify(data));
        }
      } catch (error) {
        console.error('Could not fetch status.');
      }
    }, 1000);

    setTimeout(() => {
      const pr = JSON.parse(localStorage.getItem('pr') || '{}');
      if (!('status' in pr) && !('download_rate' in pr) && !('progress' in pr)) {
        clearInterval(interVal);
        toast({
          title: 'Slow Speed',
          description: 'Not enough seeds',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        setTimeout(() => router.back(), 3000);
      }
    }, 30000);
  };

  useEffect(() => {
    const addMagnet = async () => {
      if (router.query.magnet) {
        try {
          const data = await fetchData(`https://seedr.torrentdev.workers.dev/?action=addmagnet&magnet=${encodeURIComponent(router.query.magnet)}`);
          if (data.result === 'not_enough_space_wishlist_full') {
            toast({
              title: 'Not enough Space for torrent',
              description: 'Not enough space in wishlist',
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
            setTimeout(() => router.back(), 3000);
            return;
          }
          setInitialMagnetData(data);
          setTimeout(() => { loadProguri(); }, 3000);
        } catch (error) {
          console.error('Could not add magnet.');
        }
      }
    };
    addMagnet();
  }, [router.query.magnet]);

  return (
    <div>
      {initialMagnetData && initialMagnetData.code === 200 && (
        <Container>
          <Center>
            <Stack spacing={3}>
              <Alert status='success'>
                <AlertIcon />
                Magnet added to the server queue. Please wait...
              </Alert>
            </Stack>
          </Center>
          <Spacer height='2vh' />
          <HStack>
            {progData !== null && <CircularProgress value={progData} />}
            <VStack>
              <Heading size='md'>
                Downloading
                <Text as='span' color='blue.500'> {initialMagnetData.title} </Text>
                to Server..
              </Heading>
              <Text>
                {progData !== null && `Progress: ${progData}`}
              </Text>
            </VStack>
          </HStack>
          <Spacer height='2vh' />
          <Stack direction='row' spacing={4} align='center'>
            <Button colorScheme='red' variant='solid' onClick={() => router.push('/')}>
              Go To Home
            </Button>
            <Button colorScheme='red' variant='outline' onClick={() => router.push('/deleteAll')}>
              Reset Server
            </Button>
          </Stack>
        </Container>
      )}
      {initialMagnetData && initialMagnetData.code !== 200 && (
        <Alert status='error'>
          <AlertIcon />
          There was an error processing your request: {initialMagnetData?.error}
        </Alert>
      )}
    </div>
  );
}
