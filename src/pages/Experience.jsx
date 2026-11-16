import { useState } from 'react';
import { Link } from 'react-router-dom';
import Room from '../components/Room.jsx';
import CometDial from '../components/CometDial/CometDial.jsx';
import { COLORS, PRESETS, findColor } from '../data/content.js';
import { useLight } from '../context/LightContext.jsx';

// P-02 체험 페이지 — 핵심 행동이 일어나는 곳
// 05 문서 7-3 ①: 가상 공간과 조절 도구(C-01~C-03)를 한 화면에 함께 배치
// 05 문서 7-3 ④: 일반 천장등과 비교해 보는 요소(C-04)
export default function Experience() {
  const { presetId, color, colorId, brightness, applyPreset, setColor, setBrightness } = useLight();
  const [compare, setCompare] = useState(false);
  const [split, setSplit] = useState(50);

  return (
    <section className="section section--tight">
      <div className="container">
        <header className="page-head">
          <p className="eyebrow">가상 체험</p>
          <h1>내 방이 될 공간에, 불을 켜 보세요</h1>
          <p>장면을 고르거나 색과 밝기를 직접 바꾸면 방의 분위기가 바로 바뀌어요.</p>
        </header>

        <div className="studio">
          {/* S-02-01 가상 공간 (주변만 어둡게 처리해 빛을 돋보이게) */}
          <div className="stage">
            <div className="stage__view">
              <Room color={color.hex} brightness={brightness} className="stage__room" />
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
          </div>

          {/* 조절 패널 */}
          <aside className="panel">
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
            <Link to="/product" className="btn btn--primary btn--block">
              이 분위기로 상품 정보 보기
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
