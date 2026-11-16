import { Link, useNavigate } from 'react-router-dom';
import { formatWon } from '../data/content.js';
import { PRODUCTS, findProduct } from '../data/products.js';
import { BUNDLE, bundlePrice, priceLines } from '../data/pricing.js';
import { useCart } from '../context/CartContext.jsx';
import QtyStepper from '../components/QtyStepper.jsx';
import Reveal from '../components/Reveal.jsx';
import { ProductThumb } from '../components/ProductVisual.jsx';

// P-08 장바구니
export default function Cart() {
  const { items, add, setQty, remove } = useCart();
  const navigate = useNavigate();
  const lines = items.map((l) => ({ ...l, product: findProduct(l.id) })).filter((l) => l.product);
  const { subtotal, sets, discount, shipping, total } = priceLines(items);
  // 아직 담지 않은 상품은 아래에서 세트 할인과 함께 권한다
  const missing = PRODUCTS.filter((p) => !items.some((l) => l.id === p.id));

  return (
    <section className="section section--tight">
      <div className="container">
        <Reveal as="header" className="page-head">
          <p className="eyebrow">장바구니</p>
          <h1>담은 상품</h1>
        </Reveal>

        {!lines.length ? (
          <div className="cart-empty co-card">
            <p>장바구니가 비어 있어요.</p>
            <Link to="/product" className="btn btn--primary">
              제품 보러 가기
            </Link>
          </div>
        ) : (
          <div className="checkout">
            <div className="checkout__main">
              <ul className="cart-list co-card">
                {lines.map((l) => (
                  <li key={l.id} className="co-item">
                    <Link to={`/product/${l.id}`} tabIndex={-1}>
                      <ProductThumb id={l.id} />
                    </Link>
                    <div className="co-item__info">
                      <Link to={`/product/${l.id}`} className="co-item__name">
                        {l.product.name}
                      </Link>
                      <span className="co-item__price">{formatWon(l.product.price)}</span>
                    </div>
                    <QtyStepper value={l.qty} onChange={(q) => setQty(l.id, q)} label={`${l.product.name} 수량`} />
                    <strong className="co-item__sum">{formatWon(l.product.price * l.qty)}</strong>
                    <button type="button" className="co-item__remove" onClick={() => remove(l.id)} aria-label={`${l.product.name} 빼기`}>
                      ×
                    </button>
                  </li>
                ))}
              </ul>
              {missing.length > 0 && (
                <div className="cart-suggest co-card">
                  {missing.map((p) => (
                    <p key={p.id}>
                      <span>
                        <Link to={`/product/${p.id}`}>{p.name}</Link>도 같은 색으로 함께 켤 수 있어요.{' '}
                        <strong>함께 사면 {formatWon(bundlePrice().discount)} 할인</strong>
                      </span>
                      <button type="button" className="btn btn--ghost" onClick={() => add(p.id, 1)}>
                        함께 담기
                      </button>
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div className="checkout__summary co-card">
              <h2 className="co-card__title">결제 예정 금액</h2>
              <dl className="co-sum">
                <div>
                  <dt>상품 금액</dt>
                  <dd>{formatWon(subtotal)}</dd>
                </div>
                {discount > 0 && (
                  <div className="co-sum__discount">
                    <dt>
                      {BUNDLE.label} × {sets}
                    </dt>
                    <dd>−{formatWon(discount)}</dd>
                  </div>
                )}
                <div>
                  <dt>배송비</dt>
                  <dd>{shipping ? formatWon(shipping) : '무료'}</dd>
                </div>
                <div className="co-sum__total">
                  <dt>합계</dt>
                  <dd>{formatWon(total)}</dd>
                </div>
              </dl>
              <button type="button" className="btn btn--primary btn--block btn--lg" onClick={() => navigate('/checkout')}>
                {formatWon(total)} 주문하기
              </button>
              <Link to="/product" className="co-back">
                ← 쇼핑 계속하기
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
