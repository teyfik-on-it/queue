import { Transform, TransformOptions } from 'class-transformer';
import { toDate } from '../../helper/toDate/toDate';

export const ToDate = (options?: TransformOptions) =>
  Transform(({ value }) => toDate(value), options);
