import React, {createContext, useContext, useMemo, useState} from 'react';
import type { Product } from '../../domain/entities/Product';

export type CartItem = Product & { qty: number };

type CartCtx = {
  items: CartItem[];
  add: (p: Product, qty?: number) => void;
  remove: (id: number) => void;
  clear: () => void;
  total: number;
  count: number;
};

const CartContext = createContext<CartCtx>({
  items: [], add: () => {}, remove: () => {}, clear: () => {},
  total: 0, count: 0,
});

export function CartProvider({children}:{children: React.ReactNode}) {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = (p: Product, qty = 1) =>
    setItems(prev => {
      const i = prev.findIndex(x => x.id === p.id);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + qty };
        return copy;
      }
      return [...prev, { ...p, qty }];
    });

  const remove = (id: number) => setItems(prev => prev.filter(x => x.id !== id));
  const clear = () => setItems([]);

  const total = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);
  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);

  return (
    <CartContext.Provider value={{items, add, remove, clear, total, count}}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
