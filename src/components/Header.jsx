import { Link, NavLink } from 'react-router-dom';

// GNB: M-01 로고 · M-02 체험하기 · M-03 상품 정보
export default function Header() {
  return (
    <header className="gnb">
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
