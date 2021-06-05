import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [ConfigModule, QueueModule, DatabaseModule, PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
