import { Alert, AlertIcon, Button, Center, CircularProgress, Container, Heading, HStack, Spacer, Stack, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch';

export default function AddMagnet() {
  const router = useRouter();


  // var { loading, error, data } = useFetch();
  const [initialMagnetData, setinitialMagnetData] = useState('');

  const [progData, setprogData] = useState('');


  const setonInit = () => {
    var interVal = setInterval(() => {
      fetch(`https://seedr.torrentdev.workers.dev/getStatus`)
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
            router.push('/slowSpeed');
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

      fetch(`https://seedr.torrentdev.workers.dev/getAllFilesandFoldersandTorrents`)
        .then(res => {
          if (!res.ok) { // error coming back from server
            console.log('Could Not fetch the data for that resource');
          }

          return res.json();
        })
        .then(data => {
          console.log(data);
          if (data["folders"].length > 0) {
            myStopFunction();
            router.push("/seeAllFiles");
          }

        })
        .catch(err => {
          if (err.name === 'AbortError') {
            console.log('fetch aborted')
          } else {
            // auto catches network / connection error
            console.log(err.message);
          }
        });

    }, 500);




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

    fetch(`https://seedr.torrentdev.workers.dev/?action=addmagnet&magnet=${encodeURIComponent(router.query.magnet)}`)
      .then(res => {
        if (!res.ok) { // error coming back from server
          console.log('Could Not fetch the data for that resource');
        }

        return res.json();
      })
      .then(data => {
        console.log(data);
        setinitialMagnetData(data);
        setTimeout(() => { setonInit(); }, 5000);
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
