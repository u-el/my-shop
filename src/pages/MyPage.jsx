import { useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { formatWon } from '../data/content.js';
import { orderLines } from '../data/products.js';
import { ordersOf } from '../data/orders.js';
import { useAuth } from '../context/AuthContext.jsx';
import OrderInfo from '../components/OrderInfo.jsx';
import Reveal from '../components/Reveal.jsx';

const fmtDate = (iso, time = false) =>
  iso ? new Date(iso).toLocaleString('ko-KR', time ? { dateStyle: 'medium', timeStyle: 'short' } : { dateStyle: 'long' }) : '';

const orderTitle = (order) => {
  const lines = orderLines(order);
  return lines.length > 1 ? `${lines[0].name} 외 ${lines.length - 1}건` : `${lines[0].name} × ${lines[0].qty}`;
};

// P-11 마이페이지 (데모 회원)
export default function MyPage() {
  const { user, logout, withdraw, saveAddress } = useAuth();
  const navigate = useNavigate();
  const [confirmWithdraw, setConfirmWithdraw] = useState(false);
  // 로그아웃·탈퇴하면 메인으로 보낸다.
  // 페이지 이동은 조금 늦게 반영되므로, 그 사이 '로그인 필요' 이동이 일어나지 않게 표시해 둔다
  const leaving = useRef(false);
  const leaveThen = (action) => {
    leaving.current = true;
    navigate('/', { replace: true });
    action();
  };

  if (!user) return leaving.current ? null : <Navigate to="/login?next=/mypage" replace />;

  const orders = ordersOf(user.email);
  const addr = user.address;

  return (
    <section className="section section--tight">
      <div className="container mypage">
        <Reveal as="header" className="page-head">
          <p className="eyebrow">마이페이지</p>
          <h1>{user.name}님, 반가워요</h1>
          <p>
            {user.email} · {fmtDate(user.createdAt)} 가입
          </p>
          <p className="demo-note">데모 회원이라 정보와 주문 내역은 이 브라우저에만 저장돼요.</p>
        </Reveal>

        <div className="mypage__grid">
          {/* 주문 내역 */}
          <Reveal as="section" className="co-card mypage__orders" delay={0.05}>
            <h2 className="co-card__title">주문 내역</h2>
            {orders.length ? (
              <ul className="mp-orders">
                {orders.map((o) => (
                  <li key={o.no}>
                    <details className="mp-order">
                      <summary>
                        <span className="mp-order__date">{fmtDate(o.orderedAt, true)}</span>
                        <strong className="mp-order__title">{orderTitle(o)}</strong>
                        <span className="mp-order__meta">
                          {o.no} · 결제 완료 <span className="order-status__demo">데모</span>
                        </span>
                        <span className="mp-order__total">{formatWon(o.total)}</span>
                      </summary>
                      <OrderInfo order={o} showStatus />
                    </details>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mp-empty">
                <p>아직 주문 내역이 없어요.</p>
                <Link to="/product" className="btn btn--primary">
                  제품 보러 가기
                </Link>
              </div>
            )}
          </Reveal>

          <div className="mypage__side">
            {/* 기본 배송지 */}
            <Reveal as="section" className="co-card" delay={0.1}>
              <h2 className="co-card__title">기본 배송지</h2>
              {addr ? (
                <>
                  <p className="mp-addr">
                    {addr.zonecode && <span>[{addr.zonecode}] </span>}
                    {addr.address} {addr.detail}
                  </p>
                  <button type="button" className="mp-link" onClick={() => saveAddress(null)}>
                    배송지 지우기
                  </button>
                </>
              ) : (
                <p className="mp-muted">아직 없어요. 주문할 때 기본 배송지로 저장할 수 있어요.</p>
              )}
            </Reveal>

            {/* 회원 정보 */}
            <Reveal as="section" className="co-card" delay={0.15}>
              <h2 className="co-card__title">회원 정보</h2>
              <dl className="co-sum">
                <div>
                  <dt>이름</dt>
                  <dd>{user.name}</dd>
                </div>
                <div>
                  <dt>휴대폰</dt>
                  <dd>{user.phone}</dd>
                </div>
                <div>
                  <dt>소식 받기</dt>
                  <dd>{user.marketing ? '동의' : '동의 안 함'}</dd>
                </div>
              </dl>
              <div className="mp-actions">
                <button
                  type="button"
                  className="btn btn--ghost btn--block"
                  onClick={() => leaveThen(logout)}
                >
                  로그아웃
                </button>
                {confirmWithdraw ? (
                  <div className="mp-withdraw" role="alert">
                    <p>탈퇴하면 회원 정보와 주문 내역이 이 브라우저에서 모두 지워져요. 정말 탈퇴할까요?</p>
                    <div className="mp-withdraw__btns">
                      <button type="button" className="btn btn--ghost" onClick={() => setConfirmWithdraw(false)}>
                        취소
                      </button>
                      <button
                        type="button"
                        className="btn mp-withdraw__yes"
                        onClick={() => leaveThen(withdraw)}
                      >
                        탈퇴하기
                      </button>
                    </div>
                  </div>
                ) : (
                  <button type="button" className="mp-link" onClick={() => setConfirmWithdraw(true)}>
                    회원 탈퇴
                  </button>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
