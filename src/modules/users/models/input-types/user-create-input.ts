import { InputType, IntersectionType, PickType } from '@nestjs/graphql';
import { BaseModel } from '../../../../core/models/base-model';
import { User } from '../user.model';

@InputType()
export class UserCreateInput extends PickType(
  IntersectionType(User, BaseModel),
  ['authId', 'name', 'email'],
  InputType,
) {}
