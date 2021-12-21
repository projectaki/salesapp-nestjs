import { InputType, IntersectionType, PickType } from '@nestjs/graphql';
import { StoreSubscription } from '../store-subscription';
import { User } from '../user.model';

@InputType()
export class StoreSubscriptionInput extends PickType(
  StoreSubscription,
  ['_id'],
  InputType,
) {}
