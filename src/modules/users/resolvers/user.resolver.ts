import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/core/auth/graphql/current-user-decorator';
import { GqlAuthGuard } from 'src/core/auth/graphql/gql-auth-guard';
import { Public } from 'src/core/auth/public-route-decorator';
import { UserCreateInput } from '../models/input-types/user-create-input';
import { UserUpdateInput } from '../models/input-types/user-update-input';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User, { name: 'user' })
  async getUser(@Args('id') id: string) {
    return this.userService.find(id);
  }

  @Query(() => User)
  async getCurrentUser(@CurrentUser() user: User) {
    //return this.userService.findByParams({ authId: user.authId });
    const mockUser = {
      name: 'Akos',
      email: 'temp@email.com',
    };
    return { ...new User(), ...mockUser };
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: UserCreateInput): Promise<User> {
    const user = new User();
    return await this.userService.create({ ...user, ...input });
  }

  @Mutation(() => User)
  async updateUser(@Args('input') input: UserUpdateInput): Promise<User> {
    const existingUser = await this.userService.findByParams({
      authId: input.authId,
    });
    return await this.userService.update({ ...existingUser, ...input });
  }

  // @ResolveField()
  // async posts(@Parent() author: Author) {
  //   const { id } = author;
  //   return this.postsService.findAll({ authorId: id });
  // }
}
