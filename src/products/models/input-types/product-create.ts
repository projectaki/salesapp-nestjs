import { InputType, IntersectionType, PickType } from '@nestjs/graphql';
import { BaseModel } from 'src/shared/models/base-model';
import { Product } from '../product.model';

@InputType()
export class ProductCreateInput extends PickType(
  IntersectionType(Product, BaseModel),
  ['name', 'price'],
  InputType,
) {}