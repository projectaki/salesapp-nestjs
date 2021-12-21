import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { StoreCreateInput } from 'src/modules/stores/models/input-types/store-create-input';

import { UserMetadata } from '../user-metadata';
import { User } from '../user.model';

@InputType()
export class UserUpdateInput extends PartialType(
  OmitType(User, ['subscriptions']),
  InputType,
) {
  @Field(() => [StoreCreateInput], { nullable: true })
  subscriptions: StoreCreateInput[];
}
