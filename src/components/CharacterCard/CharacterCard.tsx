import { SWAPIPerson } from "@/types";
import styles from "./CharacterCard.module.scss";
import { useMemo } from "react";
import { spec } from "node:test/reporters";

// TODO: add tests for all requirements

interface CharacterCardProps {
  person: SWAPIPerson;
}

const CM_IN_METER = 100;
const convertCmToM = (centimeters: number) =>
  (centimeters / CM_IN_METER).toFixed(2);

const formatCardDate = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return "unknown";
  }
  return `${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
    .getDate()
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;
};

export const CharacterCard = ({ person }: CharacterCardProps) => {
  const heightInMeters = isNaN(+person.height)
    ? person.height // account for "unknown"
    : `${convertCmToM(+person.height)}m`;
  const massInKg = isNaN(+person.mass) ? person.mass : `${person.mass}kg`;
  const formattedDateAdded = useMemo(
    () => formatCardDate(person.created),
    [person.created]
  );

  // Assumption: indicate species based on first
  const speciesIds = person.species.length
    ? person.species.map((speciesUrl) =>
        speciesUrl
          .replace("https://swapi.dev/api/species/", "")
          .replace("/", "")
      )
    : ["1"]; // NOTE: there seems to be a bug in SWAPI where humans are being reported with no species, patching manually until a fix is found

  //TODO: make card details visible on focus for users without cursors

  return (
    <div className={styles.card}>
      <div className={styles.title}>{person.name}</div>
      <div className={styles.details}>
        <dl className={styles.detailsData}>
          <dt>Height</dt>
          <dd>{heightInMeters}</dd>
          <dt>Mass</dt>
          <dd>{massInKg}</dd>
          <dt>Date Added</dt>
          <dd>{formattedDateAdded}</dd>
          <dt>Film Appearances</dt>
          <dd>{person.films.length}</dd>
          <dt>Birth Year</dt>
          <dd>{person.birth_year}</dd>
        </dl>
        <div className={styles.speciesIndicators}>
          {/* ENHANCEMENT: load species names from API */}
          {speciesIds.map((id) => (
            <div
              key={id}
              data-species={id}
              className={styles.speciesIndicator}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
