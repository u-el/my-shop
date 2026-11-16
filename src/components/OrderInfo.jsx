import { formatWon } from '../data/content.js';
import { orderLines } from '../data/products.js';

// 주문 상세 표 — 주문 완료와 주문 조회에서 함께 쓴다
export default function OrderInfo({ order, showStatus = false }) {
  return (
    <dl className="done__info co-card">
      <div>
        <dt>주문 번호</dt>
        <dd>{order.no}</dd>
      </div>
      {showStatus && (
        <div>
          <dt>주문 상태</dt>
          <dd>
            결제 완료 <span className="order-status__demo">데모</span>
          </dd>
        </div>
      )}
      {order.orderedAt && (
        <div>
          <dt>주문 일시</dt>
          <dd>{new Date(order.orderedAt).toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' })}</dd>
        </div>
      )}
      <div>
        <dt>상품</dt>
        <dd className="order-lines">
          {orderLines(order).map((l) => (
            <span key={l.id}>
              {l.name} × {l.qty}
            </span>
          ))}
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
        <dt>받는 분</dt>
        <dd>{order.name}</dd>
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
  );
}
