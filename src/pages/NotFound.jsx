import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';

// 404 — 없는 주소로 들어왔을 때
export default function NotFound() {
  return (
    <section className="section section--tight">
      <Reveal className="container done" from="scale">
        <p className="notfound__code" aria-hidden="true">
          404
        </p>
        <h1>페이지를 찾을 수 없어요</h1>
        <p className="done__lead">주소가 바뀌었거나 없어진 페이지예요. 아래에서 다시 시작해 보세요.</p>
        <div className="done__actions notfound__actions">
          <Link to="/" className="btn btn--ghost">
            메인으로
          </Link>
          <Link to="/product" className="btn btn--primary">
            상품 보러 가기
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
