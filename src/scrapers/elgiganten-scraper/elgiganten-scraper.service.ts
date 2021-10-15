import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BaseScrapersService } from '../base-scrapers.service';
import config from '../../config.json';
import cheerio, { CheerioAPI } from 'cheerio';
import { Product } from 'src/products/models/product.model';
import { Page } from 'puppeteer';
import { NoCssFoundException } from 'src/exceptions/errors/no-css-found.error';

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
      products = [...products, ...this._getProductsFromCheerio($)];
    }
    return this._sanitize(products);
  };

  private _sanitize = (products: Product[]) => {
    const productNames = new Set();
    const uniqueProducts = products.filter((product) => {
      return !productNames.has(product.name) && productNames.add(product.name);
    });

    const sanitizedProducts = uniqueProducts.filter((x) => {
      return x.name && x.price;
    });

    const trimmedProducts = sanitizedProducts.map((x) => ({
      ...x,
      name: x.name.trim(),
    }));
    return trimmedProducts;
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

  private _getProductsFromCheerio($: CheerioAPI): Product[] {
    const productTiles = $('.product-tile');
    if (!productTiles.text()) {
      throw new NoCssFoundException(
        'Product tiles css returned empty! Css may have changed!',
      );
    }

    const productsWithPrices = productTiles
      .map((idx, el) => {
        const model = {
          name: $(el).attr('title'),
          price: parseInt($(el).find('.price').text()),
          img_url: $(el).find('.product-tile__image').attr('src'),
        };
        return model;
      })
      .toArray();
    // maybe some sanitization in a callback
    return productsWithPrices.map((x) => ({ ...new Product(), ...x }));
  }

  private _getDiscountPageNumberOrDefault = async (
    page: Page,
    maxPages?: number,
  ): Promise<number> => {
    await page.goto(this.url, { waitUntil: 'networkidle0' });
    const html = await page.content(); // serialized HTML of page DOM.
    const $ = cheerio.load(html);
    // Todo : if doesnmt exist throw new exception => class name changed exception
    const lastPageNumberString = $('.pagination__item').last().text();
    if (!lastPageNumberString)
      throw new NoCssFoundException(
        'Cant find page count! Css may have changed!',
      );
    const lastPageNumberNumber = parseInt(lastPageNumberString);
    return Math.min(maxPages, lastPageNumberNumber);
  };
}
