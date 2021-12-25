import {
  Field,
  InputType,
  IntersectionType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Store } from 'src/modules/stores/models/store';

@ObjectType()
export class StoreSubscription extends PartialType(Store) {
  @Field()
  _id: string;
}
