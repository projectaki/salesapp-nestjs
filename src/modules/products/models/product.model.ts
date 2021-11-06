import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
@ObjectType()
export class Product {
  @Field()
  _id: string;

  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field(() => Int)
  price: number;

  @Prop()
  @Field(() => Int)
  previous_price: number;

  @Prop()
  @Field()
  created_at: Date;

  @Prop()
  @Field()
  updated_at: Date;

  @Prop()
  @Field({ nullable: true })
  img_url?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
// @Field(type => [InvoiceModel], { nullable: true })
// @OneToMany(type => InvoiceModel, invoice => invoice.customer)
// invoices: InvoiceModel[]
