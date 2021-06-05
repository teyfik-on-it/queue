import { toDate } from './toDate';

describe('toDate', () => {
  const validDate = '2021-06-05T07:31:42.139Z';
  const invalidDate = 'lorem ipsum';

  it('should parse date', () => {
    const value = toDate(validDate);

    expect(value).toBeInstanceOf(Date);
  });

  it('should not parse date', () => {
    const value = toDate(invalidDate);

    expect(value).toBe(invalidDate);
  });
});
