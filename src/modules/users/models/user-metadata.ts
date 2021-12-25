import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@InputType('UserMetadataInput')
@Schema()
export class UserMetadata {
  @Field()
  @Prop({ default: false })
  darkMode: boolean;
}

export const UserMetadataSchema = SchemaFactory.createForClass(UserMetadata);
