import { InputType, IntersectionType, PickType } from '@nestjs/graphql';
import { User } from '../user.model';

@InputType()
export class UserCreateInput extends PickType(
  User,
  ['_id', 'name', 'email'],
  InputType,
) {}
