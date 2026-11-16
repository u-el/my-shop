import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

// GNB: M-01 로고 · M-02 체험하기 · M-03 상품 정보
export default function Header() {
  // 스크롤을 조금이라도 내리면 헤더에 그림자를 깔아 내용과 구분한다
  const [scrolled, setScrolled] = useState(false);
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
          <NavLink to="/product">상품 정보</NavLink>
        </nav>
      </div>
    </header>
  );
}
