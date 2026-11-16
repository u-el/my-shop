import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PRESETS, SHIP_SUMMARY, formatWon } from '../data/content.js';
import { PRODUCTS, findProduct } from '../data/products.js';
import { useLight } from '../context/LightContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import Reveal from '../components/Reveal.jsx';
import QtyStepper from '../components/QtyStepper.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { ProductImage } from '../components/ProductVisual.jsx';
import NotFound from './NotFound.jsx';

// 배송·교환 요약 아이콘
const SHIP_ICONS = {
  truck: <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7M7 18.5a1.5 1.5 0 1 0 0-.01M17 18.5a1.5 1.5 0 1 0 0-.01" />,
  return: <path d="M4 9h11a5 5 0 0 1 0 10H9M4 9l4-4M4 9l4 4" />,
  shield: <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6zM9 12l2 2 4-4" />,
};

// P-03 상품 상세 (/product/:id) — 체험 후 구매 결정을 돕는다
export default function Product() {
  const { id } = useParams();
  const product = findProduct(id);
  if (!product) return <NotFound />;
  // 상품이 바뀌면 수량·담기 상태를 처음부터
  return <ProductDetail key={product.id} product={product} />;
}

function ProductDetail({ product }) {
  const { presetId, color, brightness } = useLight();
  const moodName = presetId ? PRESETS.find((p) => p.id === presetId).name : '나만의 조합';
  const navigate = useNavigate();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const others = PRODUCTS.filter((p) => p.id !== product.id);

  const buy = () => navigate(`/checkout?item=${product.id}&qty=${qty}`);
  const addToCart = () => {
    add(product.id, qty);
    setAdded(true);
  };

  return (
    <>
      {/* S-03-01 상세 정보 */}
      <section className="section section--tight">
        <div className="container detail">
          <Reveal className="detail__visual" from="scale">
            <ProductImage id={product.id} color={color.hex} brightness={brightness} alt={`${product.name} 제품 이미지`} />
          </Reveal>
          <Reveal className="detail__copy" from="right" delay={0.15}>
            <p className="eyebrow">
              <Link to="/product">제품</Link> · {product.short}
            </p>
            <h1>{product.name}</h1>
            <p className="detail__price">
              <strong>{product.price.toLocaleString('ko-KR')}</strong>원
            </p>
            <p className="detail__summary">{product.summary}</p>
            <dl className="specs">
              {product.specs.map((s, i) => (
                <Reveal key={s.label} className="specs__row" delay={0.3 + i * 0.07}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </Reveal>
              ))}
            </dl>
            {/* B-02 구매 — 수량을 고르고 장바구니에 담거나 바로 주문서로 */}
            <div className="purchase">
              <div className="purchase__row">
                <span className="purchase__label">수량</span>
                <QtyStepper value={qty} onChange={setQty} />
                <span className="purchase__total">
                  총 <strong>{formatWon(product.price * qty)}</strong>
                </span>
              </div>
              <div className="purchase__btns">
                <button type="button" className="btn btn--ghost btn--lg" onClick={addToCart}>
                  장바구니 담기
                </button>
                <button type="button" className="btn btn--primary btn--lg" onClick={buy}>
                  바로 구매하기
                </button>
              </div>
              <p className="purchase__added" role="status">
                {added && (
                  <>
                    장바구니에 담았어요 · <Link to="/cart">장바구니 보기</Link>
                  </>
                )}
              </p>
              <ul className="perks">
                {SHIP_SUMMARY.map((s) => (
                  <li key={s.title}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      {SHIP_ICONS[s.icon]}
                    </svg>
                    <span>
                      <strong>{s.title}</strong>
                      {s.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* S-03-03 자주 묻는 질문 */}
      <section className="section faq">
        <div className="container faq__inner">
          <Reveal as="header" className="faq__head">
            <p className="eyebrow">자주 묻는 질문</p>
            <h2>구매 전에 궁금한 점</h2>
          </Reveal>
          <Reveal className="faq__list" delay={0.1}>
            {product.faqs.map((f) => (
              <details key={f.q} className="faq__item">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* S-03-02 구매 */}
      <section className="section buy">
        <Reveal className="container buy__inner">
          <h2>체험한 분위기 그대로, 내 방으로</h2>
          <p>방금 고른 분위기를 기억해 두세요. 제품을 받으면 같은 색과 밝기로 바로 켤 수 있어요.</p>
          <div className="buy__mood">
            <i style={{ background: color.hex }} />
            {moodName} · {color.name} · {brightness}%
            <Link to="/experience">다시 체험하기</Link>
          </div>
          <button type="button" className="btn btn--primary btn--lg" onClick={buy}>
            {formatWon(product.price * qty)} · 바로 구매하기
          </button>
        </Reveal>
      </section>

      {/* S-03-05 함께 쓰면 좋은 제품 */}
      {others.length > 0 && (
        <section className="section together">
          <div className="container">
            <Reveal as="header" className="together__head">
              <p className="eyebrow">함께 쓰면 좋아요</p>
              <h2>같은 색으로 방 전체를 맞춰 보세요</h2>
            </Reveal>
            <div className="plist plist--single">
              {others.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* S-03-04 상품정보제공고시 */}
      <section className="section section--tight notice">
        <div className="container">
          <h2 className="notice__title">상품정보제공고시</h2>
          <table className="notice__table">
            <tbody>
              {product.notice.map((n) => (
                <tr key={n.label}>
                  <th scope="row">{n.label}</th>
                  <td>{n.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
