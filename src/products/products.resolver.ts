import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Product } from './models/product.model';

// In the code first method, a resolver class both defines resolver functions and generates the Query type.
@Resolver((of) => Product)
export class ProductsResolver {
  // constructor() {}

  @Query((returns) => Product, { name: 'product' }) // param => supply a parent object used by field resolver functions as they traverse down through an object graph
  async getProduct(@Args('id') id: string) {
    // args can be called multiple times, and seperated into a seperate file to avoid bloating
    return { id, name: 'TV', price: 5000 } as Product;
  }

  //   @ResolveField('children', (returns) => [{ name: string, productId: number }])
  //   async getChildren(@Parent() product: Product) {
  //     const { id } = product;
  //     return [{ name: 'temp', productId: id }];
  //   }
}
