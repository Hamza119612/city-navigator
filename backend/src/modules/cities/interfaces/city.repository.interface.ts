import { City } from '../../../database/entities/city.entity';

export abstract class CityRepositoryAbstract {
  abstract findAll(offset: number, limit: number, sort: 'asc' | 'desc'): Promise<City[]>;
  abstract findOne(id: number): Promise<City | null>;
  abstract search(query: string, offset: number, limit: number, sort: 'asc' | 'desc'): Promise<City[]>;
}
