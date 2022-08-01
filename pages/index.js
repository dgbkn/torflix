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

    </div>

  )
}
