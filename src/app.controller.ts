import { Controller, Get } from '@nestjs/common';
import { ProductService } from './products/services/product.service';
import { ElgigantenScraperService } from './scrapers/elgiganten-scraper/elgiganten-scraper.service';

@Controller()
export class AppController {
  constructor(
    private readonly scraperService: ElgigantenScraperService,
    private readonly productService: ProductService,
  ) {}

  @Get('/run')
  async fetchProducts(): Promise<string> {
    const products = await this.scraperService.getProducts();
    //products.forEach((x) => this.productService.create(x));
    return 'Inserted';
  }
}
