import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from './core/logger/logger.module';
import { UserModule } from './modules/users/user.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './core/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // Remove the ones that no longer needed after controller refactored
  imports: [
    GraphQLModule.forRoot({
      // debug: false,
      // playground: false,
      autoSchemaFile: true, //In the code first approach, you use decorators and TypeScript classes to generate the corresponding GraphQL schema.
      //autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule,
    UserModule,
    ProductsModule,
    AuthModule,
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
