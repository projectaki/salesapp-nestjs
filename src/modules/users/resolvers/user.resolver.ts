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
  @Query(() => User)
  async user(@Args('id') id: string, @Info(GqlQueryPipe) paths) {
    const res = await this.userService.findById(id, paths);
    return res;
  }

  @Query(() => User, { nullable: true })
  async authUser(@CurrentUser() user, @Info(GqlQueryPipe) paths) {
    return this.userService.findById(user.sub, paths);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: UserCreateInput): Promise<User> {
    return await this.userService.create(input);
  }

  @Mutation(() => User)
  async saveUser(
    @CurrentUser() user,
    @Args('input') input: UserUpdateInput,
  ): Promise<User> {
    return await this.userService.update({ ...input, _id: user.sub });
  }

  @ResolveField()
  async subscriptions(@Parent() user: User, @Info(GqlQueryPipe) paths) {
    const subscriptions = await this.storeService.getByIds(
      user.subscriptions?.map((x) => x._id),
      paths,
    );
    return subscriptions;
  }

  @Mutation(() => User)
  async addSubscription(
    @CurrentUser() user,
    @Args('_id') _id: string,
  ): Promise<User> {
    return await this.userService.addSubscription(_id, user.sub);
  }

  @Mutation(() => User)
  async removeSubscription(
    @CurrentUser() user,
    @Args('_id') _id: string,
  ): Promise<User> {
    return await this.userService.removeSubscription(_id, user.sub);
  }
}
