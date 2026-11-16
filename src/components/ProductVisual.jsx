import lampPhoto from '../assets/product-lamp.jpg';
import bulbPhoto from '../assets/product-bulb.jpg';

// 상품 이미지 모음 — 실제 사진 위에 체험에서 고른 빛 색과 밝기를 겹친다.
// - 색: 빛나는 부분(x, y)을 중심으로 고른 색을 'color' 혼합으로 입혀 사진의 따뜻한 빛을 그 색으로 바꾼다
// - 밝기: 어두울수록 사진 전체를 살짝 가라앉히고, 빛 번짐도 작아진다
// 두 사진 모두 10:11 비율이고, x·y는 사진 안에서 빛나는 유리구의 중심 위치(%)
// soft: 유리구가 화면 대부분을 차지하는 사진은 색을 강하게 덮으면 밝기 차이가 사라져 그림처럼 보이므로,
//       밝기는 그대로 두고 색조만 바꾸는 약한 방식으로 입힌다

const PHOTOS = {
  lamp: { src: lampPhoto, x: '51%', y: '38%' },
  bulb: { src: bulbPhoto, x: '50%', y: '38%', soft: true },
};

const DEFAULT_COLOR = '#ffaa5c';

// 상품 id에 맞는 큰 이미지
export function ProductImage({ id, color = DEFAULT_COLOR, brightness = 60, alt = '' }) {
  const photo = PHOTOS[id] ?? PHOTOS.lamp;
  const b = brightness / 100;
  return (
    <div
      className={`lamp-photo${photo.soft ? ' lamp-photo--soft' : ''}`}
      style={{
        '--c': color,
        '--lx': photo.x,
        '--ly': photo.y,
        '--glow': `${18 + 22 * b}%`,
        '--dim': (1 - b) * 0.55,
      }}
    >
      <img src={photo.src} alt={alt} />
      <span className="lamp-photo__tint" aria-hidden="true" />
      <span className="lamp-photo__glow lamp-glow" aria-hidden="true" />
      <span className="lamp-photo__dim" aria-hidden="true" />
    </div>
  );
}

// 장바구니·주문서용 작은 정사각 이미지 (원래 사진 그대로)
export function ProductThumb({ id }) {
  return (
    <span className="product-thumb" aria-hidden="true">
      <img src={(PHOTOS[id] ?? PHOTOS.lamp).src} alt="" />
    </span>
  );
}
