import { SWAPIPerson } from "@/types";
import styles from "./CharacterCard.module.css";

interface CharacterCardProps {
  person: SWAPIPerson;
}

export const CharacterCard = ({ person }: CharacterCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{person.name}</div>
      <dl className={styles.details}>
        <dt>Height</dt>
        {/* TODO: convert height */}
        <dd>{person.height}</dd>
        <dt>Mass</dt>
        <dd>{person.mass}</dd>
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
