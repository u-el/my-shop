import { describe, expect, it } from 'vitest';
import { CHECKOUT } from './content.js';
import { findProduct } from './products.js';
import { BUNDLE, bundlePrice, priceLines } from './pricing.js';

const LAMP = findProduct('lamp').price;
const BULB = findProduct('bulb').price;
const SHIP = CHECKOUT.shippingFee;

describe('priceLines', () => {
  it('빈 장바구니는 0원이고 배송비도 붙지 않는다', () => {
    expect(priceLines([])).toEqual({ subtotal: 0, sets: 0, discount: 0, shipping: 0, total: 0 });
  });

  it('한 가지 상품만 사면 세트 할인이 없다', () => {
    const p = priceLines([{ id: 'lamp', qty: 2 }]);
    expect(p.subtotal).toBe(LAMP * 2);
    expect(p.discount).toBe(0);
    expect(p.total).toBe(LAMP * 2 + SHIP);
  });

  it('무드 조명과 전구를 함께 사면 세트 1개분을 할인한다', () => {
    const p = priceLines([
      { id: 'lamp', qty: 1 },
      { id: 'bulb', qty: 1 },
    ]);
    expect(p.sets).toBe(1);
    expect(p.discount).toBe(bundlePrice().discount);
    expect(p.total).toBe(LAMP + BULB - bundlePrice().discount + SHIP);
  });

  it('세트 수는 적게 담은 쪽 수량만큼이다', () => {
    const p = priceLines([
      { id: 'lamp', qty: 1 },
      { id: 'bulb', qty: 3 },
    ]);
    expect(p.sets).toBe(1);
    expect(p.discount).toBe(bundlePrice().discount);
  });

  it('없는 상품이나 0개는 계산에서 뺀다', () => {
    const p = priceLines([
      { id: 'ghost', qty: 5 },
      { id: 'bulb', qty: 0 },
      { id: 'lamp', qty: 1 },
    ]);
    expect(p.subtotal).toBe(LAMP);
    expect(p.sets).toBe(0);
  });
});

describe('bundlePrice', () => {
  it('정가 = 두 상품 가격의 합, 할인가 = 정가 - 할인', () => {
    const b = bundlePrice();
    expect(b.full).toBe(LAMP + BULB);
    expect(b.discount).toBe(Math.round(((LAMP + BULB) * BUNDLE.rate) / 10) * 10);
    expect(b.sale).toBe(b.full - b.discount);
  });
});
