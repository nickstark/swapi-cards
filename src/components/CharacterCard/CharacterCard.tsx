import { SWAPIPerson } from "@/types";
import styles from "./CharacterCard.module.css";

interface CharacterCardProps {
  person: SWAPIPerson;
}

const CM_IN_METER = 100;
const convertCmToM = (centimeters: number) =>
  (centimeters / CM_IN_METER).toFixed(2);

export const CharacterCard = ({ person }: CharacterCardProps) => {
  const heightInMeters = isNaN(+person.height)
    ? person.height // account for "unknown"
    : `${convertCmToM(+person.height)} meters`;
  const massInKg = isNaN(+person.mass) ? person.mass : `${person.mass} kg`;
  return (
    <div className={styles.card}>
      <div className={styles.title}>{person.name}</div>
      <dl className={styles.details}>
        <dt>Height</dt>
        <dd>{heightInMeters}</dd>
        <dt>Mass</dt>
        <dd>{massInKg}</dd>
        <dt>Date Added</dt>
        {/* TODO: reformat date */}
        <dd>{person.created}</dd>
        <dt>Film Appearances</dt>
        <dd>{person.films.length}</dd>
        <dt>Birth Year</dt>
        <dd>{person.birth_year}</dd>
      </dl>
    </div>
  );
};
