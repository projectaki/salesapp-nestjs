import { Product } from 'src/products/models/product.model';

export interface IScraper {
  getProducts(): Promise<Product[]>;
}
