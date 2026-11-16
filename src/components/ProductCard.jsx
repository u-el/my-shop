import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatWon } from '../data/content.js';
import { useCart } from '../context/CartContext.jsx';
import { useLight } from '../context/LightContext.jsx';
import { ProductImage } from './ProductVisual.jsx';

// 상품 목록·메인 라인업에 쓰는 카드. 체험한 빛 색으로 이미지를 보여 준다.
export default function ProductCard({ product }) {
  const { color, brightness } = useLight();
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const addToCart = () => {
    add(product.id, 1);
    setAdded(true);
  };

  return (
    <article className="pcard">
      <Link to={`/product/${product.id}`} className="pcard__visual" aria-label={`${product.name} 자세히 보기`}>
        <ProductImage id={product.id} color={color.hex} brightness={brightness} />
      </Link>
      <div className="pcard__body">
        <p className="pcard__tagline">{product.tagline}</p>
        <h3 className="pcard__name">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="pcard__price">{formatWon(product.price)}</p>
        <div className="pcard__actions">
          <Link to={`/product/${product.id}`} className="btn btn--ghost">
            자세히 보기
          </Link>
          <button type="button" className="btn btn--primary" onClick={addToCart}>
            장바구니 담기
          </button>
        </div>
        <p className="pcard__added" role="status">
          {added && (
            <>
              장바구니에 담았어요 · <Link to="/cart">장바구니 보기</Link>
            </>
          )}
        </p>
      </div>
    </article>
  );
}
