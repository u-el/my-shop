import { useState } from 'react';
import { Link } from 'react-router-dom';
import Room from '../components/Room.jsx';
import CometDial from '../components/CometDial/CometDial.jsx';
import { COLORS, PRESETS, findColor, formatWon } from '../data/content.js';
import { BUNDLE, bundlePrice } from '../data/pricing.js';
import { useLight } from '../context/LightContext.jsx';
import Reveal from '../components/Reveal.jsx';

const FIXTURES = [
  { id: 'lamp', label: '무드 조명', hint: '협탁 위 무드 조명만 켜요. 은은하게 주변을 밝혀요.' },
  { id: 'bulb', label: '스마트 전구', hint: '천장 전등 소켓에 끼운 스마트 전구로 방 전체를 물들여요.' },
  { id: 'both', label: '둘 다', hint: '전구와 무드 조명을 같은 색으로 함께 켜요.' },
];

// P-02 체험 페이지 — 핵심 행동이 일어나는 곳
// 05 문서 7-3 ①: 가상 공간과 조절 도구(C-01~C-03)를 한 화면에 함께 배치
// 05 문서 7-3 ④: 일반 천장등과 비교해 보는 요소(C-04)
export default function Experience() {
  const { presetId, color, colorId, brightness, fixture, setFixture, applyPreset, setColor, setBrightness } = useLight();
  // 체험한 조명에 맞는 제품으로 안내 (둘 다면 제품 목록)
  const next = fixture === 'both' ? { to: '/product', label: '이 분위기로 제품 보기' } : { to: `/product/${fixture}`, label: `이 분위기로 ${fixture === 'bulb' ? '스마트 전구' : '무드 조명'} 보기` };
  const [compare, setCompare] = useState(false);
  const [split, setSplit] = useState(50);

  return (
    <section className="section section--tight">
      <div className="container">
        <Reveal as="header" className="page-head">
          <p className="eyebrow">가상 체험</p>
          <h1>내 방이 될 공간에, 불을 켜 보세요</h1>
          <p>장면을 고르거나 색과 밝기를 직접 바꾸면 방의 분위기가 바로 바뀌어요.</p>
        </Reveal>

        <div className="studio">
          {/* S-02-01 가상 공간 (주변만 어둡게 처리해 빛을 돋보이게) */}
          <Reveal className="stage" from="scale" delay={0.1}>
            <div className="stage__view">
              <Room color={color.hex} brightness={brightness} fixture={fixture} className="stage__room" />
              {compare && (
                <>
                  <div className="stage__plain" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
                    <Room plain className="stage__room" title="일반 천장등만 켠 방" />
                  </div>
                  <div className="stage__divider" style={{ left: `${split}%` }} />
                  <span className="stage__tag stage__tag--left">일반 천장등</span>
                  <span className="stage__tag stage__tag--right">루무드</span>
                  <input
                    className="stage__split"
                    type="range"
                    min="0"
                    max="100"
                    value={split}
                    onChange={(e) => setSplit(Number(e.target.value))}
                    aria-label="비교 위치"
                  />
                </>
              )}
            </div>
            <div className="stage__bar">
              <span className="stage__now">
                <i style={{ background: color.hex }} />
                {presetId ? PRESETS.find((p) => p.id === presetId).name : '나만의 조합'} · {color.name} · {brightness}%
              </span>
              <label className="switch">
                <input type="checkbox" checked={compare} onChange={(e) => setCompare(e.target.checked)} />
                <span className="switch__ui" />
                일반 천장등과 비교
              </label>
            </div>
          </Reveal>

          {/* 조절 패널 */}
          <Reveal as="aside" className="panel" from="right" delay={0.2}>
            {/* C-00 켜 볼 조명 — 무드 조명 / 스마트 전구 / 둘 다 */}
            <div className="panel__group">
              <h2 className="panel__title">켜 볼 조명</h2>
              <div className="seg" role="radiogroup" aria-label="켜 볼 조명">
                {FIXTURES.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    role="radio"
                    aria-checked={fixture === f.id}
                    className={`seg__opt${fixture === f.id ? ' is-active' : ''}`}
                    onClick={() => setFixture(f.id)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <p className="panel__hint panel__hint--left">{FIXTURES.find((f) => f.id === fixture).hint}</p>
            </div>

            {/* C-01 장면 프리셋 — 7-3 ②: 색 미리보기 + 이름 타일 */}
            <div className="panel__group">
              <h2 className="panel__title">장면 프리셋</h2>
              <div className="presets" role="radiogroup" aria-label="장면 프리셋">
                {PRESETS.map((p) => {
                  const c = findColor(p.colorId);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      role="radio"
                      aria-checked={presetId === p.id}
                      className={`preset ${presetId === p.id ? 'is-active' : ''}`}
                      onClick={() => applyPreset(p.id)}
                    >
                      <span
                        className="preset__swatch"
                        style={{
                          background: `radial-gradient(circle at 50% 60%, ${c.hex} 0%, ${c.hex}${Math.round(
                            p.brightness * 1.6 + 40,
                          ).toString(16)} 35%, #2a211b 100%)`,
                        }}
                      />
                      <span className="preset__name">{p.name}</span>
                      <span className="preset__desc">{p.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* C-02 색상 — 차가운 빛 → 따뜻한 빛 */}
            <div className="panel__group">
              <div className="panel__row">
                <h2 className="panel__title">색상</h2>
                <span className="panel__value">{color.name}</span>
              </div>
              <div className="colors" role="radiogroup" aria-label="조명 색상">
                {COLORS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    role="radio"
                    aria-checked={colorId === c.id}
                    aria-label={c.name}
                    title={c.name}
                    className={`color ${colorId === c.id ? 'is-active' : ''}`}
                    style={{ '--c': c.hex }}
                    onClick={() => setColor(c.id)}
                  />
                ))}
              </div>
              <div className="colors__scale">
                <span>차가운 빛</span>
                <span>따뜻한 빛</span>
              </div>
            </div>

            {/* C-03 밝기 */}
            <div className="panel__group">
              <div className="panel__row">
                <h2 className="panel__title">밝기</h2>
              </div>
              {/* 다이얼을 돌리거나 튕기면 밝기가 바뀐다 (값은 다이얼 가운데에 표시) */}
              <div className="panel__dial">
                <CometDial
                  value={brightness}
                  min={5}
                  max={100}
                  step={1}
                  unit="%"
                  label="밝기"
                  accent="#c4703a"
                  ink="#3a2e26"
                  size={220}
                  onChange={setBrightness}
                />
              </div>
            </div>

            <p className="panel__hint">조절하는 즉시 왼쪽 공간에 반영돼요.</p>

            {/* B-02 */}
            <Link to={next.to} className="btn btn--primary btn--block">
              {next.label}
            </Link>
            {/* 둘 다 켜 봤다면 세트로 바로 살 수 있게 */}
            {fixture === 'both' && (
              <div className="exp-bundle">
                <p>
                  둘을 함께 사면 <strong>{formatWon(bundlePrice().discount)} 할인</strong> · 세트 {formatWon(bundlePrice().sale)}
                </p>
                <Link to={`/checkout?item=${BUNDLE.ids.join(',')}`} className="btn btn--ghost btn--block">
                  이 분위기로 세트 구매하기
                </Link>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
