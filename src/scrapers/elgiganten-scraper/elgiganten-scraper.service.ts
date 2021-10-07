import { Injectable } from '@nestjs/common';
import { BaseScrapersService } from '../base-scrapers.service';
import config from '../../config.json';
import cheerio, { CheerioAPI } from 'cheerio';
import { Product } from 'src/products/models/product.model';
import { Page } from 'puppeteer';

@Injectable()
export class ElgigantenScraperService extends BaseScrapersService {
  constructor() {
    super();
  }

  getAllProducts = async (): Promise<Product[]> => {
    return super.browserSession(this._getAllProductsFunc);
  };

  private _getAllProductsFunc = async (page: Page): Promise<Product[]> => {
    let products = [];
    let url = config.elgiganten;
    let pageNumber = 2;
    while (true) {
      console.log(pageNumber);
      // networkidle property wait until no more network calls are made
      await page.goto(url, { waitUntil: 'networkidle0' });
      const html = await page.content(); // serialized HTML of page DOM.
      const $ = cheerio.load(html);
      const pageHasProducts = $('.product-tile').length > 0;
      console.log($('.product-tile').length);
      console.log(pageHasProducts);
      if (!pageHasProducts) break;
      const tempProducts = await this._getProductsFromPage($);
      products = [...products, ...tempProducts];
      url = config.elgiganten + `/page-${pageNumber++}`;
    }

    return products;
  };

  private _getProductsFromPage = async ($: CheerioAPI): Promise<Product[]> => {
    const productsWithPrices = $('.product-tile')
      .map((idx, el) => {
        const model = {
          name: $(el).attr('title'),
          price: parseInt($(el).find('.price').text()),
        };
        return model;
      })
      .toArray();
    return productsWithPrices.map((x) => ({ ...new Product(), ...x }));
  };
}
