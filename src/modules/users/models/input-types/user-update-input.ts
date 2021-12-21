import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { StoreCreateInput } from 'src/modules/stores/models/input-types/store-create-input';
import { Store } from 'src/modules/stores/models/store';
import { UserMetadata } from '../user-metadata';
import { User } from '../user.model';
import { UserCreateInput } from './user-create-input';

@InputType()
export class UserUpdateInput {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [StoreCreateInput], { nullable: true })
  subscriptions: StoreCreateInput[];

  @Field(() => UserMetadata, { nullable: true })
  user_metadata: UserMetadata;
}
