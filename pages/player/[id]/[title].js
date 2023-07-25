import { useRouter } from "next/router";
import VidStackPlayer from "../vidstackplayer";
import Head from "next/head";

export default function Player() {
    const router = useRouter();

    return (
        <center>
        <div style={{padding:"0px 20px",width:"60vw"}}> 
          {router.query.id && router.query.title && <>
          <Head>
            {router.query.title && <title>{router.query.title}</title> }
          </Head>
            <VidStackPlayer src={"https://seedr.torrentdev.workers.dev/downloadProxy?id=" + router.query.id} title={router.query.title} />
          </>  }
        </div>
        </center>
    )
}
