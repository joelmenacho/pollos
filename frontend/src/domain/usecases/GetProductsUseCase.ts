import { IProductRepository } from '../repositories/IProductRepository';
export class GetProductsUseCase {
  constructor(private repo: IProductRepository) {}
  execute() {
    return this.repo.getAll();
  }
}
