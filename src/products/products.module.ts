import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './models/product.model';
import { ProductsResolver } from './products.resolver';
import { ProductService } from './services/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // forFeature => which repositories are registered in the current scope
  providers: [ProductService, ProductsResolver],
  exports: [ProductService],
  //exports: [TypeOrmModule], // if need to use outside of this module
})
export class ProductsModule {}
