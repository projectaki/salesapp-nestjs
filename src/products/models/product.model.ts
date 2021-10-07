import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/shared/models/base-model';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Product extends BaseModel {
  @Field((type) => Int)
  @Column()
  price: number;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}

// @Field(type => [InvoiceModel], { nullable: true })
// @OneToMany(type => InvoiceModel, invoice => invoice.customer)
// invoices: InvoiceModel[]
