import { useId } from 'react';
import lampPhoto from '../assets/product-lamp.jpg';

// 상품 이미지 모음
// - 무드 조명: 실제 사진 위에 고른 빛 색과 밝기를 겹친다
// - 스마트 전구: 사진이 없어 일러스트(SVG)로 그리고, 같은 방식으로 색과 밝기를 반영한다
//   (실제 제품 사진이 생기면 BulbArt 대신 사진으로 바꾸면 된다)

const DEFAULT_COLOR = '#ffaa5c';

function mixWithWhite(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => Math.round(c + (255 - c) * amount));
  return `rgb(${ch.join(',')})`;
}

// 실제 램프 사진 위에, 체험에서 고른 빛 색과 밝기를 겹쳐 보여 준다.
// - 색: 전구 주변에 고른 색을 'color' 혼합으로 입혀 사진의 따뜻한 빛을 그 색으로 바꾼다
// - 밝기: 어두울수록 사진 전체를 살짝 가라앉히고, 빛 번짐도 작아진다
export function LampPhoto({ color = DEFAULT_COLOR, brightness = 60, alt = '' }) {
  const b = brightness / 100;
  return (
    <div className="lamp-photo" style={{ '--c': color, '--glow': `${18 + 22 * b}%`, '--dim': (1 - b) * 0.55 }}>
      <img src={lampPhoto} alt={alt} />
      <span className="lamp-photo__tint" aria-hidden="true" />
      <span className="lamp-photo__glow lamp-glow" aria-hidden="true" />
      <span className="lamp-photo__dim" aria-hidden="true" />
    </div>
  );
}

// 스마트 전구 일러스트: 어두운 배경에 E26 전구가 고른 색으로 켜져 있다
export function BulbArt({ color = DEFAULT_COLOR, brightness = 60, alt = '' }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const b = brightness / 100;
  const glass = mixWithWhite(color, 0.62 - 0.3 * b);
  return (
    <svg className="bulb-art" viewBox="0 0 400 440" preserveAspectRatio="xMidYMid slice" role={alt ? 'img' : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true}>
      <defs>
        <radialGradient id={`bg${uid}`} cx="200" cy="170" r={150 + 170 * b} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={color} stopOpacity={0.35 + 0.45 * b} />
          <stop offset="0.45" stopColor={color} stopOpacity={0.08 + 0.2 * b} />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`glass${uid}`} cx="0.42" cy="0.36" r="0.7">
          <stop offset="0" stopColor="#fffaf3" />
          <stop offset="0.5" stopColor={glass} />
          <stop offset="1" stopColor={color} />
        </radialGradient>
        <linearGradient id={`base${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#8d8f94" />
          <stop offset="0.45" stopColor="#e3e4e7" />
          <stop offset="1" stopColor="#77797e" />
        </linearGradient>
        <filter id={`blur${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <rect width="400" height="440" fill="#221a15" />
      <rect width="400" height="440" fill={`url(#bg${uid})`} />
      {/* 빛 번짐 */}
      <circle cx="200" cy="168" r={70 + 40 * b} fill={color} opacity={0.3 + 0.5 * b} filter={`url(#blur${uid})`} className="lamp-glow" />
      {/* 유리구 (A60 전구 모양) */}
      <path
        d="M200 70c-56 0-98 42-98 96 0 34 16 58 34 78 12 14 20 28 22 46h84c2-18 10-32 22-46 18-20 34-44 34-78 0-54-42-96-98-96z"
        fill={`url(#glass${uid})`}
      />
      <path d="M150 120c10-18 28-30 48-34" stroke="#fff" strokeOpacity=".7" strokeWidth="8" strokeLinecap="round" fill="none" />
      {/* 목 · E26 나사 · 접점 */}
      <path d="M158 290h84v14c0 6-4 10-10 10h-64c-6 0-10-4-10-10z" fill="#f2ede6" />
      <rect x="166" y="314" width="68" height="52" rx="6" fill={`url(#base${uid})`} />
      <g stroke="#6b6d72" strokeWidth="3" strokeLinecap="round" opacity=".8">
        <line x1="166" y1="326" x2="234" y2="320" />
        <line x1="166" y1="339" x2="234" y2="333" />
        <line x1="166" y1="352" x2="234" y2="346" />
      </g>
      <path d="M176 366h48l-10 18h-28z" fill="#3a3330" />
      <circle cx="200" cy="388" r="6" fill="#b9935e" />
    </svg>
  );
}

// 상품 id에 맞는 큰 이미지
export function ProductImage({ id, color, brightness, alt }) {
  return id === 'bulb' ? (
    <BulbArt color={color} brightness={brightness} alt={alt} />
  ) : (
    <LampPhoto color={color} brightness={brightness} alt={alt} />
  );
}

// 장바구니·주문서용 작은 정사각 이미지 (기본 앰버 빛)
export function ProductThumb({ id }) {
  return (
    <span className="product-thumb" aria-hidden="true">
      {id === 'bulb' ? <BulbArt brightness={70} /> : <img src={lampPhoto} alt="" />}
    </span>
  );
}
