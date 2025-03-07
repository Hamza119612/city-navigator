import {  IsInt, Min, IsIn, IsString, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsDefined({ message: 'Offset is required' })
  @Type(() => Number)
  @IsInt({ message: 'Offset must be an integer' })
  @Min(0, { message: 'Offset cannot be negative' })
  offset: number;

  @IsDefined({ message: 'Limit is required' })
  @Type(() => Number)
  @IsInt({ message: 'Limit must be an integer' })
  @Min(1, { message: 'Limit must be at least 1' })
  limit: number;

  @IsDefined({ message: 'Sort order is required' })
  @IsString({ message: 'Sort must be a string' })
  @IsIn(['asc', 'desc'], { message: 'Sort must be either "asc" or "desc"' })
  sort: 'asc' | 'desc';
}
