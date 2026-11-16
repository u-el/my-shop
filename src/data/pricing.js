import { CHECKOUT } from './content.js';
import { findProduct } from './products.js';

// 세트 할인 (임시안: 할인율)
// 무드 조명과 스마트 전구를 함께 사면, 둘을 짝지은 수(작은 쪽 수량)만큼 두 상품 가격의 10%를 깎는다.
// 예) 무드 조명 2 + 전구 1 → 세트 1개분 (49,000 + 19,000) × 10% = 6,800원 할인
export const BUNDLE = {
  ids: ['lamp', 'bulb'],
  rate: 0.1,
  label: '세트 할인',
  pitch: '무드 조명 + 스마트 전구 함께 사면 10% 할인',
};

const roundWon = (n) => Math.round(n / 10) * 10;

// 세트 하나의 정가와 할인가
export const bundlePrice = () => {
  const full = BUNDLE.ids.reduce((n, id) => n + findProduct(id).price, 0);
  return { full, discount: roundWon(full * BUNDLE.rate), sale: full - roundWon(full * BUNDLE.rate) };
};

// 주문 금액 계산 — lines: [{ id, qty }]
// 상품 금액·세트 할인·배송비·합계를 한 곳에서 계산해 장바구니와 주문서가 같은 값을 보여 준다
export const priceLines = (lines) => {
  const valid = lines.map((l) => ({ ...l, product: findProduct(l.id) })).filter((l) => l.product && l.qty > 0);
  const subtotal = valid.reduce((n, l) => n + l.product.price * l.qty, 0);
  const qtyOf = (id) => valid.find((l) => l.id === id)?.qty ?? 0;
  const sets = Math.min(...BUNDLE.ids.map(qtyOf));
  const discount = sets * bundlePrice().discount;
  const shipping = valid.length ? CHECKOUT.shippingFee : 0;
  return { subtotal, sets, discount, shipping, total: subtotal - discount + shipping };
};
