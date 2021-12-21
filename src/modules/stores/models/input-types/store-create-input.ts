import {
  Field,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Store } from '../store';

@InputType()
export class StoreCreateInput extends PickType(
  Store,
  ['name', 'logoUrl'],
  InputType,
) {}
