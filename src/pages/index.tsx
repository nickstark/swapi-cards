import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { SWAPIPeopleResponse } from "@/types";
import useSWR from "swr";
import { CharacterCard } from "@/components/CharacterCard/CharacterCard";

//
const getCharacters = (endpoint: string): Promise<SWAPIPeopleResponse> =>
  fetch(endpoint).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR(
    "https://swapi.dev/api/people/",
    getCharacters
  );

  //TODO: loading state
  //TODO: error state

  return (
    <>
      <Head>
        <title>SWAPI Cards</title>
        <meta
          name="description"
          content="Card viewer for your favorite Star Wars characters"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {isLoading && <div>Loading...</div>}
        {data &&
          data.results.map((character) => (
            <CharacterCard key={character.url} person={character} />
          ))}
      </main>
    </>
  );
}
