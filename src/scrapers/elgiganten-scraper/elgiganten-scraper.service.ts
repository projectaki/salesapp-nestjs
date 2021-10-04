import { Injectable } from '@nestjs/common';
import { BaseScrapersService } from '../base-scrapers.service';
import config from '../../config.json';
import cheerio from 'cheerio';
import { Product } from 'src/products/models/product.model';

@Injectable()
export class ElgigantenScraperService extends BaseScrapersService {
  constructor() {
    super();
  }

  runScraper = async () => {
    const html = await super.getHtml(config.elgiganten);

    const $ = cheerio.load(html);
    const firstProduct = $('.product-tile')
      .map((idx, el) => {
        const model = {
          name: $(el).attr('title') ?? '',
          price: parseInt($(el).find('.price').text()),
        };
        return model;
      })
      .toArray();
    console.log('HERE: ', firstProduct);
  };
}
