import { Link } from 'react-router-dom';
import { PRESETS, PRODUCT, STORE } from '../data/content.js';
import { useLight } from '../context/LightContext.jsx';

function LampIllustration({ color, brightness }) {
  const b = brightness / 100;
  return (
    <svg viewBox="0 0 400 440" role="img" aria-label={`${PRODUCT.name} 제품 이미지`}>
      <defs>
        <radialGradient id="productGlow" cx="200" cy="190" r={120 + 140 * b} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={color} stopOpacity={0.55 + 0.4 * b} />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="productGlobe" cx="0.42" cy="0.38" r="0.7">
          <stop offset="0" stopColor="#fffaf2" />
          <stop offset="0.55" stopColor={color} stopOpacity="0.85" />
          <stop offset="1" stopColor={color} />
        </radialGradient>
      </defs>
      <rect width="400" height="440" fill="#2c221b" />
      <rect width="400" height="440" fill="url(#productGlow)" />
      <ellipse cx="200" cy="378" rx="120" ry="14" fill="#000" opacity="0.25" />
      <path d="M150 360 q50 -18 100 0 v12 q-50 14 -100 0 z" fill="#d9cbb8" />
      <rect x="192" y="290" width="16" height="72" rx="4" fill="#cdbca6" />
      <circle cx="200" cy="200" r="100" fill="url(#productGlobe)" />
      <ellipse cx="168" cy="160" rx="26" ry="16" fill="#fff" opacity="0.35" transform="rotate(-30 168 160)" />
    </svg>
  );
}

// P-03 상품 정보 페이지 — 체험 후 구매 결정을 돕는다
export default function Product() {
  const { presetId, color, brightness } = useLight();
  const moodName = presetId ? PRESETS.find((p) => p.id === presetId).name : '나만의 조합';
  const storeReady = STORE.url && STORE.url !== '#';

  return (
    <>
      {/* S-03-01 상세 정보 */}
      <section className="section section--tight">
        <div className="container detail">
          <div className="detail__visual">
            <LampIllustration color={color.hex} brightness={brightness} />
          </div>
          <div className="detail__copy">
            <p className="eyebrow">상품 정보</p>
            <h1>{PRODUCT.name}</h1>
            <p className="detail__summary">{PRODUCT.summary}</p>
            <dl className="specs">
              {PRODUCT.specs.map((s) => (
                <div key={s.label} className="specs__row">
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* S-03-02 구매 */}
      <section className="section buy">
        <div className="container buy__inner">
          <h2>체험한 분위기 그대로, 내 방으로</h2>
          <p>
            방금 고른 분위기를 기억해 두세요. 제품을 받으면 같은 색과 밝기로 바로 켤 수 있어요.
          </p>
          <div className="buy__mood">
            <i style={{ background: color.hex }} />
            {moodName} · {color.name} · {brightness}%
            <Link to="/experience">다시 체험하기</Link>
          </div>
          <a
            className="btn btn--primary btn--lg"
            href={STORE.url}
            target={storeReady ? '_blank' : undefined}
            rel={storeReady ? 'noopener noreferrer' : undefined}
            onClick={(e) => {
              if (!storeReady) {
                e.preventDefault();
                alert('외부 스토어 링크는 준비 중이에요.');
              }
            }}
          >
            외부 스토어에서 구매하기 ↗
          </a>
        </div>
      </section>
    </>
  );
}
