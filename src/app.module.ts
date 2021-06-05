import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [ConfigModule, QueueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
