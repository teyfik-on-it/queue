import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatePersonConsumer } from './consumer/create-person/create-person.consumer';
import { Person } from './model/person';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'createPerson',
    }),
    TypeOrmModule.forFeature([Person]),
  ],
  controllers: [PersonController],
  providers: [PersonService, CreatePersonConsumer],
})
export class PersonModule {}
