import SearchComponent from "../components/SearchComponent";
import Navbar from "../components/Navbar";
import Head from "next/head";
import { Button, Container, Stack } from "@chakra-ui/react";

export default function Home() {
  return (
    <div>
      <Head>
        <title>
          The Torflix
        </title>
      </Head>

      <SearchComponent />

<br/><br/><br/>
<center>
<a href="https://apkfab.com/mx-player-pro/com.mxtech.videoplayer.pro/apk?h=0ef4048b1ef9e836e0d0aa54446ba41a377b72d26a804f5fa5af6da4eae328a1">
<Button variant='outline' colorScheme='blue'>MX Player PRO APK</Button>
</a>
<br/>
<a href="https://apkfab.com/nplayer/com.newin.nplayer.pro/apk?h=8f5b73317363085f6c1b156a6dd9bc0eb5be07e580a295ed5333710bb862aae8">
<Button variant='outline' colorScheme='green'>N Player APK</Button>
</a>
</center>

    </div>

  )
}
