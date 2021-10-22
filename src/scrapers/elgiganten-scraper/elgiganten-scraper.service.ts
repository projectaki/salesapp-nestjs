import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BaseScrapersService } from '../base-scrapers.service';
import cheerio, { CheerioAPI } from 'cheerio';
import { Product } from 'src/products/models/product.model';
import { Page } from 'puppeteer';
import { NoCssFoundException } from 'src/exceptions/errors/no-css-found.error';
import { IScraper } from '../interfaces/scraper.interface';

@Injectable()
export class ElgigantenScraperService
  extends BaseScrapersService
  implements IScraper
{
  private readonly url = 'https://www.elgiganten.dk/tilbud';

  constructor() {
    super();
  }

  getAllProducts = async (): Promise<Product[]> => {
    return super.browserSession(this._getUniqueDiscountedProducts);
  };

  _getUniqueDiscountedProducts = async (page: Page): Promise<Product[]> => {
    let products = [];
    const pageNumber = await this._getPageNumberOrDefault(page, this.url, 100);
    for (let i = 1; i <= pageNumber; i++) {
      console.log(`${this.url}/page-${i}`);
      const url = `${this.url}/page-${i}`;
      const html = await this._loadHtmlFromUrl(page, url);
      products = [...products, ...this._getProductsFromHtml(html)];
    }
    return this._sanitize(products);
  };

  _loadHtmlFromUrl = async (page: Page, url: string) => {
    // networkidle property wait until no more network calls are made
    await page.goto(url, {
      waitUntil: 'networkidle0',
    });
    const html = await page.content(); // serialized HTML of page DOM.
    return html;
  };

  _getProductsFromHtml(html: string): Product[] {
    const $ = cheerio.load(html);
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

  _getPageNumberOrDefault = async (
    page: Page,
    url: string,
    maxPages?: number,
  ): Promise<number> => {
    const html = await this._loadHtmlFromUrl(page, url);
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

  private _sanitize = (products: Product[]) => {
    const productNames = new Set();
    const sanitizedProducts = products
      .filter((product) => {
        return (
          !productNames.has(product.name) && productNames.add(product.name)
        );
      })
      .filter((x) => {
        return x.name && x.price;
      })
      .map((x) => ({
        ...x,
        name: x.name.trim(),
      }));
    return sanitizedProducts;
  };
}
