import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CHECKOUT } from '../data/content.js';
import { findProduct } from '../data/products.js';

// 장바구니: [{ id, qty }] — 새로고침해도 남도록 이 브라우저의 localStorage에 저장한다
const KEY = 'lumood:cart';
const CartContext = createContext(null);

const clampQty = (n) => Math.max(1, Math.min(CHECKOUT.maxQty, Math.round(n) || 1));

const load = () => {
  try {
    const list = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(list) ? list.filter((l) => findProduct(l.id)).map((l) => ({ id: l.id, qty: clampQty(l.qty) })) : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const [items, setItems] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* 저장 못 해도 이번 방문 동안은 동작 */
    }
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((n, l) => n + l.qty, 0),
      // 이미 담긴 상품이면 수량을 더한다 (최대 수량까지)
      add(id, qty = 1) {
        setItems((list) => {
          const found = list.find((l) => l.id === id);
          if (found) return list.map((l) => (l.id === id ? { ...l, qty: clampQty(l.qty + qty) } : l));
          return [...list, { id, qty: clampQty(qty) }];
        });
      },
      setQty(id, qty) {
        setItems((list) => list.map((l) => (l.id === id ? { ...l, qty: clampQty(qty) } : l)));
      },
      remove(id) {
        setItems((list) => list.filter((l) => l.id !== id));
      },
      clear() {
        setItems([]);
      },
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
