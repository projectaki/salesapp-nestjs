import { BaseModel } from '../../shared/models/base-model';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseModel {
  @Column({ length: 500 })
  email: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
