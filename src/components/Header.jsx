import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

// 이미 주문 중인 화면에서는 장바구니 버튼을 숨긴다
const ORDER_PATHS = ['/checkout', '/order-complete'];

// GNB: M-01 로고 · M-02 체험하기 · M-03 제품 · M-05 로그인/마이페이지 · M-04 장바구니
export default function Header() {
  // 스크롤을 조금이라도 내리면 헤더에 그림자를 깔아 내용과 구분한다
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const ordering = ORDER_PATHS.includes(pathname);
  const { count } = useCart();
  const { user } = useAuth();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`gnb${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container gnb__inner">
        <Link to="/" className="gnb__logo" aria-label="LUMOOD 메인으로">
          LUMOOD
        </Link>
        <nav className="gnb__nav">
          <NavLink to="/experience">체험하기</NavLink>
          <NavLink to="/product">제품</NavLink>
          <NavLink to={user ? '/mypage' : '/login'} className="gnb__account" aria-label={user ? '마이페이지' : '로그인'}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" />
            </svg>
            <span className="gnb__account-label">{user ? '마이페이지' : '로그인'}</span>
          </NavLink>
          {!ordering && (
            <Link to="/cart" className="gnb__buy" aria-label={count ? `장바구니, ${count}개 담김` : '장바구니'}>
              장바구니
              {count > 0 && <span className="gnb__count">{count}</span>}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
