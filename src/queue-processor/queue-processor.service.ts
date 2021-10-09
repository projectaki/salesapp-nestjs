import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { Product } from 'src/products/models/product.model';
import { ProductService } from 'src/products/services/product.service';

@Processor('product-queue')
export class QueueProcessorService {
  /**
   *
   */
  constructor(private readonly productService: ProductService) {}
  @Process('product')
  async processProduct(job: Job<Product>) {
    this.productService.processProduct(job.data);
    return {};
  }
}
