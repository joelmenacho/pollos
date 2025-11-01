import { IProductRepository } from '../repositories/IProductRepository';
export class GetProductByIdUseCase {
  constructor(private repo: IProductRepository) {}
  execute(id: string) {
    return this.repo.getById(id);
  }
}
