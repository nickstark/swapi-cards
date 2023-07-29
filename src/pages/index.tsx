import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { SWAPIPeopleResponse } from "@/types";
import useSWR from "swr";
import { CharacterCard } from "@/components/CharacterCard/CharacterCard";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";

const getCharacters = (endpoint: string): Promise<SWAPIPeopleResponse> =>
  fetch(endpoint).then((res) => res.json());

const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.next) return null;
  console.log("prev page data", previousPageData, pageIndex);
  return previousPageData
    ? previousPageData.next
    : "https://swapi.dev/api/people/";
};

export default function Home() {
  const { data, error, isLoading, isValidating, size, setSize } =
    useSWRInfinite(getKey, getCharacters, { revalidateFirstPage: false });
  // TODO: add prefetching of next page or infinite scrolling

  const hasMoreToLoad =
    !data || (data.length > 0 && data[data.length - 1].next !== null);
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

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
        <link
          rel="preload"
          href="https://swapi.dev/api/people/"
          as="fetch"
          crossOrigin="anonymous"
        ></link>
      </Head>
      <h1 className={styles.title}>SWAPI Cards</h1>
      <main className={styles.main}>
        <ul className={styles.characterGrid}>
          {data &&
            !error &&
            data.map((dataPage) => {
              return dataPage.results.map((character) => (
                <li key={character.url}>
                  <CharacterCard person={character} />
                </li>
              ));
            })}
        </ul>
        {isLoadingMore && <div className={styles.loading}>Loading...</div>}
        {hasMoreToLoad && !error && (
          <div className={styles.btnBar}>
            <button
              type="button"
              disabled={isLoadingMore} // TODO: do this is a more accessibly way
              className={styles.btn}
              onClick={() => setSize(size + 1)}
            >
              Load more characters
            </button>
          </div>
        )}
        {error && <div>There was an error loading SWAPI data.</div>}
      </main>
    </>
  );
}
