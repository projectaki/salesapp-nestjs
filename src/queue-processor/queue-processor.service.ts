import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { MailService } from 'src/mail/mail.service';
import { Product } from 'src/products/models/product.model';
import { ProductService } from 'src/products/services/product.service';

@Processor('product-queue')
export class QueueProcessorService {
  /**
   *
   */
  constructor(private readonly mail: MailService) {}
  @Process('product')
  async processProduct(job: Job<Product[]>) {
    console.log('Processing mail');
    this.mail.sendEmail(JSON.stringify(job.data));
    return {};
  }
}
