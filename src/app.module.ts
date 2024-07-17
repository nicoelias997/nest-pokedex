import { join } from 'path'; // en Node
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'), 
    }),

    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    // mongodb+srv://root:J5RgAx0jmYwKDoTN@pokedex.p6gbggl.mongodb.net/

    PokemonModule,

    CommonModule,

    SeedModule,

  ],
})
export class AppModule {}
