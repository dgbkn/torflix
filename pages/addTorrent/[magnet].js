import { Alert, AlertIcon, Button, Center, CircularProgress, Container, Heading, HStack, Spacer, Stack, Text, VStack ,useToast} from '@chakra-ui/react';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch';

export default function AddMagnet() {
  const router = useRouter();

  const toast = useToast()

  // var { loading, error, data } = useFetch();
  const [initialMagnetData, setinitialMagnetData] = useState('');

  const [progData, setprogData] = useState('');


  const loadProguri = () => {
    fetch(`https://seedr.torrentdev.workers.dev/getAllFilesandFoldersandTorrents`)
      .then(res => {
        if (!res.ok) { // error coming back from server
          console.log('Could Not fetch the data for that resource');
        }

        return res.json();
      })
      .then(data => {
        console.log(data);
        var prog = data["torrents"][0]["progress_url"];
        setonInit(prog);
        // setTimeout(() => { setonInit(); }, 5000);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted')
        } else {
          // auto catches network / connection error
          console.log(err.message);
        }
      });

  }


  const setonInit = (progUri) => {

    var interVal = setInterval(() => {
      fetch(`https://seedr.torrentdev.workers.dev/getStatusWithURL?url=${encodeURIComponent(progUri)}`)
        .then(res => {
          if (!res.ok) { // error coming back from server
            console.log('Could Not fetch the data for that resource');
          }

          return res.json();
        })
        .then(data => {
          console.log(data);


          if ((data.warnings && data.warnings != '[]' && !vids) || data.download_rate == 0) {
            myStopFunction();
            toast({
              title: 'Slow Speed',
              description: "Not enough seeds",
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
            router.back();
            // router.push('/slowSpeed');
          }

          var prog = data.progress ? parseFloat(data.progress) : 0;

          // if(prog){
          //   myStopFunction();
          // }

          if (prog >= 98.0) {
            myStopFunction();
            router.push("/seeAllFiles");
          }

          if (!("status" in data)) {
            window.localStorage.setItem("pr", JSON.stringify(data));
          }

          setprogData(prog);
        })
        .catch(err => {
          if (err.name === 'AbortError') {
            console.log('fetch aborted')
          } else {
            // auto catches network / connection error
            console.log(err.message);
          }
        });


    }, 1000);




    const myTimeout = setTimeout(() => {
      var pr = JSON.parse(localStorage.getItem("pr"));
      if (!('status' in pr) && !('download_rate' in pr) && !('progress' in pr)) {
        myStopFunction();
        router.push('/slowSpeed');
      }
    }, 30000);


    function myStopFunction() {
      clearInterval(interVal);
    }
  }

  useEffect(() => {
    if (router.query.magnet != undefined) {
      fetch(`https://seedr.torrentdev.workers.dev/?action=addmagnet&magnet=${encodeURIComponent(router.query.magnet)}`)
        .then(res => {
          if (!res.ok) { // error coming back from server
            console.log('Could Not fetch the data for that resource');
          }

          return res.json();
        })
        .then(data => {
          console.log(data);
          if(data.result == "not_enough_space_wishlist_full"){
            toast({
              title: 'Not enough Space for torrent',
              description: "not_enough_space_wishlist_full",
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
            router.back();
          }
          setinitialMagnetData(data);
          setTimeout(() => { loadProguri(); }, 3000);
        })
        .catch(err => {
          if (err.name === 'AbortError') {
            console.log('fetch aborted')
          } else {
            // auto catches network / connection error
            console.log(err.message);
          }
        });

      return () => { };
    }
  }, [router.query.magnet]);

  return (
    <div>


      {(initialMagnetData && initialMagnetData.code == 200) && <>

        <Container>
          <Center>
            <Stack spacing={3}>
              <Alert status='success'>
                <AlertIcon />
                Magnet added to the server queue.Please Wait...
              </Alert>
            </Stack>
          </Center>

          <Spacer height={'2vh'}></Spacer>


          {/* Main Display */}
          <HStack>

            {progData &&
              <CircularProgress value={progData} />
            }

            <VStack>
              <Heading size={'md'}>
                Downloading
                <Text as={'span'} color={'blue.500'}>
                  {' ' + initialMagnetData.title + ' '}
                </Text>
                To Server..
              </Heading>

              <Text>
                {progData && 'Progress: ' + progData}
              </Text>
            </VStack>


          </HStack>

          {/* Main Display End*/}


          <Spacer height={'2vh'}></Spacer>


          <Stack direction='row' spacing={4} align='center'>
            <Button colorScheme='red' variant='solid' onClick={() => router.push('/')}>
              Go To Home.
            </Button>
            <Button colorScheme='red' variant='outline' onClick={() => router.push('/deleteAll')}>
              Reset Server.
            </Button>
          </Stack>

        </Container>


      </>
      }

      {(initialMagnetData && initialMagnetData.code != 200) &&
        <Alert status='error'>
          <AlertIcon />
          There was an error processing your request {' ' + initialMagnetData?.error}
        </Alert>
      }

    </div>
  )
}
