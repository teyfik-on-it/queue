import faker from 'faker';
import request from 'supertest';
import { CreatePersonInput } from '../src/person/input/create-person/create-person.input';

function fake(): CreatePersonInput;
function fake(length: number): CreatePersonInput[];
function fake(length?: number): CreatePersonInput | CreatePersonInput[] {
  return length > 0
    ? Array.from({ length }).map(() => fake())
    : {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        birthDate: faker.date.between(
          new Date(1980, 0, 1),
          new Date(2000, 11, 31),
        ),
      };
}

describe('POST /person', () => {
  it('should not fall into race condition', async () => {
    jest.setTimeout(60000);

    const count = 1000;
    const client = request('localhost:8080');
    const people = fake(count);
    const orders = await Promise.all(
      people.map((person) => {
        return client
          .post('/person')
          .send(person)
          .expect(201)
          .then((response) => response.body.order);
      }),
    );
    const unique = orders.filter((e, i, a) => i === a.indexOf(e));

    expect(unique.length).toBe(count);
  });
});
