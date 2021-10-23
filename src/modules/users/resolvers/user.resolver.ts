import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User, { name: 'user' })
  async getUser(@Args('id') id: string) {
    return this.userService.find(id);
  }

  //   @Mutation((returns) => User)
  //   async createProduct(
  //     @Args('input') input: ,
  //   ): Promise<User> {
  //     const prod = new Product();
  //     return await this.userService.create({ ...prod, ...input });
  //   }

  //   @Mutation((returns) => User)
  //   async updateProduct(
  //     @Args('input') input: ,
  //   ): Promise<User> {
  //     const prod = new Product();
  //     return await this.userService.update({ ...prod, ...input });
  //   }

  // @ResolveField()
  // async posts(@Parent() author: Author) {
  //   const { id } = author;
  //   return this.postsService.findAll({ authorId: id });
  // }
}
