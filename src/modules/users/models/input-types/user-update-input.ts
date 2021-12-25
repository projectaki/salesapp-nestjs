import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { UserMetadata } from '../user-metadata';
import { User } from '../user.model';
import { StoreSubscriptionInput } from './store-subscription-input';

@InputType()
export class UserUpdateInput extends PartialType(
  OmitType(User, ['subscriptions', 'created_at', 'updated_at']),
  InputType,
) {
  @Field(() => [StoreSubscriptionInput], { nullable: true })
  subscriptions: StoreSubscriptionInput[];
}
