import { Link } from 'react-router-dom';
import Room from '../components/Room.jsx';
import { PRESETS, findColor } from '../data/content.js';

// P-01 메인 페이지 — 첫인상을 주고 체험으로 이끈다
export default function Home() {
  return (
    <>
      {/* S-01-01 첫 화면 — 05 문서 7-3 ③: 가로 전체 이미지 + 겹친 짧은 제목 */}
      <section className="hero">
        <Room className="hero__room" color={findColor('amber').hex} brightness={62} slice />
        <div className="hero__shade" />
        <div className="container hero__copy">
          <p className="eyebrow eyebrow--light">스마트 무드 조명</p>
          <h1>
            불 하나 바꿨을 뿐인데,
            <br />
            방이 나를 닮아 가요
          </h1>
          <p className="hero__body">
            원하는 색과 밝기로 하루의 분위기를 바꾸는 루무드.
            <br />
            사진 속 그 방처럼, 내 방도 따뜻하게 물들여 보세요.
          </p>
        </div>
      </section>

      {/* S-01-02 체험 안내 — 조작 + 결과 장면을 함께, 같은 방 여러 분위기 */}
      <section className="section">
        <div className="container guide">
          <div className="guide__visual">
            <div className="guide__grid">
              {PRESETS.map((p) => (
                <figure key={p.id} className="guide__scene">
                  <Room color={findColor(p.colorId).hex} brightness={p.brightness} slice title={`${p.name} 분위기의 방`} />
                  <figcaption>{p.name}</figcaption>
                </figure>
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
          </div>

          <div className="guide__copy">
            <p className="eyebrow">구매 전 가상 체험</p>
            <h2>사기 전에, 먼저 켜 보세요</h2>
            <p>
              같은 방도 빛의 색과 밝기에 따라 전혀 다른 공간이 돼요. 가상의 자취방에서 장면을 고르고, 색과
              밝기를 직접 바꿔 보세요. 내 방에 두었을 때의 분위기를 미리 확인할 수 있어요.
            </p>
            <Link to="/experience" className="btn btn--primary">
              체험 시작하기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
