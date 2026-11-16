import { useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Reveal from '../components/Reveal.jsx';
import { safeNext } from './Signup.jsx';

// P-10 로그인 (데모: 가입한 이메일이면 로그인, 비밀번호는 확인하지 않음)
export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = safeNext(params.get('next'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (user) return <Navigate to={next} replace />;

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('이메일과 비밀번호를 입력해 주세요.');
      return;
    }
    if (!login(email)) {
      setError('가입한 이메일이 아니에요. 이메일을 확인하거나 회원가입해 주세요.');
      return;
    }
    navigate(next, { replace: true });
  };

  return (
    <section className="section section--tight">
      <div className="container auth">
        <Reveal as="header" className="page-head auth__head">
          <p className="eyebrow">로그인</p>
          <h1>다시 만나서 반가워요</h1>
          <p className="demo-note">데모 로그인이에요. 이 브라우저에서 가입한 이메일이면 로그인돼요.</p>
        </Reveal>

        <Reveal as="form" className="co-card auth__form" onSubmit={submit} noValidate delay={0.1}>
          <label className="co-field">
            <span>이메일</span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
            />
          </label>
          <label className="co-field">
            <span>비밀번호</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
            />
          </label>
          {error && (
            <p className="co-error auth__error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="btn btn--primary btn--block btn--lg">
            로그인
          </button>
          <p className="auth__switch">
            아직 회원이 아닌가요? <Link to={`/signup?next=${encodeURIComponent(next)}`}>회원가입</Link>
          </p>
          <p className="auth__switch">
            회원가입 없이 주문하셨나요? <Link to="/order-lookup">비회원 주문 조회</Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
