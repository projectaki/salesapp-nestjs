import {
  Field,
  InputType,
  PartialType,
  IntersectionType,
  PickType,
} from '@nestjs/graphql';
import { UserMetadata } from '../user-metadata';
import { User } from '../user.model';
import { UserCreateInput } from './user-create-input';

@InputType()
export class UserUpdateInput extends PartialType(UserCreateInput) {
  @Field()
  _id: string;

  @Field({ nullable: true })
  user_metadata?: UserMetadata;
}
