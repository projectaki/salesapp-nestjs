import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Public } from 'src/core/auth/public-route-decorator';
import { Store } from '../models/store';
import { StoreService } from '../services/store.service';

@Resolver(() => Store)
export class StoreResolver {
  constructor(private storeService: StoreService) {}

  @Public()
  @Query(() => [Store])
  async stores() {
    return this.storeService.getAll();
  }
}
