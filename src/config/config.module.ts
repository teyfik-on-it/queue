import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        PORT: Joi.number().port().required(),
        STORE_HOST: Joi.string().hostname().required(),
        STORE_PORT: Joi.number().port().required(),
      }),
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
