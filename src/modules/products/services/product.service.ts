import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductCreateInput } from '../models/input-types/product-create-input';
import { ProductUpdateInput } from '../models/input-types/product-update-input';
import { Product, ProductDocument } from '../models/product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  create = async (product: ProductCreateInput): Promise<Product> => {
    const prodWithPrevPriceSet: Product = {
      ...new Product(),
      ...product,
      previous_price: product.price,
    };
    const createdProduct = new this.productModel(prodWithPrevPriceSet);
    return await createdProduct.save();
  };

  update = async (product: ProductUpdateInput): Promise<Product> => {
    const { _id, ...updateModel } = product;
    const found = await this.productModel.findById(_id);

    const updated = await this.productModel
      .findByIdAndUpdate(
        _id,
        { ...updateModel, previous_price: found.price },
        { new: true },
      )
      .exec();
    return updated;
  };

  findById = async (id: string): Promise<Product> => {
    return await this.productModel.findById(id).exec();
  };

  // remove = async (product: Product): Promise<Product> => {
  //   return await this.productModel.remove(product);
  // };

  processProducts = async (products: Product[], companyId?: string) => {
    const productsWithLowerPrices: Product[] = [];
    for (const product of products) {
      const oldProduct = await this.productModel.findOne({
        name: product.name,
      });
      if (!oldProduct) {
        const newProduct = {
          ...product,
          previous_price: product.price,
        };
        const createdProduct = new this.productModel(newProduct);
        await createdProduct.save();
        productsWithLowerPrices.push(newProduct);
      } else {
        if (product.price !== oldProduct.price) {
          const updatedProduct = {
            ...oldProduct,
            ...product,
            previous_price: oldProduct.price,
          };
          const createdProduct = new this.productModel(updatedProduct);
          await createdProduct.save();
          if (product.price < oldProduct.price)
            productsWithLowerPrices.push(updatedProduct);
        }
      }
    }
    return productsWithLowerPrices;
  };
}
