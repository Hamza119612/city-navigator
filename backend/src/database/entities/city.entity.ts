import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'name_native' })
  nameNative: string;

  @Column()
  country: string;

  @Column()
  continent: string;

  @Column('decimal', { precision: 10, scale: 6 })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 6 })
  longitude: number;

  @Column('int')
  population: number;

  @Column('int')
  founded: number;

  @Column('simple-array')
  landmarks: string[];
}
