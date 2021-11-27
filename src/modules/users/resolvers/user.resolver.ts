import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/core/auth/graphql/current-user-decorator';
import { UserCreateInput } from '../models/input-types/user-create-input';
import { UserUpdateInput } from '../models/input-types/user-update-input';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Public } from 'src/core/auth/public-route-decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User, { name: 'user' })
  async getUser(@Args('id') id: string) {
    return this.userService.findById(id);
  }

  @Query(() => User, { nullable: true })
  async getCurrentUser(@CurrentUser() user) {
    return this.userService.findById(user.sub);
  }

  @Mutation(() => User)
  async createOrUpdateUser(
    @Args('input') input: UserUpdateInput,
  ): Promise<User> {
    console.log('input', input);
    const foundUser = await this.userService.findById(input._id);
    if (foundUser) return await this.userService.update(input);
    else {
      const createInput = {
        _id: input._id,
        name: input.name,
        email: input.email,
      };
      console.log('create', createInput);

      return await this.userService.create(createInput);
    }
  }

  @Public()
  @Mutation(() => User)
  async createUser(@Args('input') input: UserCreateInput): Promise<User> {
    return await this.userService.create(input);
  }

  @Public()
  @Mutation(() => User)
  async updateUser(@Args('input') input: UserUpdateInput): Promise<User> {
    return await this.userService.update(input);
  }

  // @ResolveField()
  // async posts(@Parent() author: Author) {
  //   const { id } = author;
  //   return this.postsService.findAll({ authorId: id });
  // }
}
