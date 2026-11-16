import { Link } from 'react-router-dom';
import { COMPANY } from '../data/content.js';

// 쇼핑몰 푸터: 브랜드 · 쇼핑 바로가기 · 고객센터 / 사업자 정보 · 약관
export default function Footer() {
  const { cs } = COMPANY;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="gnb__logo">
              LUMOOD
            </Link>
            <p>나만의 공간을 비추는 스마트 무드 조명</p>
          </div>

          <nav className="footer__col" aria-label="쇼핑 바로가기">
            <h2 className="footer__title">쇼핑</h2>
            <Link to="/experience">가상 체험하기</Link>
            <Link to="/product">상품 정보</Link>
            <Link to="/checkout">바로 구매하기</Link>
          </nav>

          <div className="footer__col footer__cs">
            <h2 className="footer__title">고객센터</h2>
            <a className="footer__phone" href={`tel:${cs.phone}`}>
              {cs.phone}
            </a>
            <p>
              {cs.hours}
              <br />
              {cs.lunch} · {cs.off}
            </p>
            <a href={`mailto:${cs.email}`}>{cs.email}</a>
          </div>
        </div>

        <div className="footer__bottom">
          {/* 약관 페이지는 아직 없어 글자로만 둔다 */}
          <ul className="footer__policy">
            <li>이용약관</li>
            <li>
              <strong>개인정보처리방침</strong>
            </li>
            <li>교환·반품 안내</li>
          </ul>
          <address className="footer__biz">
            <span>상호 {COMPANY.name}</span>
            <span>대표 {COMPANY.ceo}</span>
            <span>사업자등록번호 {COMPANY.bizNo}</span>
            <span>통신판매업신고 {COMPANY.mailOrderNo}</span>
            <span>주소 {COMPANY.address}</span>
            <span>개인정보보호책임자 {COMPANY.privacyOfficer}</span>
          </address>
          <p className="footer__copy">© {new Date().getFullYear()} LUMOOD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
