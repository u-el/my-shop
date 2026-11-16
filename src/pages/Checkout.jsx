import { useCallback, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { CHECKOUT, PRESETS, PRODUCT, formatWon } from '../data/content.js';
import { useLight } from '../context/LightContext.jsx';
import QtyStepper from '../components/QtyStepper.jsx';
import AddressSearch from '../components/AddressSearch.jsx';
import { saveOrder } from '../data/orders.js';
import DemoPaySheet from '../components/DemoPaySheet.jsx';
import Reveal from '../components/Reveal.jsx';
import lampPhoto from '../assets/product-lamp.jpg';

const MEMOS = ['문 앞에 놓아 주세요', '경비실에 맡겨 주세요', '배송 전에 연락 주세요', '직접 입력'];

// 객체에서 키 하나를 뺀 새 객체
const without = (obj, key) => {
  const next = { ...obj };
  delete next[key];
  return next;
};

const makeOrderNo = () => {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  return `LM-${ymd}-${Math.floor(1000 + Math.random() * 9000)}`;
};

// P-04 주문서 — 데모 결제: 입력 확인 후 실제 결제 없이 주문 완료로 넘어간다
export default function Checkout() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { presetId, color, brightness } = useLight();
  const moodName = presetId ? PRESETS.find((p) => p.id === presetId).name : '나만의 조합';

  const [qty, setQty] = useState(() => {
    const n = Number(params.get('qty'));
    return Number.isInteger(n) && n >= 1 ? Math.min(n, CHECKOUT.maxQty) : 1;
  });
  const [form, setForm] = useState({ name: '', phone: '', zonecode: '', address: '', detail: '', memo: MEMOS[0], memoText: '' });
  const [pay, setPay] = useState(CHECKOUT.payMethods[0].id);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [paying, setPaying] = useState(false);
  // 간편결제 데모 승인 창에 넘길 주문 (null이면 닫힘)
  const [sheetOrder, setSheetOrder] = useState(null);
  const [payNotice, setPayNotice] = useState('');
  const method = CHECKOUT.payMethods.find((m) => m.id === pay);
  const [addrOpen, setAddrOpen] = useState(false);
  const closeAddr = useCallback(() => setAddrOpen(false), []);
  // 주소 검색에서 고르면 우편번호·주소를 채우고 상세 주소 칸으로 이동
  const pickAddress = useCallback(({ zonecode, address }) => {
    setForm((f) => ({ ...f, zonecode, address }));
    setErrors((prev) => without(prev, 'address'));
    setTimeout(() => document.getElementById('co-detail')?.focus(), 0);
  }, []);

  const subtotal = PRODUCT.price * qty;
  const total = subtotal + CHECKOUT.shippingFee;
  const field = (key) => ({
    value: form[key],
    onChange: (e) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      // 고치기 시작하면 그 칸의 오류 문구는 바로 지운다
      if (errors[key]) setErrors((prev) => without(prev, key));
    },
    'aria-invalid': errors[key] ? true : undefined,
  });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = '받는 분 이름을 입력해 주세요.';
    if (!/^01[016789]-?\d{3,4}-?\d{4}$/.test(form.phone.trim())) e.phone = '휴대폰 번호를 정확히 입력해 주세요. (예: 010-1234-5678)';
    if (!form.address.trim()) e.address = '주소 검색으로 배송 주소를 입력해 주세요.';
    if (!agree) e.agree = '주문 내용 확인에 동의해 주세요.';
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`co-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    setPaying(true);
    const order = {
      no: makeOrderNo(),
      qty,
      total,
      pay: method.name,
      name: form.name.trim(),
      phone: form.phone.trim(),
      orderedAt: new Date().toISOString(),
      address: `${form.zonecode ? `[${form.zonecode}] ` : ''}${form.address.trim()} ${form.detail.trim()}`.trim(),
      mood: `${moodName} · ${color.name} · ${brightness}%`,
      colorHex: color.hex,
    };
    setPayNotice('');
    // 간편결제는 데모 승인 창을 먼저 띄운다
    if (method.easy) {
      setSheetOrder(order);
      return;
    }
    // 데모: 결제창 대신 잠깐 기다린 뒤 완료 화면으로
    setTimeout(() => complete(order), 900);
  };

  const complete = (order) => {
    saveOrder(order);
    navigate('/order-complete', { state: order, replace: true });
  };
  const approveSheet = () => complete(sheetOrder);
  const cancelSheet = useCallback(() => {
    setSheetOrder(null);
    setPaying(false);
    setPayNotice('결제를 취소했어요. 다시 시도하거나 다른 결제 수단을 골라 주세요.');
  }, []);

  return (
    <section className="section section--tight">
      <div className="container">
        <Reveal as="header" className="page-head">
          <p className="eyebrow">비회원 주문</p>
          <h1>주문서 작성</h1>
          <p>회원가입 없이 바로 주문할 수 있어요. 주문 후에는 주문 번호와 휴대폰 번호로 주문을 조회할 수 있어요.</p>
          <p className="demo-note">데모 결제예요. 결제 버튼을 눌러도 실제로 돈이 나가지 않아요.</p>
        </Reveal>

        <form className="checkout" onSubmit={submit} noValidate>
          <div className="checkout__main">
            <Reveal as="fieldset" className="co-card">
              <legend className="co-card__title">주문 상품</legend>
              <div className="co-item">
                <img src={lampPhoto} alt="" className="co-item__img" />
                <div className="co-item__info">
                  <strong>{PRODUCT.name}</strong>
                  <span className="co-item__mood">
                    <i style={{ background: color.hex }} />
                    체험한 분위기: {moodName} · {color.name} · {brightness}%
                  </span>
                  <span className="co-item__price">{formatWon(PRODUCT.price)}</span>
                </div>
                <QtyStepper value={qty} onChange={setQty} />
              </div>
            </Reveal>

            <Reveal as="fieldset" className="co-card" delay={0.05}>
              <legend className="co-card__title">배송 정보</legend>
              <div className="co-grid">
                <label className="co-field">
                  <span>받는 분</span>
                  <input id="co-name" autoComplete="name" placeholder="이름" {...field('name')} />
                  {errors.name && <em className="co-error">{errors.name}</em>}
                </label>
                <label className="co-field">
                  <span>휴대폰 번호</span>
                  <input id="co-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="010-1234-5678" {...field('phone')} />
                  {errors.phone && <em className="co-error">{errors.phone}</em>}
                </label>
                <div className="co-field co-field--wide">
                  <label htmlFor="co-address">주소</label>
                  <div className="co-addr">
                    <input className="co-addr__zip" aria-label="우편번호" placeholder="우편번호" value={form.zonecode} readOnly tabIndex={-1} />
                    <button type="button" className="btn btn--ghost co-addr__btn" onClick={() => setAddrOpen(true)}>
                      주소 검색
                    </button>
                  </div>
                  <input
                    id="co-address"
                    autoComplete="street-address"
                    placeholder="주소 검색 버튼을 눌러 도로명 주소를 찾아 주세요"
                    {...field('address')}
                  />
                  {errors.address && <em className="co-error">{errors.address}</em>}
                </div>
                <label className="co-field co-field--wide">
                  <span>상세 주소</span>
                  <input id="co-detail" autoComplete="address-line2" placeholder="동·호수 (선택)" {...field('detail')} />
                </label>
                <label className="co-field co-field--wide">
                  <span>배송 메모</span>
                  <select {...field('memo')}>
                    {MEMOS.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                  {form.memo === '직접 입력' && <input placeholder="배송 기사님께 남길 말" {...field('memoText')} />}
                </label>
              </div>
            </Reveal>

            <Reveal as="fieldset" className="co-card" delay={0.1}>
              <legend className="co-card__title">결제 수단</legend>
              <div className="co-pay">
                {CHECKOUT.payMethods.map((m) => (
                  <label key={m.id} className={`co-pay__opt${pay === m.id ? ' is-active' : ''}`}>
                    <input type="radio" name="pay" value={m.id} checked={pay === m.id} onChange={() => setPay(m.id)} />
                    {m.mark && (
                      <span className={`pay-badge pay-badge--${m.brand}`} aria-hidden="true">
                        {m.mark}
                      </span>
                    )}
                    {m.name}
                  </label>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal as="aside" className="checkout__summary co-card" from="right" delay={0.1}>
            <h2 className="co-card__title">결제 금액</h2>
            <dl className="co-sum">
              <div>
                <dt>상품 금액</dt>
                <dd>
                  {formatWon(PRODUCT.price)} × {qty}
                </dd>
              </div>
              <div>
                <dt>배송비</dt>
                <dd>{CHECKOUT.shippingFee ? formatWon(CHECKOUT.shippingFee) : '무료'}</dd>
              </div>
              <div className="co-sum__total">
                <dt>총 결제 금액</dt>
                <dd>{formatWon(total)}</dd>
              </div>
            </dl>
            <label className="co-agree">
              <input id="co-agree" type="checkbox" checked={agree} onChange={(e) => {
                  setAgree(e.target.checked);
                  if (errors.agree) setErrors((prev) => without(prev, 'agree'));
                }}
              />
              주문 내용을 확인했으며 결제에 동의해요.
            </label>
            {errors.agree && <em className="co-error">{errors.agree}</em>}
            <button type="submit" className="btn btn--primary btn--block btn--lg" disabled={paying}>
              {paying ? '결제 중…' : `${formatWon(total)} ${method.easy ? `${method.name}로 ` : ''}결제하기`}
            </button>
            {payNotice && (
              <p className="co-error co-paynotice" role="status">
                {payNotice}
              </p>
            )}
            <Link to="/product" className="co-back">
              ← 상품 정보로 돌아가기
            </Link>
          </Reveal>
        </form>
        <AddressSearch open={addrOpen} onClose={closeAddr} onSelect={pickAddress} />
        <DemoPaySheet
          method={sheetOrder ? method : null}
          amount={total}
          qty={qty}
          onApprove={approveSheet}
          onCancel={cancelSheet}
        />
      </div>
    </section>
  );
}
