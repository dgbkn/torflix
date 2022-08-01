import { Alert, AlertIcon, Container } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function SlowSpeed() {

    const router = useRouter();

    setTimeout(()=>{
        fetch('https://seedr.torrentdev.workers.dev/deleteAll').then(res => {
            router.push('/');
          });
    },5000);

    return (
        <Container>
            <Alert status='error'>
                <AlertIcon />
                Slow Torrent DETECTED use another torrent from search...
            </Alert>

            <Alert status='info'>
                <AlertIcon />
                redirecting you to home in 5sec..
            </Alert>

        </Container>

        
    )
}
