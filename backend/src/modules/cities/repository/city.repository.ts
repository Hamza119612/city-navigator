// src/modules/cities/city.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { City } from '../../../database/entities/city.entity';
import { ICityRepository } from '../interfaces/city.repository.interface';

@Injectable()
export class CityRepository implements ICityRepository {
  constructor(
    @InjectRepository(City)
    private readonly repository: Repository<City>,
  ) {}

  async findAll(offset: number, limit: number, sort: 'asc' | 'desc'): Promise<City[]> {
    return this.repository.find({
      skip: offset,
      take: limit,
      order: { name: sort },
    });
  }

  async findOne(id: number): Promise<City | null> {
    return this.repository.findOneBy({ id });
  }

  async search(query: string, offset: number, limit: number, sort: 'asc' | 'desc'): Promise<City[]> {
    return this.repository.find({
      where: [
        { name: ILike(`%${query}%`) },
        { country: ILike(`%${query}%`) },
      ],
      skip: offset,
      take: limit,
      order: { name: sort },
    });
  }
}
