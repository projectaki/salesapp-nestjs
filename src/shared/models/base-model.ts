import { Field, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
export class BaseModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 500 })
  name: string;
}
