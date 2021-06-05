import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreatePersonInput } from './input/create-person/create-person.input';
import { Person } from './model/person';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async create(payload: CreatePersonInput): Promise<Person> {
    const order = await this.personRepository.count();
    const person = plainToClass(Person, { ...payload, order });

    await this.personRepository.save(person);

    return person;
  }
}
