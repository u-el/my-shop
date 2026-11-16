import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import BundleCard from '../components/BundleCard.jsx';
import Reveal from '../components/Reveal.jsx';

// P-03 제품 목록 — 무드 조명 · 스마트 전구
export default function ProductList() {
  return (
    <section className="section section--tight">
      <div className="container">
        <Reveal as="header" className="page-head">
          <p className="eyebrow">제품</p>
          <h1>내 방에 맞는 빛을 골라 보세요</h1>
          <p>
            어디에나 두는 무드 조명, 방 전체를 바꾸는 스마트 전구. 같은 앱에서 같은 색으로 함께 켤 수 있어요.{' '}
            <Link to="/experience">체험</Link>에서 고른 빛 색으로 보여 드려요.
          </p>
        </Reveal>
        <div className="plist">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.id} delay={0.1 + i * 0.1}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
        <Reveal className="bundle-wrap" delay={0.2}>
          <BundleCard />
        </Reveal>
      </div>
    </section>
  );
}
