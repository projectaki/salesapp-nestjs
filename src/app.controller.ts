import { InjectQueue } from '@nestjs/bull';
import { Controller, Get } from '@nestjs/common';
import { Queue } from 'bull';
import { ProductService } from './products/services/product.service';
import { ElgigantenScraperService } from './scrapers/elgiganten-scraper/elgiganten-scraper.service';

@Controller()
export class AppController {
  constructor(
    private readonly elgigantenScraper: ElgigantenScraperService,
    private serv: ProductService,
    @InjectQueue('mail') private mailQueue: Queue,
  ) {}

  @Get('/run')
  async fetchProducts(): Promise<string> {
    const products = await this.elgigantenScraper.getAllProducts();
    const changedProducts = await this.serv.processProducts(products);
    console.log(changedProducts);
    if (changedProducts.length > 0) {
      this.mailQueue.add('email', changedProducts);
    }
    return 'Inserted';
  }
}
