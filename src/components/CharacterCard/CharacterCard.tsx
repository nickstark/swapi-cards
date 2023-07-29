import { SWAPIPerson } from "@/types";
import styles from "./CharacterCard.module.css";
import { useMemo } from "react";

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
      </div>
    </div>
  );
};
