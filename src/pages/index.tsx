import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { SWAPIPeopleResponse } from "@/types";
import useSWR from "swr";
import { CharacterCard } from "@/components/CharacterCard/CharacterCard";

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
      <h1 className={styles.title}>SWAPI Cards</h1>
      <main className={styles.main}>
        <ul className={styles.characterGrid}>
          {data &&
            data.results.map((character) => (
              <li key={character.url}>
                <CharacterCard person={character} />
              </li>
            ))}
        </ul>
        {isLoading && <div>Loading...</div>}
      </main>
    </>
  );
}
