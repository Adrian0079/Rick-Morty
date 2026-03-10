export interface ApiInformation {  //Tipamos la información que nos devuelve la API
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharacterLocation {
  name: string;
  url: string;
}

export interface Character { //Este es el que toma la Card del personaje
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface CharacterApiResponse {
  info: ApiInformation;
  results: Character[];
}


