import { SWAPIPerson } from "@/types";

interface CharacterCardProps {
  person: SWAPIPerson;
}

export const CharacterCard = ({ person }: CharacterCardProps) => {
  return <div>{person.name}</div>;
};
