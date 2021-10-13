import { InjectQueue } from '@nestjs/bull';
import { Controller, Get, InternalServerErrorException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { Queue } from 'bull';
import { LoggingService } from './logger/logger.service';
import { ProductService } from './products/services/product.service';
import { ElgigantenScraperService } from './scrapers/elgiganten-scraper/elgiganten-scraper.service';

@Controller()
export class AppController {
  constructor(
    private readonly elgigantenScraper: ElgigantenScraperService,
    private serv: ProductService,
    @InjectQueue('mail') private mailQueue: Queue,

    private logger: LoggingService,
    private configService: ConfigService,
  ) {}

  @Get('/run')
  async fetchProducts(): Promise<string> {
    const products = await this.elgigantenScraper.getAllProducts();
    // const changedProducts = await this.serv.processProducts(products);
    // console.log(changedProducts);
    // if (changedProducts.length > 0) {
    //   this.mailQueue.add('email', changedProducts);
    // }
    for (let i = 0; i < 49; i++) {
      console.log(products[i]);
    }
    return 'Inserted';
  }
}
