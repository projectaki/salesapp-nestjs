import { InputType, PartialType } from '@nestjs/graphql';
import { ProductCreateInput } from './product-create';

@InputType()
export class ProductUpdateInput extends PartialType(ProductCreateInput) {}
