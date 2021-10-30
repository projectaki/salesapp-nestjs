import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserMetaDataInput {
  @Field()
  key: string;
  @Field()
  value: string;
}
