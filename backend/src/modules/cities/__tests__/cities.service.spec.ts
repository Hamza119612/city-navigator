import { Test, TestingModule } from '@nestjs/testing';
import { CitiesService } from '../cities.service';
import { CityRepositoryAbstract } from '../interfaces/city.repository.interface';
import { NotFoundException } from '@nestjs/common';
import { City } from '../../../database/entities/city.entity';
import { PaginationDto } from '../dtos/pagination.dto';

describe('CitiesService', () => {
  let citiesService: CitiesService;
  let cityRepository: jest.Mocked<CityRepositoryAbstract>;

  const mockCity: City = {
    id: 1,
    name: 'Berlin',
    nameNative: 'Berlin',
    country: 'Germany',
    population: 3669495,
    founded: 1237,
    landmarks: ['Brandenburg Gate'],
    continent: 'Europe',
    latitude: 52.52,
    longitude: 13.405,
  };

  beforeEach(async () => {
    const cityRepositoryMock: Partial<CityRepositoryAbstract> = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      search: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CitiesService,
        { provide: CityRepositoryAbstract, useValue: cityRepositoryMock },
      ],
    }).compile();

    citiesService = module.get<CitiesService>(CitiesService);
    cityRepository = module.get(CityRepositoryAbstract) as jest.Mocked<CityRepositoryAbstract>;
  });

  it('should be defined', () => {
    expect(citiesService).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return a list of cities', async () => {
      const mockCities = {
        cities: [mockCity],
        total: 1
      };

      cityRepository.findAll.mockResolvedValue(mockCities);

      const pagination: PaginationDto = { offset: 0, limit: 10, sort: 'asc' };
      const result = await citiesService.findAll(pagination);

      expect(result).toEqual(mockCities);
      expect(cityRepository.findAll).toHaveBeenCalledWith(0, 10, 'asc');
      expect(cityRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne()', () => {
    it('should return a city by ID', async () => {
      cityRepository.findOne.mockResolvedValue(mockCity);

      const result = await citiesService.findOne(1);

      expect(result).toEqual(mockCity);
      expect(cityRepository.findOne).toHaveBeenCalledWith(1);
      expect(cityRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if city not found', async () => {
      cityRepository.findOne.mockResolvedValue(null);

      await expect(citiesService.findOne(1)).rejects.toThrow(NotFoundException);
      expect(cityRepository.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('search()', () => {
    it('should return cities matching a search query', async () => {
      const mockSearchResult = {
        cities: [mockCity],
        total: 1
      };

      cityRepository.search.mockResolvedValue(mockSearchResult);

      const pagination: PaginationDto = { offset: 0, limit: 10, sort: 'asc' };
      const result = await citiesService.search('Berlin', pagination);

      expect(result).toEqual(mockSearchResult);
      expect(cityRepository.search).toHaveBeenCalledWith('Berlin', 0, 10, 'asc');
      expect(cityRepository.search).toHaveBeenCalledTimes(1);
    });

    it('should return empty result if no cities match', async () => {
      const emptyResult = { cities: [], total: 0 };
      cityRepository.search.mockResolvedValue(emptyResult);

      const pagination: PaginationDto = { offset: 0, limit: 10, sort: 'asc' };
      const result = await citiesService.search('Unknown', pagination);

      expect(result).toEqual(emptyResult);
      expect(cityRepository.search).toHaveBeenCalledWith('Unknown', 0, 10, 'asc');
      expect(cityRepository.search).toHaveBeenCalledTimes(1);
    });
  });
});