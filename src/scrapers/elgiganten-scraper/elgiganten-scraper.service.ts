import { Injectable } from '@nestjs/common';
import { BaseScrapersService } from '../base-scrapers.service';
import config from '../../config.json';
import cheerio, { CheerioAPI } from 'cheerio';
import { Product } from 'src/products/models/product.model';
import { Page } from 'puppeteer';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class ElgigantenScraperService extends BaseScrapersService {
  constructor() {
    super();
  }

  getAllPRoducts = async (): Promise<Product[]> => {
    return super.browserSession(this._traverseAllDiscountProductsFunc);
  };

  private _traverseAllDiscountProductsFunc = async (
    page: Page,
  ): Promise<Product[]> => {
    const products = [];
    let url = config.elgiganten;
    let pageNumber = 1;
    const set = new Set();
    while (true) {
      // networkidle property wait until no more network calls are made
      await page.goto(url, { waitUntil: 'networkidle0' });
      const html = await page.content(); // serialized HTML of page DOM.
      const $ = cheerio.load(html);
      const pageHasProducts = $('.product-tile').length > 0;
      if (!pageHasProducts) break;
      const currentProducts = await this._getProductsFromPage($);
      currentProducts.forEach((x) => {
        if (!set.has(x.name)) {
          products.push(x);
          set.add(x.name);
        }
      });
      console.log(pageNumber);
      url = config.elgiganten + `/page-${++pageNumber}`;
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

    // maybe some sanitization in a callback
    return productsWithPrices
      .map((x) => ({ ...new Product(), ...x }))
      .filter((x) => x.name && x.price);
  };
}
