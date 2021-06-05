import { plainToClass } from 'class-transformer';
import { ToDate } from './to-date';

describe('ToDate', () => {
  const validDate = '2021-06-05T07:31:42.139Z';
  const invalidDate = 'lorem ipsum';

  it('should transform date', () => {
    class Dummy {
      @ToDate()
      validDate: Date;
    }

    const dummy = plainToClass(Dummy, { validDate });

    expect(dummy.validDate).toBeInstanceOf(Date);
  });

  it('should not transform date', () => {
    class Dummy {
      @ToDate()
      invalidDate: Date;
    }

    const dummy = plainToClass(Dummy, { invalidDate });

    expect(dummy.invalidDate).toBe(invalidDate);
  });
});
