// src/seed/seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from '../database/entities/city.entity';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);

  const cityRepository = appContext.get<Repository<City>>(getRepositoryToken(City));

  const filePath = path.join(__dirname, 'cities.json');

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const jsonData = JSON.parse(fileContent);

  if (!jsonData.cities || !Array.isArray(jsonData.cities)) {
    console.error('Invalid JSON format. Expected key "cities" with an array.');
    process.exit(1);
  }

  for (const cityData of jsonData.cities) {
    const city = cityRepository.create({
      name: cityData.name,
      nameNative: cityData.name_native,
      country: cityData.country,
      continent: cityData.continent,
      latitude: parseFloat(cityData.latitude),
      longitude: parseFloat(cityData.longitude),
      population: parseInt(cityData.population, 10),
      founded: parseInt(cityData.founded, 10),
      landmarks: cityData.landmarks,
    });
    await cityRepository.save(city);
  }

  console.log('Seeding completed.');
  await appContext.close();
}

bootstrap();
