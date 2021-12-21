import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type StoreDocument = Store & Document;

@ObjectType()
@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
})
export class Store {
  @Field()
  _id?: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field({ nullable: true })
  @Prop({ required: true })
  logoUrl: string;

  @Field()
  @Prop({ required: true })
  created_at?: Date;

  @Field()
  @Prop({ required: true })
  updated_at?: Date;
}

export const StoreSchema = SchemaFactory.createForClass(Store);

// For object relations
// @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
// owner: Owner;

// @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }] })
// owner: Owner[];
