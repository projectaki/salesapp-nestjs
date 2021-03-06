import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Public } from 'src/core/auth/public-route-decorator';
import { ProductCreateInput } from '../models/input-types/product-create-input';
import { ProductUpdateInput } from '../models/input-types/product-update-input';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

// In the code first method, a resolver class both defines resolver functions and generates the Query type.
@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productService: ProductService) {}

  @Query(() => Product, { name: 'product' }) // param => supply a parent object used by field resolver functions as they traverse down through an object graph
  async getProduct(@Args('id') id: string) {
    // args can be called multiple times, and seperated into a seperate file to avoid bloating
    return await this.productService.findById(id);
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('input') input: ProductCreateInput,
  ): Promise<Product> {
    return await this.productService.create(input);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('input') input: ProductUpdateInput,
  ): Promise<Product> {
    return await this.productService.update(input);
  }

  // @ResolveField()
  // async posts(@Parent() author: Author) {
  //   const { id } = author;
  //   return this.postsService.findAll({ authorId: id });
  // }
}
