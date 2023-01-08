import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ) {}




  async executeSeed() {

    await this.pokemonModel.deleteMany({}); // delete * from pokemons

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=1000');

    const pokemonToInsert: { name: string, no: number }[] = [];

    data.results.forEach(({ name, url }) => {

      const segments = url.split('/');
      const no = +segments[ segments.length - 2 ];

      pokemonToInsert.push({ name, no }); //[{ name: bulbasaur, no: 1}]

    });

    await this.pokemonModel.insertMany(pokemonToInsert);
    // insert into pokemons {name, no}
    // (name: bulbasaur, no: 1),
    // (name: charmander, no: 4)

    return "Seed Executed";
  }

}
