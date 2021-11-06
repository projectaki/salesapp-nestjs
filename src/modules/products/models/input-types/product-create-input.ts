import { InputType, IntersectionType, PickType } from '@nestjs/graphql';
import { Product } from '../product.model';

@InputType()
export class ProductCreateInput extends PickType(
  Product,
  ['name', 'price'],
  InputType,
) {}
