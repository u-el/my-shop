import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatWon } from '../data/content.js';
import { findProduct } from '../data/products.js';
import { BUNDLE, bundlePrice } from '../data/pricing.js';
import { useCart } from '../context/CartContext.jsx';
import { ProductThumb } from './ProductVisual.jsx';

// 세트 상품 카드 — 무드 조명 + 스마트 전구를 한 번에 담거나 바로 구매
export default function BundleCard() {
  const { add } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const { full, discount, sale } = bundlePrice();
  const items = BUNDLE.ids.map(findProduct);

  return (
    <article className="bundle co-card">
      <div className="bundle__thumbs" aria-hidden="true">
        {items.map((p, i) => (
          <span key={p.id} className="bundle__thumb">
            {i > 0 && <b className="bundle__plus">+</b>}
            <ProductThumb id={p.id} />
          </span>
        ))}
      </div>
      <div className="bundle__body">
        <p className="eyebrow">세트 할인 10%</p>
        <h3 className="bundle__name">방 전체를 같은 빛으로, 루무드 세트</h3>
        <p className="bundle__desc">
          {items.map((p) => p.name).join(' + ')}. 침대 옆엔 무드 조명, 천장엔 전구를 끼워 한 장면으로 함께 켜세요.
        </p>
        <p className="bundle__price">
          <del>{formatWon(full)}</del>
          <strong>{formatWon(sale)}</strong>
          <span className="bundle__save">{formatWon(discount)} 할인</span>
        </p>
        <div className="bundle__actions">
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              BUNDLE.ids.forEach((id) => add(id, 1));
              setAdded(true);
            }}
          >
            세트 담기
          </button>
          <button type="button" className="btn btn--primary" onClick={() => navigate(`/checkout?item=${BUNDLE.ids.join(',')}`)}>
            세트 바로 구매
          </button>
        </div>
        <p className="pcard__added" role="status">
          {added && (
            <>
              세트를 장바구니에 담았어요 · <Link to="/cart">장바구니 보기</Link>
            </>
          )}
        </p>
      </div>
    </article>
  );
}
