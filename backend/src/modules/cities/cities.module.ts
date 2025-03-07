import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { City } from 'src/database/entities/city.entity';
import { CityRepository } from './repository/city.repository';
import { CityRepositoryAbstract } from './interfaces/city.repository.interface';

@Module({
    imports: [TypeOrmModule.forFeature([City])],
    controllers: [CitiesController],
    providers: [
        CitiesService,
        {
            provide: CityRepositoryAbstract, 
            useClass: CityRepository,
          },
      ],  
})
export class CitiesModule {}
