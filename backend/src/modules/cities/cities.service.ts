import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { City } from '../../database/entities/city.entity';
import { Logger } from '../../common/logger';
import { PaginationDto } from './dtos/pagination.dto';
import { CityRepositoryAbstract } from './interfaces/city.repository.interface';

@Injectable()
export class CitiesService {
  constructor(
    @Inject(CityRepositoryAbstract) 
    private readonly cityRepository: CityRepositoryAbstract,
  ) {}

  async findAll(paginationDto: PaginationDto): Promise<{ cities: City[]; total: number }> {
    const { offset, limit, sort } = paginationDto;
    Logger.log(`Fetching all cities with offset=${offset}, limit=${limit}, sort=${sort}`);
  
    return this.cityRepository.findAll(offset, limit, sort);
  }
  

  async findOne(id: number): Promise<City> {
    const city = await this.cityRepository.findOne(id);
    if (!city) {
      Logger.warn(`City with id=${id} not found`);
      throw new NotFoundException(`City with id ${id} not found`);
      
    }
    return city;
  }

  async search(query: string, paginationDto: PaginationDto): Promise<{ cities: City[]; total: number }> {
    console.log("🚀 ~ CitiesService ~ search ~ query:", query)
    const { offset, limit, sort } = paginationDto;
    Logger.log(`Searching for cities with query="${query}", offset=${offset}, limit=${limit}, sort=${sort}`);
    return this.cityRepository.search(query, offset, limit, sort);
  }
}
