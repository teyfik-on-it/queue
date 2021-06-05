import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('STORE_HOST'),
          port: configService.get('STORE_PORT'),
        },
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
