import { IsDate, IsString } from 'class-validator';
import { ToDate } from '../../../decorator/transformer/to-date';
import { Person } from '../../model/person';

export class CreatePersonInput implements Omit<Person, 'id' | 'order'> {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDate()
  @ToDate()
  birthDate: Date;
}
