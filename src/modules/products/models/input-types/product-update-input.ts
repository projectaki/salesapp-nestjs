import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from '../product.model';
import { ProductCreateInput } from './product-create-input';

@InputType()
export class ProductUpdateInput
  extends PartialType(ProductCreateInput)
  implements Partial<ProductCreateInput>
{
  @Field()
  id: string;
}
