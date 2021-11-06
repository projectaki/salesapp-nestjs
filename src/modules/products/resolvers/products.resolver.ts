import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ProductCreateInput } from '../models/input-types/product-create-input';
import { ProductUpdateInput } from '../models/input-types/product-update-input';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

// In the code first method, a resolver class both defines resolver functions and generates the Query type.
@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productService: ProductService) {}

  // @Query(() => Product, { name: 'product' }) // param => supply a parent object used by field resolver functions as they traverse down through an object graph
  // async getProduct(@Args('id') id: string) {
  //   // args can be called multiple times, and seperated into a seperate file to avoid bloating
  //   return this.productService.find(id);
  // }

  // @Mutation(() => Product)
  // async createProduct(
  //   @Args('input') input: ProductCreateInput,
  // ): Promise<Product> {
  //   const prod = new Product();
  //   return await this.productService.create({ ...prod, ...input });
  // }

  // @Mutation(() => Product)
  // async updateProduct(
  //   @Args('input') input: ProductUpdateInput,
  // ): Promise<Product> {
  //   const prod = new Product();
  //   return await this.productService.update({ ...prod, ...input });
  // }

  // @ResolveField()
  // async posts(@Parent() author: Author) {
  //   const { id } = author;
  //   return this.postsService.findAll({ authorId: id });
  // }
}
