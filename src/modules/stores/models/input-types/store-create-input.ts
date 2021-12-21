import {
  Field,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Store } from '../store';

@InputType()
export class StoreCreateInput {
  @Field()
  name: string;

  @Field()
  logoUrl: string;
}
