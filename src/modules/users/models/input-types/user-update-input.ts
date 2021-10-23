import { Field, InputType, PartialType } from '@nestjs/graphql';
import { User } from '../user.model';
import { UserCreateInput } from './user-create-input';

@InputType()
export class UserUpdateInput extends PartialType(UserCreateInput) {
  @Field()
  authId: string;
}
