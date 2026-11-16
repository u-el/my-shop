import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

// 찜하기 하트 버튼 — 회원 기능이라 로그인 전에는 로그인 화면으로 보낸다
export default function WishButton({ product, className = '' }) {
  const { user, isWished, toggleWish } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const on = isWished(product.id);

  const click = () => {
    if (!user) {
      navigate(`/login?next=${encodeURIComponent(location.pathname + location.search)}`);
      return;
    }
    toggleWish(product.id);
  };

  return (
    <button
      type="button"
      className={`wish${on ? ' is-on' : ''} ${className}`.trim()}
      aria-pressed={on}
      aria-label={`${product.name} 찜하기`}
      title={user ? (on ? '찜 해제' : '찜하기') : '로그인하고 찜하기'}
      onClick={click}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
      </svg>
    </button>
  );
}
