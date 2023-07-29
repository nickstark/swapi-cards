interface SWAPIPaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface SWAPIPerson {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  films: string[];
  species: string[];
  created: string;
  url: string;
}

export type SWAPIPeopleResponse = SWAPIPaginatedResponse<SWAPIPerson>;
