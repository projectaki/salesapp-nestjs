import { Injectable } from '@nestjs/common';
import { BaseScrapersService } from '../base-scrapers.service';
import config from '../../config.json';
import cheerio from 'cheerio';
import { Product } from 'src/products/models/product.model';
import { IScraper } from '../interfaces/scraper.interface';

@Injectable()
export class ElgigantenScraperService
  extends BaseScrapersService
  implements IScraper
{
  constructor() {
    super();
  }

  getProducts = async (): Promise<Product[]> => {
    const html = await super.getHtml(config.elgiganten);

    const $ = cheerio.load(html);
    const productsWithPrices = $('.product-tile')
      .map((idx, el) => {
        const model = {
          name: $(el).attr('title') ?? '',
          price: parseInt($(el).find('.price').text()),
        };
        return model;
      })
      .toArray();
    return productsWithPrices.map((x) => ({ ...new Product(), ...x }));
  };
}
