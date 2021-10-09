import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseScrapersService } from './scrapers/base-scrapers.service';
import { ScrapersModule } from './scrapers/scrapers.module';
import { SharedModule } from './shared/shared.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskSchedulerModule } from './task-scheduler/task-scheduler.module';

import { BullModule } from '@nestjs/bull';
import { QueueProcessorService } from './queue-processor/queue-processor.service';
import { join } from 'path';
import { QueueProcessorModule } from './queue-processor/queue-processor.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ProductsModule,
    ScrapersModule,
    QueueProcessorModule,
    TaskSchedulerModule,

    GraphQLModule.forRoot({
      // debug: false,
      // playground: false,
      autoSchemaFile: true, //In the code first approach, you use decorators and TypeScript classes to generate the corresponding GraphQL schema.
      //autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),

    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    TypeOrmModule.forRoot(),
    ScheduleModule.forRoot(),
    SharedModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [
    // Below is IOC container in NestJS
    // {
    //   provide: Interface,
    //   useClass: Implementation,
    // },
  ],
})
export class AppModule {}
