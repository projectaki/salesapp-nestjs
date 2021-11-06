import { Injectable } from '@nestjs/common';
import { firstValueFrom, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable()
export class ProductService {
  create = async (product: Product): Promise<Product> => {
    return await firstValueFrom(of(product));
  };

  // update = (product: Product): Promise<Product> => {
  //   return this.productRepository.save(product);
  // };

  // find(id: string): Promise<Product> {
  //   return this.productRepository.findOne(id);
  // }

  // remove = (product: Product): Promise<Product> => {
  //   return this.productRepository.remove(product);
  // };

  // processProducts = async (products: Product[], companyId?: string) => {
  //   const productsWithLowerPrices: Product[] = [];
  //   for (const product of products) {
  //     const oldProduct = await this.productRepository.findOne({
  //       name: product.name,
  //     });
  //     if (!oldProduct) {
  //       const newProduct = {
  //         ...product,
  //         previous_price: product.price,
  //       };
  //       await this.productRepository.save(newProduct);
  //       productsWithLowerPrices.push(newProduct);
  //     } else {
  //       if (product.price !== oldProduct.price) {
  //         const updatedProduct = {
  //           ...oldProduct,
  //           ...product,
  //           previous_price: oldProduct.price,
  //         };
  //         await this.productRepository.save(updatedProduct);
  //         if (product.price < oldProduct.price)
  //           productsWithLowerPrices.push(updatedProduct);
  //       }
  //     }
  //   }
  //   return productsWithLowerPrices;
  // };
}
