import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Product } from './models/product.model';
import { ProductService } from './services/product.service';

// In the code first method, a resolver class both defines resolver functions and generates the Query type.
@Resolver((of) => Product)
export class ProductsResolver {
  constructor(private productService: ProductService) {}

  @Query((returns) => Product, { name: 'product' }) // param => supply a parent object used by field resolver functions as they traverse down through an object graph
  async getProduct(@Args('id') id: string) {
    // args can be called multiple times, and seperated into a seperate file to avoid bloating
    return this.productService.findOne(id);
  }

  @Mutation((returns) => Product)
  async createProduct(
    @Args('name') name: string,
    @Args({ name: 'price', type: () => Int }) price: number,
  ): Promise<Product> {
    return await this.productService.create({
      id: null,
      name,
      price,
      created_at: null,
      updated_at: null,
    });
  }

  //   @ResolveField('children', (returns) => [{ name: string, productId: number }])
  //   async getChildren(@Parent() product: Product) {
  //     const { id } = product;
  //     return [{ name: 'temp', productId: id }];
  //   }
}
