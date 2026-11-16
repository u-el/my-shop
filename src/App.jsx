import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Experience from './pages/Experience.jsx';
import Product from './pages/Product.jsx';

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
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/product" element={<Product />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
