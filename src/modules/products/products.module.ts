import { Module } from '@nestjs/common';
import { ProductsResolver } from './resolvers/products.resolver';
import { ProductService } from './services/product.service';

@Module({
  imports: [], // forFeature => which repositories are registered in the current scope
  providers: [ProductService, ProductsResolver],
  exports: [ProductService],
  //exports: [TypeOrmModule], // if need to use outside of this module
})
export class ProductsModule {}
