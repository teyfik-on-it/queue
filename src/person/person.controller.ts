import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { CreatePersonConsumer } from './consumer/create-person/create-person.consumer';
import { CreatePersonInput } from './input/create-person/create-person.input';
import { Person } from './model/person';

@Controller('person')
export class PersonController {
  constructor(
    @InjectQueue('createPerson')
    private readonly createPersonQueue: Queue<CreatePersonInput>,
    private readonly createPersonConsumer: CreatePersonConsumer,
  ) {}

  @Post()
  async createPerson(@Body() payload: CreatePersonInput): Promise<Person> {
    return this.createPersonQueue
      .add(payload)
      .then((job) => this.createPersonConsumer.wait(job));
  }
}
