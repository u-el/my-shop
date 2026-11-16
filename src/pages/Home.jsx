import { Link } from 'react-router-dom';
import Room from '../components/Room.jsx';
import ScrollExpand from '../components/ScrollExpand/ScrollExpand.jsx';
import heroRoom from '../assets/hero-room.svg';
import Reveal from '../components/Reveal.jsx';
import { COLORS, FEATURES, PRESETS, REVIEWS, REVIEWS_ARE_SAMPLES, findColor, findPreset } from '../data/content.js';
import { PRODUCTS } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import BundleCard from '../components/BundleCard.jsx';

// 특징 카드 아이콘 (선 아이콘, currentColor)
const ICONS = {
  color: (
    <>
      <path d="M12 3c3.5 4 6 7.2 6 10.2A6 6 0 0 1 6 13.2C6 10.2 8.5 7 12 3Z" />
      <path d="M9.5 14.5a2.6 2.6 0 0 0 2.5 2" />
    </>
  ),
  dim: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </>
  ),
  touch: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
      <path d="M12 7.5v4" />
    </>
  ),
  // 무드 조명 + 전구
  pair: (
    <>
      <circle cx="7.5" cy="10" r="4" />
      <path d="M7.5 14v4M4.5 20h6" />
      <path d="M16.5 3v3" />
      <path d="M16.5 6a3.5 3.5 0 0 1 2 6.4V14h-4v-1.6a3.5 3.5 0 0 1 2-6.4Z" />
      <path d="M15 16.5h3" />
    </>
  ),
};

// P-01 메인 페이지 — 첫인상을 주고 체험으로 이끈다
export default function Home() {
  return (
    <>
      {/* S-01-01 첫 화면 — 05 문서 7-3 ③: 가로 전체 이미지 + 겹친 짧은 제목 */}
      {/* 스크롤하면 작은 액자 속 방이 화면 가득 커지고, 그 위로 소개 문구가 나타난다 */}
      <section className="hero">
        <ScrollExpand
          className="hero__expand"
          src={heroRoom}
          alt="앰버 빛 루무드가 켜진 자취방"
          title={
            <h1 className="hero__title">
              불 하나 바꿨을 뿐인데,
              <br />
              방이 나를 닮아 가요
            </h1>
          }
          scrollHint="스크롤해서 불을 켜 보세요"
          useWindowScroll
        >
          <p className="eyebrow eyebrow--light">스마트 무드 조명 · 스마트 전구</p>
          <p className="hero__body">
            원하는 색과 밝기로 하루의 분위기를 바꾸는 루무드.
            <br />
            사진 속 그 방처럼, 내 방도 따뜻하게 물들여 보세요.
          </p>
          <Link to="/experience" className="btn btn--primary">
            지금 체험해 보기
          </Link>
        </ScrollExpand>
      </section>

      {/* S-01-03 특징 — 상품의 핵심을 네 가지로 */}
      <section className="section features">
        <div className="container">
          <Reveal className="features__head">
            <p className="eyebrow">루무드의 특징</p>
            <h2>빛 하나 바꿨을 뿐인데, 방의 표정이 바뀌어요</h2>
          </Reveal>
          <ul className="features__list">
            {FEATURES.map((f, i) => (
              <Reveal as="li" key={f.title} className="feature" delay={0.1 + i * 0.1}>
                <span className="feature__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">{ICONS[f.icon]}</svg>
                </span>
                <h3 className="feature__title">{f.title}</h3>
                <p className="feature__desc">{f.desc}</p>
                {f.icon === 'color' && (
                  <span className="feature__colors" aria-hidden="true">
                    {COLORS.map((c) => (
                      <i key={c.id} style={{ background: c.hex }} />
                    ))}
                  </span>
                )}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* S-01-02 체험 안내 — 조작 + 결과 장면을 함께, 같은 방 여러 분위기 */}
      <section className="section">
        <div className="container guide">
          <Reveal className="guide__visual" from="left">
            <div className="guide__grid">
              {PRESETS.map((p, i) => (
                <Reveal as="figure" key={p.id} className="guide__scene" from="scale" delay={0.15 + i * 0.1}>
                  <Room color={findColor(p.colorId).hex} brightness={p.brightness} slice title={`${p.name} 분위기의 방`} />
                  <figcaption>{p.name}</figcaption>
                </Reveal>
              ))}
            </div>
            <div className="guide__panel" aria-hidden="true">
              <span className="guide__panel-label">밝기</span>
              <span className="guide__panel-track">
                <span style={{ width: '62%' }} />
              </span>
              <span className="guide__panel-dots">
                {['moon', 'lavender', 'amber', 'candle'].map((id) => (
                  <i key={id} style={{ background: findColor(id).hex }} />
                ))}
              </span>
            </div>
          </Reveal>

          <Reveal className="guide__copy" from="right" delay={0.15}>
            <p className="eyebrow">구매 전 가상 체험</p>
            <h2>사기 전에, 먼저 켜 보세요</h2>
            <p>
              같은 방도 빛의 색과 밝기에 따라 전혀 다른 공간이 돼요. 가상의 자취방에서 장면을 고르고, 색과
              밝기를 직접 바꿔 보세요. 내 방에 두었을 때의 분위기를 미리 확인할 수 있어요.
            </p>
            <Link to="/experience" className="btn btn--primary">
              체험 시작하기
            </Link>
          </Reveal>
        </div>
      </section>

      {/* S-01-05 제품 라인업 */}
      <section className="section lineup">
        <div className="container">
          <Reveal className="lineup__head">
            <p className="eyebrow">제품</p>
            <h2>두고 쓰는 무드등, 끼워 쓰는 전구</h2>
            <p>같은 앱, 같은 색. 하나만 써도, 함께 켜도 좋아요.</p>
          </Reveal>
          <div className="plist">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.id} delay={0.1 + i * 0.1}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
          <Reveal className="bundle-wrap" delay={0.2}>
            <BundleCard />
          </Reveal>
        </div>
      </section>

      {/* S-01-04 후기 */}
      <section className="section reviews">
        <div className="container">
          <Reveal className="reviews__head">
            <p className="eyebrow">사용 후기</p>
            <h2>불을 켠 사람들의 이야기</h2>
            {REVIEWS_ARE_SAMPLES && (
              <p className="demo-note">출시 전이라 아래는 실제 구매 후기가 아닌 예시 후기예요.</p>
            )}
          </Reveal>
          <ul className="reviews__list">
            {REVIEWS.map((r, i) => {
              const preset = findPreset(r.presetId);
              const color = findColor(preset.colorId);
              return (
                <Reveal as="li" key={r.name} className="review" delay={0.1 + i * 0.1}>
                  <span className="review__stars" role="img" aria-label={`별점 5점 만점에 ${r.rating}점`}>
                    {'★'.repeat(r.rating)}
                    <span className="review__stars-off">{'★'.repeat(5 - r.rating)}</span>
                  </span>
                  <blockquote className="review__text">{r.text}</blockquote>
                  <footer className="review__by">
                    <span className="review__mood" style={{ '--c': color.hex }}>
                      <i />
                      {preset.name} · {color.name}
                    </span>
                    <span>
                      {r.name} · {r.room}
                      {REVIEWS_ARE_SAMPLES && <em className="review__sample">예시</em>}
                    </span>
                  </footer>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
