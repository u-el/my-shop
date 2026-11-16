import { Link, useLocation } from 'react-router-dom';
import { readLastOrder } from '../data/orders.js';
import OrderInfo from '../components/OrderInfo.jsx';
import Reveal from '../components/Reveal.jsx';

// P-05 주문 완료 — 새로고침해도 같은 탭에서는 마지막 주문을 다시 보여 준다
export default function OrderComplete() {
  const { state } = useLocation();
  const order = state ?? readLastOrder();

  if (!order) {
    return (
      <section className="section section--tight">
        <div className="container done">
          <h1>주문 내역이 없어요</h1>
          <p className="done__lead">제품 페이지에서 다시 주문해 주세요.</p>
          <Link to="/product" className="btn btn--primary">
            제품 보러 가기
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
          {order.name}님, 주문하신 루무드가 곧 따뜻한 빛을 들고 찾아갈게요.
        </p>
        <p className="demo-note">데모 주문이라 실제 결제와 배송은 이루어지지 않아요.</p>

        <OrderInfo order={order} />
        <p className="done__hint">
          주문 번호 <strong>{order.no}</strong>와 휴대폰 번호로 언제든 주문을 조회할 수 있어요.
        </p>

        <div className="done__actions">
          <Link to={`/order-lookup?no=${order.no}`} className="btn btn--ghost">
            주문 조회
          </Link>
          <Link to="/experience" className="btn btn--primary">
            다른 분위기 체험하기
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
