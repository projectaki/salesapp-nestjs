import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../models/product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create = (product: Product): Promise<Product> => {
    return this.productRepository.save(product);
  };

  findOne(id: string): Promise<Product> {
    return this.productRepository.findOne(id);
  }
}

// Below is how to make a transaction
// constructor(private connection: Connection) {}
// async createMany(users: User[]) {
//   const queryRunner = this.connection.createQueryRunner();

//   await queryRunner.connect();
//   await queryRunner.startTransaction();
//   try {
//     await queryRunner.manager.save(users[0]);
//     await queryRunner.manager.save(users[1]);

//     await queryRunner.commitTransaction();
//   } catch (err) {
//     // since we have errors lets rollback the changes we made
//     await queryRunner.rollbackTransaction();
//   } finally {
//     // you need to release a queryRunner which was manually instantiated
//     await queryRunner.release();
//   }
// }
