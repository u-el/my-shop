import { useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Reveal from '../components/Reveal.jsx';

// 로그인 뒤 돌아갈 주소는 사이트 안 경로만 허용한다
export const safeNext = (next) => (next && next.startsWith('/') && !next.startsWith('//') ? next : '/mypage');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^01[016789]-?\d{3,4}-?\d{4}$/;

const without = (obj, key) => {
  const next = { ...obj };
  delete next[key];
  return next;
};

// P-09 회원가입 (데모)
export default function Signup() {
  const { user, exists, signup } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = safeNext(params.get('next'));
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', phone: '' });
  const [agree, setAgree] = useState({ terms: false, privacy: false, marketing: false });
  const [errors, setErrors] = useState({});

  if (user) return <Navigate to={next} replace />;

  const field = (key) => ({
    id: `su-${key}`,
    value: form[key],
    onChange: (e) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => without(prev, key));
    },
    'aria-invalid': errors[key] ? true : undefined,
  });
  const allAgreed = agree.terms && agree.privacy && agree.marketing;
  const toggleAll = (checked) => {
    setAgree({ terms: checked, privacy: checked, marketing: checked });
    if (checked) setErrors((prev) => without(prev, 'agree'));
  };
  const toggle = (key) => (e) => {
    setAgree((a) => ({ ...a, [key]: e.target.checked }));
    if (errors.agree) setErrors((prev) => without(prev, 'agree'));
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = {};
    if (!form.name.trim()) e.name = '이름을 입력해 주세요.';
    if (!EMAIL_RE.test(form.email.trim())) e.email = '이메일 주소를 정확히 입력해 주세요.';
    else if (exists(form.email)) e.email = '이미 가입한 이메일이에요. 로그인해 주세요.';
    if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(form.password)) e.password = '영문과 숫자를 섞어 8자 이상으로 만들어 주세요.';
    if (form.confirm !== form.password || !form.confirm) e.confirm = '비밀번호가 서로 달라요.';
    if (!PHONE_RE.test(form.phone.trim())) e.phone = '휴대폰 번호를 정확히 입력해 주세요. (예: 010-1234-5678)';
    if (!agree.terms || !agree.privacy) e.agree = '필수 약관에 동의해 주세요.';
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      document.getElementById(first === 'agree' ? 'su-agree-terms' : `su-${first}`)?.focus();
      return;
    }
    signup({ email: form.email, name: form.name, phone: form.phone, marketing: agree.marketing });
    navigate(next, { replace: true });
  };

  return (
    <section className="section section--tight">
      <div className="container auth">
        <Reveal as="header" className="page-head auth__head">
          <p className="eyebrow">회원가입</p>
          <h1>루무드 회원이 되어 보세요</h1>
          <p>배송지를 저장해 두고, 주문 내역을 마이페이지에서 한눈에 볼 수 있어요.</p>
          <p className="demo-note">데모 회원 기능이에요. 정보는 이 브라우저에만 저장되고, 비밀번호는 저장하지 않아요.</p>
        </Reveal>

        <Reveal as="form" className="co-card auth__form" onSubmit={submit} noValidate delay={0.1}>
          <label className="co-field">
            <span>이름</span>
            <input autoComplete="name" {...field('name')} />
            {errors.name && <em className="co-error">{errors.name}</em>}
          </label>
          <label className="co-field">
            <span>이메일</span>
            <input type="email" autoComplete="email" placeholder="you@example.com" {...field('email')} />
            {errors.email && <em className="co-error">{errors.email}</em>}
          </label>
          <label className="co-field">
            <span>비밀번호</span>
            <input type="password" autoComplete="new-password" placeholder="영문·숫자 포함 8자 이상" {...field('password')} />
            {errors.password && <em className="co-error">{errors.password}</em>}
          </label>
          <label className="co-field">
            <span>비밀번호 확인</span>
            <input type="password" autoComplete="new-password" {...field('confirm')} />
            {errors.confirm && <em className="co-error">{errors.confirm}</em>}
          </label>
          <label className="co-field">
            <span>휴대폰 번호</span>
            <input type="tel" inputMode="tel" autoComplete="tel" placeholder="010-1234-5678" {...field('phone')} />
            {errors.phone && <em className="co-error">{errors.phone}</em>}
          </label>

          <fieldset className="auth__agree">
            <legend className="sr-only">약관 동의</legend>
            <label className="co-agree auth__agree-all">
              <input type="checkbox" checked={allAgreed} onChange={(e) => toggleAll(e.target.checked)} />
              전체 동의
            </label>
            <label className="co-agree">
              <input id="su-agree-terms" type="checkbox" checked={agree.terms} onChange={toggle('terms')} />
              <span>
                [필수] <Link to="/terms">이용약관</Link>에 동의해요.
              </span>
            </label>
            <label className="co-agree">
              <input type="checkbox" checked={agree.privacy} onChange={toggle('privacy')} />
              <span>
                [필수] <Link to="/privacy">개인정보 수집·이용</Link>에 동의해요.
              </span>
            </label>
            <label className="co-agree">
              <input type="checkbox" checked={agree.marketing} onChange={toggle('marketing')} />
              [선택] 새 제품과 할인 소식을 받을게요.
            </label>
            {errors.agree && <em className="co-error">{errors.agree}</em>}
          </fieldset>

          <button type="submit" className="btn btn--primary btn--block btn--lg">
            가입하기
          </button>
          <p className="auth__switch">
            이미 회원인가요? <Link to={`/login?next=${encodeURIComponent(next)}`}>로그인</Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
