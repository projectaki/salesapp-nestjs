import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ManagementApiService } from 'src/core/auth/auth0-management-api/management-api.service';
import { CurrentUser } from 'src/core/auth/graphql/current-user-decorator';
import { GqlAuthGuard } from 'src/core/auth/graphql/gql-auth-guard';
import { Public } from 'src/core/auth/public-route-decorator';
import { UserCreateInput } from '../models/input-types/user-create-input';
import { UserUpdateInput } from '../models/input-types/user-update-input';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { UserMetaDataInput } from '../models/input-types/user-metadata';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private mgtApi: ManagementApiService,
  ) {}

  @Query(() => User, { name: 'user' })
  async getUser(@Args('id') id: string) {
    return this.userService.find(id);
  }

  @Query(() => User, { nullable: true })
  async getCurrentUser(@CurrentUser() user) {
    return this.userService.find({ authId: user.sub });
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: UserCreateInput): Promise<User> {
    console.log('here');
    const user = new User();
    return await this.userService.create({ ...user, ...input });
  }

  @Mutation(() => User)
  async updateUser(@Args('input') input: UserUpdateInput): Promise<User> {
    const user = new User();
    return await this.userService.update({ ...user, ...input });
  }

  @Mutation(() => User)
  async updateUserMetadata(
    @CurrentUser() user,
    @Args('input') userMetadata: UserMetaDataInput,
  ): Promise<User> {
    const data = JSON.parse(
      `{${JSON.stringify(userMetadata.key)}:${JSON.stringify(
        userMetadata.value,
      )}}`,
    );

    await this.mgtApi.updatePreferences(user.sub, data);
    return this.userService.find({ authId: user.sub });
  }

  // @ResolveField()
  // async posts(@Parent() author: Author) {
  //   const { id } = author;
  //   return this.postsService.findAll({ authorId: id });
  // }
}
