import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';

// 메인 외의 페이지는 들어갈 때 불러온다 (첫 화면을 가볍게)
const Experience = lazy(() => import('./pages/Experience.jsx'));
const Product = lazy(() => import('./pages/Product.jsx'));
const ProductList = lazy(() => import('./pages/ProductList.jsx'));
const Cart = lazy(() => import('./pages/Cart.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Signup = lazy(() => import('./pages/Signup.jsx'));
const MyPage = lazy(() => import('./pages/MyPage.jsx'));
const Checkout = lazy(() => import('./pages/Checkout.jsx'));
const OrderComplete = lazy(() => import('./pages/OrderComplete.jsx'));
const Legal = lazy(() => import('./pages/Legal.jsx'));
const OrderLookup = lazy(() => import('./pages/OrderLookup.jsx'));

// 페이지를 불러오는 동안 화면 높이를 유지해 푸터가 튀어 오르지 않게 한다
const PageLoading = () => <div className="page-loading" role="status" aria-label="페이지를 불러오는 중" />;

// 브라우저 탭 제목: "페이지 · LUMOOD"
const SITE = 'LUMOOD 루무드';
const TITLES = {
  '/': SITE,
  '/experience': '가상 체험',
  '/product': '제품',
  '/product/lamp': '무드 조명',
  '/product/bulb': '스마트 전구',
  '/cart': '장바구니',
  '/login': '로그인',
  '/signup': '회원가입',
  '/mypage': '마이페이지',
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
        <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-complete" element={<OrderComplete />} />
          <Route path="/order-lookup" element={<OrderLookup />} />
          <Route path="/terms" element={<Legal docId="terms" />} />
          <Route path="/privacy" element={<Legal docId="privacy" />} />
          <Route path="/refund" element={<Legal docId="refund" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
