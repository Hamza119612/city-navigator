import { City } from '../../../database/entities/city.entity';

export interface ICityRepository {
  findAll(offset: number, limit: number, sort: 'asc' | 'desc'): Promise<City[]>;
  findOne(id: number): Promise<City | null>;
  search(query: string, offset: number, limit: number, sort: 'asc' | 'desc'): Promise<City[]>;
}
