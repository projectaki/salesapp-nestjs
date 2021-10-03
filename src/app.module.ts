import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ProductsModule,
    GraphQLModule.forRoot({
      // debug: false,
      // playground: false,
      autoSchemaFile: true, //In the code first approach, you use decorators and TypeScript classes to generate the corresponding GraphQL schema.
      //autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Below is IOC container in NestJS
    // {
    //   provide: Interface,
    //   useClass: Implementation,
    // },
  ],
})
export class AppModule {}
