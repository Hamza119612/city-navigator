import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { City } from '../../../database/entities/city.entity';
import { CityRepositoryAbstract } from '../interfaces/city.repository.interface';

@Injectable()
export class CityRepository extends CityRepositoryAbstract {
  constructor(
    @InjectRepository(City)
    private readonly repository: Repository<City>,
  ) {
    super();
  }

  async findAll(offset: number, limit: number, sort: 'asc' | 'desc'): Promise<{ cities: City[]; total: number }> {
    // Get the paginated data
    const cities = await this.repository.find({
      skip: offset,
      take: limit,
      order: { id: sort },
    });
    
    const total = await this.repository.count();
    
    return { cities, total };
  }
  
  async findOne(id: number): Promise<City | null> {
    return this.repository.findOneBy({ id });
  }



  async search(query: string, offset: number, limit: number, sort: 'ASC' | 'DESC'): Promise<{ cities: City[]; total: number }> {
  
    const searchQuery = this.repository.createQueryBuilder('city')
      .where('city.name ILIKE :query OR city.country ILIKE :query', { query: `%${query}%` })
      .skip(offset)
      .take(limit)
      .orderBy('city.name', sort); 
  
    const [cities, total] = await searchQuery.getManyAndCount();
    return { cities, total };
  }
  
  
}
