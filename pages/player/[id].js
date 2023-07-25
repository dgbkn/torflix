import { useRouter } from "next/router";
import VidStackPlayer from "./vidstackplayer";

export default function Player() {
    const router = useRouter();

    return (
        <div style={{padding:"0px 20px"}}> 
          {router.query.id && <VidStackPlayer src={"https://seedr.torrentdev.workers.dev/downloadProxy?id=" + router.query.id} /> }
        </div>
    )
}
