import { InjectQueue } from '@nestjs/bull';
import {
  Controller,
  Get,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Queue } from 'bull';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from './auth/public-route-decorator';
import { LoggingService } from './logger/logger.service';
import { MailService } from './mail/mail.service';
import { Product } from './products/models/product.model';
import { ProductService } from './products/services/product.service';
import { ElgigantenScraperService } from './scrapers/elgiganten-scraper/elgiganten-scraper.service';

@Controller()
export class AppController {
  constructor(
    private readonly elgigantenScraper: ElgigantenScraperService,
    private serv: ProductService,
    @InjectQueue('mail') private mailQueue: Queue,
    private sender: MailService,
    private logger: LoggingService,
    private configService: ConfigService,
  ) {}

  //@Public()
  @Get('/run')
  async fetchProducts(): Promise<string> {
    const products = await this.elgigantenScraper.getAllProducts();
    const changedProducts = await this.serv.processProducts(products);
    console.log(changedProducts);
    if (changedProducts.length > 0) {
      this.mailQueue.add('products', changedProducts);
    }
    return 'Inserted';
  }
}
