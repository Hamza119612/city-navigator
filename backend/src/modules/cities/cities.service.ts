import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { City } from '../../database/entities/city.entity';
import { Logger } from '../../common/logger';
import { PaginationDto } from './dtos/pagination.dto';
import { ICityRepository } from './interfaces/city.repository.interface';

@Injectable()
export class CitiesService {
  constructor(
    private readonly cityRepository: ICityRepository
  ) {}

  async findAll(paginationDto: PaginationDto): Promise<City[]> {
    const { offset = 0, limit = 10, sort = 'asc' } = paginationDto;
    return this.cityRepository.findAll(offset, limit, sort);
  }

  async findOne(id: number): Promise<City> {
    const city = await this.cityRepository.findOne(id);
    if (!city) {
      throw new NotFoundException(`City with id ${id} not found`);
    }
    return city;
  }

  async search(query: string, paginationDto: PaginationDto): Promise<City[]> {
    const { offset, limit, sort } = paginationDto;
    return this.cityRepository.search(query, offset, limit, sort);
  }
}
