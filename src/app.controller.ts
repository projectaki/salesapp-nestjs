import { InjectQueue } from '@nestjs/bull';
import { Controller, Get } from '@nestjs/common';
import { Queue } from 'bull';
import { Product } from './products/models/product.model';
import { ProductService } from './products/services/product.service';
import { ElgigantenScraperService } from './scrapers/elgiganten-scraper/elgiganten-scraper.service';

@Controller()
export class AppController {
  constructor(private readonly elgigantenScraper: ElgigantenScraperService) {}

  @Get('/run')
  async fetchProducts(): Promise<string> {
    await this.elgigantenScraper.processAllProducts();
    return 'Inserted';
  }
}
