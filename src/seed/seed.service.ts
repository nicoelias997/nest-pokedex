import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';


@Injectable()
export class SeedService {

  // // TODO:  Esto hice yo. Demora: 1.29ms
  // constructor(
  //   private readonly pokemonService: PokemonService
  // ){}

  // private readonly axios: AxiosInstance = axios;

  // async executeSeed() {

  //   const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=800')

  //    data.results.forEach(async ( {name, url }) => {
  //     // Separa la url en segmentos con el separador /
  //     const segments = url.split('/');
  //     //Asigna el no, toma del segmento el valor del id de la url
  //     const no = +segments[ segments.length - 2];
  //     // Llama al servicio de pokemon para crear el pokemon
  //     try {
  //       const pokemon = await this.pokemonService.create({name, no});
  //       return pokemon;
  //     } catch (e) {
  //       this.pokemonService.handleExceptions( e );
  //     }
  //   })
  //   return data.results;
  // }

  // TODO: Asi lo hizo el profe
  constructor(
    @InjectModel( Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}
  private readonly axios: AxiosInstance = axios;

  // TODO: Demora mucho, ya que va promesa por promesa: 778ms
  

  // async executeSeed() {

  //   await this.pokemonModel.deleteMany({})

  //   const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=800')

  //    data.results.forEach(async ( {name, url }) => {
  //     // Separa la url en segmentos con el separador /
  //     const segments = url.split('/');
  //     //Asigna el no, toma del segmento el valor del id de la url
  //     const no = +segments[ segments.length - 2];
  //     // Llama al servicio de pokemon para crear el pokemon
  //       const pokemon = await this.pokemonModel.create({name, no});
  //   })
  //   return 'Seed executed succesfully';
  // }


//  // TODO: 1º Forma rapida: 541ms
//   async executeSeed() {

//     await this.pokemonModel.deleteMany({})

//     const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=800')

//     const insertPromisesArray = [];
    
//      data.results.forEach(( {name, url }) => {
//       // Separa la url en segmentos con el separador /
//       const segments = url.split('/');
//       //Asigna el no, toma del segmento el valor del id de la url
//       const no = +segments[ segments.length - 2];
//       // Llama al servicio de pokemon para crear el pokemon
//         // const pokemon = this.pokemonModel.create({name, no});
//         insertPromisesArray.push(
//           this.pokemonModel.create({ name, no })
//         );
//     })
//     const newArray = await Promise.all( insertPromisesArray )

//     return 'Seed executed succesfully';
//   }

 // TODO: 2º Forma rapida y definitiva: 470ms
 async executeSeed() {

  await this.pokemonModel.deleteMany({})

  const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=800')

  const pokemonToInsert: { name: string, no: number }[] = [];
  
   data.results.forEach(( {name, url }) => {
    // Separa la url en segmentos con el separador /
    const segments = url.split('/');
    //Asigna el no, toma del segmento el valor del id de la url
    const no = +segments[ segments.length - 2];
    // Llama al servicio de pokemon para crear el pokemon
      // const pokemon = this.pokemonModel.create({name, no});
      pokemonToInsert.push({ name, no });
  })
  await this.pokemonModel.insertMany( pokemonToInsert )

  return 'Seed executed succesfully';
}
}
