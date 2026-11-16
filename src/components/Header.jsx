import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

// 이미 주문 중인 화면에서는 장바구니 버튼을 숨긴다
const ORDER_PATHS = ['/checkout', '/order-complete'];

// GNB: M-01 로고 · M-02 체험하기 · M-03 제품 · M-05 로그인/마이페이지 · M-04 장바구니
// 좁은 화면(560px 이하)에서는 메뉴를 햄버거 버튼 아래 패널로 접는다
export default function Header() {
  // 스크롤을 조금이라도 내리면 헤더에 그림자를 깔아 내용과 구분한다
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const ordering = ORDER_PATHS.includes(pathname);
  const { count } = useCart();
  const { user } = useAuth();
  const menuBtn = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 다른 페이지로 가면 메뉴를 닫는다
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Esc로 닫고 메뉴 버튼으로 포커스를 돌린다
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const account = user ? { to: '/mypage', label: '마이페이지' } : { to: '/login', label: '로그인' };

  return (
    <header className={`gnb${scrolled || open ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="container gnb__inner">
        <Link to="/" className="gnb__logo" aria-label="LUMOOD 메인으로">
          LUMOOD
        </Link>
        <nav className="gnb__nav" aria-label="주 메뉴">
          <div className="gnb__links" id="gnb-menu">
            <NavLink to="/experience">체험하기</NavLink>
            <NavLink to="/product">제품</NavLink>
            <NavLink to={account.to} className="gnb__account">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" />
              </svg>
              {account.label}
            </NavLink>
          </div>
          {!ordering && (
            <Link to="/cart" className="gnb__buy" aria-label={count ? `장바구니, ${count}개 담김` : '장바구니'}>
              장바구니
              {count > 0 && <span className="gnb__count">{count}</span>}
            </Link>
          )}
          <button
            ref={menuBtn}
            type="button"
            className="gnb__menu"
            aria-expanded={open}
            aria-controls="gnb-menu"
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
            onClick={() => setOpen((o) => !o)}
          >
            <span aria-hidden="true" />
          </button>
        </nav>
      </div>
    </header>
  );
}
