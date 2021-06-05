import {
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { merge, Subject, throwError } from 'rxjs';
import { filter, first, pluck, switchMap } from 'rxjs/operators';
import { CreatePersonInput } from '../../input/create-person/create-person.input';
import { Person } from '../../model/person';
import { PersonService } from '../../person.service';

interface Failed {
  job: Job<CreatePersonInput>;
  error: unknown;
}

interface Completed {
  job: Job<CreatePersonInput>;
  result: Person;
}

@Processor('createPerson')
export class CreatePersonConsumer {
  private readonly failed = new Subject<Failed>();
  private readonly completed = new Subject<Completed>();

  constructor(private readonly personService: PersonService) {}

  @Process()
  async createPerson(job: Job<CreatePersonInput>): Promise<Person> {
    return this.personService.create(job.data);
  }

  async wait(job: Job<CreatePersonInput>): Promise<Person> {
    return merge(
      this.failed.pipe(
        filter((failed) => job.id === failed.job.id),
        switchMap((failed) => throwError(failed.error)),
      ),
      this.completed.pipe(
        filter((completed) => job.id === completed.job.id),
        pluck('result'),
      ),
    )
      .pipe(first())
      .toPromise();
  }

  @OnQueueFailed()
  private onQueueFailed(job: Job<CreatePersonInput>, error: unknown): void {
    this.failed.next({ job, error });
  }

  @OnQueueCompleted()
  private onQueueCompleted(job: Job<CreatePersonInput>, result: Person): void {
    this.completed.next({ job, result });
  }
}
