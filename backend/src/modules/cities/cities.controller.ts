import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { City } from '../../database/entities/city.entity';
import { SearchCitiesDto } from './dtos/search-cities.dto';
import { PaginationDto } from './dtos/pagination.dto';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get('search')
  async searchCities(
    @Query('q') query: string,
    @Query() paginationDto: PaginationDto,
  ): Promise<City[]> {
    return await this.citiesService.search(query, paginationDto);
  }

  @Get()
  async getAllCities(@Query() paginationDto: PaginationDto): Promise<City[]> {
    return await this.citiesService.findAll(paginationDto);
  }

  @Get(':id')
  async getCityById(@Param('id', ParseIntPipe) id: number): Promise<City> {
    return await this.citiesService.findOne(id);
  }

  
}
