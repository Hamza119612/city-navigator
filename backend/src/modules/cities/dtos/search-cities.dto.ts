import { IsString, IsNotEmpty } from 'class-validator';

export class SearchCitiesDto {
  @IsString()
  @IsNotEmpty()
  query: string;
}
