import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './models/product.model';
import { ProductsResolver } from './resolvers/products.resolver';
import { ProductService } from './services/product.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ], // forFeature => which repositories are registered in the current scope
  providers: [ProductService, ProductsResolver],
  exports: [ProductService],
  //exports: [TypeOrmModule], // if need to use outside of this module
})
export class ProductsModule {}
