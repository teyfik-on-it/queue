import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const logger = new Logger('bootstrap');
const bootstrap = () =>
  NestFactory.create(AppModule).then((app) => {
    const configService = app.get(ConfigService);
    const port = configService.get('PORT');

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        forbidUnknownValues: true,
      }),
    );

    return app.listen(port);
  });

bootstrap().catch(logger.error);
