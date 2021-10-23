import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from './core/logger/logger.module';
import { UserModule } from './modules/users/user.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  // Remove the ones that no longer needed after controller refactored
  imports: [
    GraphQLModule.forRoot({
      // debug: false,
      // playground: false,
      autoSchemaFile: true, //In the code first approach, you use decorators and TypeScript classes to generate the corresponding GraphQL schema.
      //autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: +configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRoot(),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule,
    UserModule,
    ProductsModule,
  ],
  providers: [
    // Below is IOC container in NestJS
    // {
    //   provide: Interface,
    //   useClass: Implementation,
    // },
  ],
})
export class AppModule {}
