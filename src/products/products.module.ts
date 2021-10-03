import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';

@Module({
  imports: [],
  providers: [ProductsResolver],
})
export class ProductsModule {}
