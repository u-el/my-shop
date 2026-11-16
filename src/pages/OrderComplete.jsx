import { Link, useLocation } from 'react-router-dom';
import { PRODUCT, formatWon } from '../data/content.js';
import Reveal from '../components/Reveal.jsx';

const readLastOrder = () => {
  try {
    return JSON.parse(sessionStorage.getItem('lumood:lastOrder'));
  } catch {
    return null;
  }
};

// P-05 주문 완료 — 새로고침해도 같은 탭에서는 마지막 주문을 다시 보여 준다
export default function OrderComplete() {
  const { state } = useLocation();
  const order = state ?? readLastOrder();

  if (!order) {
    return (
      <section className="section section--tight">
        <div className="container done">
          <h1>주문 내역이 없어요</h1>
          <p className="done__lead">상품 정보에서 다시 주문해 주세요.</p>
          <Link to="/product" className="btn btn--primary">
            상품 정보 보기
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section section--tight">
      <Reveal className="container done" from="scale">
        <span className="done__check" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </span>
        <p className="eyebrow">주문 완료</p>
        <h1>주문해 주셔서 고마워요</h1>
        <p className="done__lead">
          {order.name}님, 곧 {PRODUCT.name}가 따뜻한 빛을 들고 찾아갈게요.
        </p>
        <p className="demo-note">데모 주문이라 실제 결제와 배송은 이루어지지 않아요.</p>

        <dl className="done__info co-card">
          <div>
            <dt>주문 번호</dt>
            <dd>{order.no}</dd>
          </div>
          <div>
            <dt>상품</dt>
            <dd>
              {PRODUCT.name} × {order.qty}
            </dd>
          </div>
          <div>
            <dt>체험한 분위기</dt>
            <dd>
              <i style={{ background: order.colorHex }} />
              {order.mood}
            </dd>
          </div>
          <div>
            <dt>배송지</dt>
            <dd>{order.address}</dd>
          </div>
          <div>
            <dt>결제 수단</dt>
            <dd>{order.pay}</dd>
          </div>
          <div className="done__total">
            <dt>결제 금액</dt>
            <dd>{formatWon(order.total)}</dd>
          </div>
        </dl>

        <div className="done__actions">
          <Link to="/" className="btn btn--ghost">
            메인으로
          </Link>
          <Link to="/experience" className="btn btn--primary">
            다른 분위기 체험하기
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
