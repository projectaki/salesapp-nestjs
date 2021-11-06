import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { ProductCreateInput } from './product-create-input';

@InputType()
export class ProductUpdateInput
  extends PartialType(ProductCreateInput)
  implements Partial<ProductCreateInput>
{
  @Field()
  _id: string;
}
