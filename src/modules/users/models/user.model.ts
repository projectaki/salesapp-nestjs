import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../../core/models/base-model';

@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseModel {
  @Field()
  @Column({ length: 500 })
  email: string;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
