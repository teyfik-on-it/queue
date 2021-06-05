import { Test, TestingModule } from '@nestjs/testing';
import { CreatePersonConsumer } from './create-person.consumer';

describe('CreatePersonConsumer', () => {
  let service: CreatePersonConsumer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatePersonConsumer],
    }).compile();

    service = module.get<CreatePersonConsumer>(CreatePersonConsumer);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
