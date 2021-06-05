export const toDate = <T = unknown>(input: T): T | Date => {
  if ('string' === typeof input) {
    const date = new Date(input);

    if (date.getTime() > 0) {
      return date;
    }
  }

  return input;
};
