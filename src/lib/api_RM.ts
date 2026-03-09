import type { 
    Character, //Personaje individual
    CharacterApiResponse  //Respuesa completa al pedir 1 pagina de personajes
} from "../interfaces/rick-and-morty"; //importamos los tipos no los valores reales

const urlApi = 'https://rickandmortyapi.com/api'; 

export async function getCharacters(page: number = 1): Promise<CharacterApiResponse> { 
    const response = await fetch(`${urlApi}/character?page=${page}`); //Hacemos la petición a la API con el número de página
    
    if (!response.ok){
        throw new Error('No se pudo obtener la lista de personajes'); //Si la respuesta no es ok, lanzamos un error
    }
    return response.json(); //Si la respuesta es ok, devolvemos el resultado en formato JSON, que será de tipo CharacterApiResponse
}//Funcion asincrona que devuelve una promesa de tipo CharacterApiResponse

export async function getAllCh(): Promise<Character[]> { //Función para obtener todos los personajes, devuelve una promesa de un array de personajes        
    const theFirstPage = await getCharacters(1); //Obtenemos la primera página de personajes para saber cuántas páginas hay en total
    const theTotalPages = theFirstPage.info.pages; //Obtenemos el número total de páginas a partir de la primera página

    const theRestPages = await Promise.all( //Usamos Promise.all para hacer las peticiones de las páginas restantes en paralelo
        Array.from({ length: theTotalPages - 1 }, (_, index) => getCharacters(index + 2)) //Creamos un array con la cantidad de páginas restantes y hacemos una petición para cada una, empezando desde la página 2
    );

    const allCharacters: Character[] = [...theFirstPage.results]; //Empezamos con los personajes de la primera página

    for (const pageDataComplete of theRestPages){
        allCharacters.push(...pageDataComplete.results); //Agregamos los personajes de cada página al array total
    }
    return allCharacters; //Devolvemos el array completo de personajes
}