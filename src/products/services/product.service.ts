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

  update = (product: Product): Promise<Product> => {
    return this.productRepository.save(product);
  };

  find(id: string): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  remove = (product: Product): Promise<Product> => {
    return this.productRepository.remove(product);
  };

  processProducts = async (products: Product[]) => {
    for (const product of products) {
      const oldProduct = await this.productRepository.findOne({
        name: product.name,
      });
      if (!oldProduct) {
        await this.productRepository.save(product);
      } else {
        const updatedProduct = { ...oldProduct, ...product };
        await this.productRepository.save(updatedProduct);
        if (product.price < oldProduct.price) {
          // put event in queue that the product has had a price reduction
        }
      }
    }
  };
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
