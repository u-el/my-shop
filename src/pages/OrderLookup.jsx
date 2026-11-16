import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { clearOrders, findOrder, hasSavedOrders } from '../data/orders.js';
import OrderInfo from '../components/OrderInfo.jsx';
import Reveal from '../components/Reveal.jsx';

// P-07 비회원 주문 조회 — 주문 번호와 휴대폰 번호로 찾는다 (데모: 이 브라우저의 주문만)
export default function OrderLookup() {
  const [params] = useSearchParams();
  const [no, setNo] = useState(params.get('no') ?? '');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);
  const [cleared, setCleared] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!no.trim() || !phone.trim()) {
      setError('주문 번호와 휴대폰 번호를 모두 입력해 주세요.');
      setOrder(null);
      return;
    }
    const found = findOrder(no, phone);
    setOrder(found);
    setError(found ? '' : '일치하는 주문이 없어요. 주문 번호와 휴대폰 번호를 다시 확인해 주세요.');
  };

  const clear = () => {
    clearOrders();
    setOrder(null);
    setError('');
    setCleared(true);
  };

  return (
    <section className="section section--tight">
      <div className="container lookup">
        <Reveal as="header" className="page-head">
          <p className="eyebrow">비회원 주문 조회</p>
          <h1>주문 조회</h1>
          <p>주문 완료 화면에 나온 주문 번호와, 주문할 때 입력한 휴대폰 번호로 찾을 수 있어요.</p>
          <p className="demo-note">데모라서 이 브라우저에서 한 주문만 조회돼요.</p>
        </Reveal>

        <Reveal as="form" className="co-card lookup__form" onSubmit={submit} noValidate delay={0.1}>
          <label className="co-field">
            <span>주문 번호</span>
            <input
              value={no}
              onChange={(e) => setNo(e.target.value)}
              placeholder="LM-20261116-0000"
              autoCapitalize="characters"
              spellCheck={false}
            />
          </label>
          <label className="co-field">
            <span>휴대폰 번호</span>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="010-1234-5678"
            />
          </label>
          <button type="submit" className="btn btn--primary btn--block">
            조회하기
          </button>
          {error && (
            <p className="co-error lookup__error" role="alert">
              {error}
            </p>
          )}
        </Reveal>

        {order && (
          <div className="lookup__result" aria-live="polite">
            <OrderInfo order={order} showStatus />
          </div>
        )}

        <div className="lookup__foot">
          {hasSavedOrders() ? (
            <button type="button" className="lookup__clear" onClick={clear}>
              이 브라우저에 저장된 주문 기록 지우기
            </button>
          ) : (
            cleared && <p>저장된 주문 기록을 지웠어요.</p>
          )}
          <Link to="/product">상품 보러 가기</Link>
        </div>
      </div>
    </section>
  );
}
