import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Experience from './pages/Experience.jsx';
import Product from './pages/Product.jsx';
import Checkout from './pages/Checkout.jsx';
import OrderComplete from './pages/OrderComplete.jsx';
import Legal from './pages/Legal.jsx';
import OrderLookup from './pages/OrderLookup.jsx';
import NotFound from './pages/NotFound.jsx';

// 브라우저 탭 제목: "페이지 · LUMOOD"
const SITE = 'LUMOOD 루무드';
const TITLES = {
  '/': SITE,
  '/experience': '가상 체험',
  '/product': '상품 정보',
  '/checkout': '주문서 작성',
  '/order-complete': '주문 완료',
  '/order-lookup': '비회원 주문 조회',
  '/terms': '이용약관',
  '/privacy': '개인정보처리방침',
  '/refund': '교환·반품 안내',
};

function DocumentTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = TITLES[pathname.replace(/\/+$/, '') || '/'];
    document.title = !page ? `페이지를 찾을 수 없어요 · LUMOOD` : page === SITE ? SITE : `${page} · LUMOOD`;
  }, [pathname]);
  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  // 최신 브라우저는 window.scrollTo가 Promise를 돌려주므로, 그 값을 useEffect의 cleanup으로 넘기지 않게 중괄호로 감싼다.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <DocumentTitle />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/product" element={<Product />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-complete" element={<OrderComplete />} />
          <Route path="/order-lookup" element={<OrderLookup />} />
          <Route path="/terms" element={<Legal docId="terms" />} />
          <Route path="/privacy" element={<Legal docId="privacy" />} />
          <Route path="/refund" element={<Legal docId="refund" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
