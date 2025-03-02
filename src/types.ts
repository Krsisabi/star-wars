// One page of a SWAPI list, with the size of the whole list.
export type Page<T> = {
  count: number;
  results: T[];
};

export type Character = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

export type CharacterNormalized = Character & {
  id: number;
};
