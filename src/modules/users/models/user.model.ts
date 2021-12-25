import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserMetadata } from './user-metadata';
import * as mongoose from 'mongoose';
import { Store } from 'src/modules/stores/models/store';
import { StoreSubscription } from './store-subscription';

export type UserDocument = User & Document;

@ObjectType()
@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
})
export class User {
  @Field()
  @Prop({ required: true })
  _id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true, unique: true })
  email: string;

  @Field(() => [StoreSubscription])
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Store.name }],
  })
  subscriptions: StoreSubscription[];

  @Field(() => UserMetadata)
  @Prop({ type: UserMetadata, default: () => ({}), _id: false })
  user_metadata: UserMetadata;

  @Field()
  @Prop()
  created_at?: Date;

  @Field()
  @Prop()
  updated_at?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// For object relations
// @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
// owner: Owner;

// @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }] })
// owner: Owner[];
