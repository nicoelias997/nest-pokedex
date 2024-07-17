import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';


@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=800')

    data.results.forEach(( {name, url }) => {

      // Separa la url en segmentos con el separador /
      const segments = url.split('/');

      //Asigna el no, toma del segmento el valor del id de la url
      const no = +segments[ segments.length - 2];


      console.log(segments)
    })
    return data.results;
  }
}
