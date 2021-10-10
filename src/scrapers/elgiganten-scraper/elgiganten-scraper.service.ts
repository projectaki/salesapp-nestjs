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
  url = config.elgiganten;

  constructor() {
    super();
  }

  getAllProducts = async (): Promise<Product[]> => {
    return super.browserSession(this._getUniqueDiscountedProducts);
  };

  private _getUniqueDiscountedProducts = async (
    page: Page,
  ): Promise<Product[]> => {
    let products = [];
    const pageNumber = await this._getDiscountPageNumberOrDefault(page, 100);
    for (let i = 1; i <= pageNumber; i++) {
      const $ = await this._pageToCheerio(page, i);
      products = [...products, ...(await this._getProductsFromCheerio($))];
    }
    return this._removeProductDuplicatesByName(products);
  };

  private _removeProductDuplicatesByName = (products: Product[]) => {
    const productNames = new Set();
    return products.filter((product) => {
      return !productNames.has(product.name) && productNames.add(product.name);
    });
  };

  private _pageToCheerio = async (page: Page, pageNumber: number) => {
    console.log(`${this.url}/page-${pageNumber}`);
    // networkidle property wait until no more network calls are made
    await page.goto(`${this.url}/page-${pageNumber}`, {
      waitUntil: 'networkidle0',
    });
    const html = await page.content(); // serialized HTML of page DOM.
    return cheerio.load(html);
  };

  private _getProductsFromCheerio = async (
    $: CheerioAPI,
  ): Promise<Product[]> => {
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

  private _getDiscountPageNumberOrDefault = async (
    page: Page,
    maxPages?: number,
  ): Promise<number> => {
    await page.goto(this.url, { waitUntil: 'networkidle0' });
    const html = await page.content(); // serialized HTML of page DOM.
    const $ = cheerio.load(html);
    // Todo : if doesnmt exist throw new exception => class name changed exception
    const lastPageNumberString = $('.pagination__item').last().text() ?? '0';
    const lastPageNumberNumber = parseInt(lastPageNumberString);
    return Math.min(maxPages, lastPageNumberNumber);
  };
}
