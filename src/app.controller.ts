import { InjectQueue } from '@nestjs/bull';
import { Controller, Get } from '@nestjs/common';

import { Queue } from 'bull';
import { MailService } from './mail/mail.service';
import { Product } from './products/models/product.model';

import { ProductService } from './products/services/product.service';
import { ElgigantenScraperService } from './scrapers/elgiganten-scraper/elgiganten-scraper.service';

@Controller()
export class AppController {
  constructor(
    private readonly elgigantenScraper: ElgigantenScraperService,
    private serv: ProductService,
    @InjectQueue('product-queue') private productQueue: Queue,
  ) {}

  @Get('/run')
  async fetchProducts(): Promise<string> {
    const products = await this.elgigantenScraper.getAllPRoducts();
    const changedProducts = await this.serv.processProducts(products);
    console.log(changedProducts);
    if (changedProducts.length > 0) {
      this.productQueue.add('product', changedProducts);
    }
    return 'Inserted';
  }
}
