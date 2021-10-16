import { Page } from 'puppeteer';
import { Product } from 'src/products/models/product.model';

export interface IScraper {
  getAllProducts(): Promise<Product[]>;
  _getUniqueDiscountedProducts(page: Page): Promise<Product[]>;
  _loadHtmlFromUrl(page: Page, url: string);
  _getProductsFromHtml(html: string): Product[];
  _getPageNumberOrDefault(
    page: Page,
    url: string,
    maxPages?: number,
  ): Promise<number>;
}
