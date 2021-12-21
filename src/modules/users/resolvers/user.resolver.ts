import {
  Args,
  Context,
  Info,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/core/auth/graphql/current-user-decorator';
import { UserCreateInput } from '../models/input-types/user-create-input';
import { UserUpdateInput } from '../models/input-types/user-update-input';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Public } from 'src/core/auth/public-route-decorator';
import { StoreService } from 'src/modules/stores/services/store.service';
import { GqlQueryPipe } from 'src/core/pipes/gql-query.pipe';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private storeService: StoreService,
  ) {}

  @Public()
  @Query(() => User, { name: 'user' })
  async getUser(@Args('id') id: string, @Info(GqlQueryPipe) paths) {
    const res = await this.userService.findById(id, paths);
    return res;
  }

  @Query(() => User, { nullable: true })
  async getCurrentUser(@CurrentUser() user) {
    return this.userService.findById(user.sub);
  }

  @Mutation(() => User)
  async createOrUpdateUser(
    @Args('input') input: UserUpdateInput,
  ): Promise<User> {
    const foundUser = await this.userService.findById(input._id);
    if (foundUser) return await this.userService.update(input);
    else {
      const createInput = {
        _id: input._id,
        name: input.name,
        email: input.email,
      };

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

  @ResolveField()
  async subscriptions(@Parent() user: User, @Info(GqlQueryPipe) paths) {
    const subscriptions = await this.storeService.getByIds(
      user.subscriptions.map((x) => x._id),
      paths,
    );
    return subscriptions;
  }

  // @ResolveField()
  // async posts(@Parent() author: Author) {
  //   const { id } = author;
  //   return this.postsService.findAll({ authorId: id });
  // }
}
