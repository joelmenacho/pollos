import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product } from '../../domain/entities/Product';
import { ProductApi } from '../api/ProductApi';

export class ProductRepository implements IProductRepository {
  async getAll(): Promise<Product[]> {
    return await ProductApi.list();
  }
  async getById(id: string): Promise<Product> {
    return await ProductApi.get(id);
  }
}
