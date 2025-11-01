import { useEffect, useMemo, useState } from 'react';
import type { Product } from '../../domain/entities/Product';
import { ProductRepository } from '../../data/repositories/ProductRepository';
import { GetProductsUseCase } from '../../domain/usecases/GetProductsUseCase';
import { GetProductByIdUseCase } from '../../domain/usecases/GetProductByIdUseCase';

const repo = new ProductRepository();
const getAllUC = new GetProductsUseCase(repo);
const getByIdUC = new GetProductByIdUseCase(repo);

export function useProductsVM() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getAllUC.execute();
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  // 👇 en tu backend `id` es numérico
  const getById = (id: number) => getByIdUC.execute(id);
  const hasData = useMemo(() => items.length > 0, [items]);

  return { items, loading, hasData, reload: load, getById };
}


