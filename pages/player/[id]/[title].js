import { useRouter } from "next/router";
import VidStackPlayer from "../vidstackplayer";
import Head from "next/head";
import { useBreakpointValue } from '@chakra-ui/react'

export default function Player() {
    const router = useRouter();

    const width = useBreakpointValue(
        {
          sm: '100vw',
          md: '80vw',
          lg: '75vw',
        },
        {
          fallback: 'md',
        },
      )


    return (
        <center>
        <div style={{padding:"0px 20px",width:width}}> 
          {router.query.id && router.query.title && <>
          <Head>
            {router.query.title && <title>{router.query.title}</title> }
          </Head>
            <VidStackPlayer src={"https://seedr.torrentdev.workers.dev/download?id=" + router.query.id} title={router.query.title} />
          </>  }
        </div>
        </center>
    )
}
