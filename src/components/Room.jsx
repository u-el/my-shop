import { useId } from 'react';

// 가상 공간: 자취방 일러스트(SVG). 색상·밝기가 실시간으로 반영된다.
// plain=true 이면 루무드 없이 일반 천장등만 켠 상태(비교용).
// fixture: 켜는 조명 — 'lamp'(협탁 위 무드 조명) | 'bulb'(천장 소켓의 스마트 전구) | 'both'

const LAMP = { x: 605, y: 398 };
const BULB = { x: 470, y: 118 };

function mixWithWhite(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) =>
    Math.round(c + (255 - c) * amount),
  );
  return `rgb(${ch.join(',')})`;
}

export default function Room({ color = '#ffaa5c', brightness = 60, fixture = 'lamp', plain = false, slice = false, className, title }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const b = plain ? 0 : Math.max(0, Math.min(100, brightness)) / 100;
  const lampOn = !plain && fixture !== 'bulb';
  const bulbOn = !plain && fixture !== 'lamp';
  // 천장 전구는 방 전체를 비추므로 무드 조명만 켰을 때보다 덜 어둡다
  const darkness = plain ? 0.06 : (bulbOn ? 0.8 : 0.9) - (bulbOn ? 0.6 : 0.5) * b;
  const glowR = 280 + 460 * b;
  const bulbR = 420 + 560 * b;
  const globe = lampOn ? mixWithWhite(color, 0.55 - 0.25 * b) : '#ddd3c6';
  const bulbGlass = bulbOn ? mixWithWhite(color, 0.5 - 0.25 * b) : plain ? '#fbf7ee' : '#d9d0c4';

  return (
    <svg
      viewBox="0 0 1200 700"
      preserveAspectRatio={slice ? 'xMidYMid slice' : 'xMidYMid meet'}
      className={className}
      role="img"
      aria-label={title ?? '조명이 켜진 자취방 가상 공간'}
    >
      <defs>
        <radialGradient id={`glow${uid}`} cx={LAMP.x} cy={LAMP.y} r={glowR} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={color} stopOpacity={Math.min(1, 0.6 + 0.5 * b)} />
          <stop offset="0.35" stopColor={color} stopOpacity={0.25 + 0.4 * b} />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`bulbglow${uid}`} cx={BULB.x} cy={BULB.y} r={bulbR} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={color} stopOpacity={Math.min(1, 0.5 + 0.5 * b)} />
          <stop offset="0.4" stopColor={color} stopOpacity={0.2 + 0.35 * b} />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <filter id={`blur${uid}`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      {/* 벽 · 바닥 */}
      <rect width="1200" height="700" fill="#e6d7c3" />
      <rect y="560" width="1200" height="140" fill="#b8916b" />
      <rect y="552" width="1200" height="10" fill="#d8c4aa" />
      <g stroke="#a7815e" strokeWidth="2">
        <line x1="0" y1="605" x2="1200" y2="605" />
        <line x1="0" y1="652" x2="1200" y2="652" />
      </g>

      {/* 창문 */}
      <rect x="110" y="110" width="230" height="250" rx="10" fill="#efe4d4" />
      <rect x="124" y="124" width="202" height="222" rx="4" fill="#27304a" />
      <circle cx="282" cy="172" r="15" fill="#f3e6c2" />
      <g fill="#f3e6c2" opacity="0.7">
        <circle cx="168" cy="160" r="2" />
        <circle cx="210" cy="210" r="1.6" />
        <circle cx="300" cy="250" r="1.8" />
        <circle cx="160" cy="280" r="1.4" />
      </g>
      <rect x="222" y="124" width="6" height="222" fill="#efe4d4" />
      <rect x="124" y="232" width="202" height="6" fill="#efe4d4" />
      <path d="M96 98 h50 q-12 140 8 290 h-58 z" fill="#d6b796" />
      <path d="M354 98 h-50 q12 140 -8 290 h58 z" fill="#d6b796" />
      <rect x="84" y="92" width="282" height="8" rx="4" fill="#8f6a4b" />

      {/* 선반 + 책 */}
      <rect x="420" y="214" width="210" height="10" rx="3" fill="#9a7352" />
      <rect x="436" y="168" width="18" height="46" fill="#c98f6b" />
      <rect x="456" y="176" width="14" height="38" fill="#7f9a86" />
      <rect x="472" y="164" width="20" height="50" fill="#e0c39b" />
      <circle cx="592" cy="196" r="18" fill="#7a9467" />
      <rect x="578" y="196" width="28" height="18" rx="3" fill="#c07a52" />

      {/* 액자 */}
      <rect x="820" y="150" width="160" height="116" rx="6" fill="#c9b293" />
      <rect x="832" y="162" width="136" height="92" rx="3" fill="#f2e9dc" />
      <path d="M840 246 l34 -40 l22 22 l18 -16 l46 34 z" fill="#d7b48e" />
      <circle cx="932" cy="186" r="9" fill="#e9a36d" />

      {/* 러그 */}
      <ellipse cx="560" cy="632" rx="340" ry="44" fill="#dab691" />

      {/* 화분 */}
      <ellipse cx="320" cy="470" rx="30" ry="46" fill="#6f8a5b" transform="rotate(-24 320 470)" />
      <ellipse cx="356" cy="456" rx="28" ry="52" fill="#7f9a68" transform="rotate(18 356 456)" />
      <ellipse cx="338" cy="440" rx="20" ry="44" fill="#86a170" />
      <path d="M300 500 h76 l-8 58 h-60 z" fill="#c07a52" />

      {/* 침대 */}
      <rect x="700" y="356" width="440" height="124" rx="22" fill="#a9805d" />
      <rect x="700" y="512" width="440" height="42" rx="6" fill="#8f6a4b" />
      <rect x="690" y="448" width="460" height="74" rx="16" fill="#f1e9dd" />
      <ellipse cx="770" cy="444" rx="58" ry="24" fill="#fbf6ef" />
      <rect x="810" y="436" width="340" height="98" rx="20" fill="#d6bfa5" />
      <path d="M830 470 q150 -16 310 6" stroke="#c7ad90" strokeWidth="4" fill="none" />

      {/* 협탁 */}
      <rect x="545" y="455" width="120" height="12" rx="4" fill="#8f6a4b" />
      <rect x="555" y="467" width="100" height="88" rx="4" fill="#a27a57" />
      <line x1="566" y1="510" x2="644" y2="510" stroke="#8f6a4b" strokeWidth="3" />
      <circle cx="605" cy="490" r="3.5" fill="#6b4f39" />

      {/* 조명 색 틴트 → 밤의 어둠 → 빛 번짐 */}
      {!plain && (
        <rect width="1200" height="700" fill={color} opacity={(bulbOn ? 0.6 : 0.45) * b} style={{ mixBlendMode: 'soft-light' }} />
      )}
      {plain && <rect width="1200" height="700" fill="#eef3ff" opacity="0.22" style={{ mixBlendMode: 'soft-light' }} />}
      <rect width="1200" height="700" fill="#140d08" opacity={darkness} />
      {lampOn && <rect width="1200" height="700" fill={`url(#glow${uid})`} style={{ mixBlendMode: 'screen' }} />}
      {bulbOn && <rect width="1200" height="700" fill={`url(#bulbglow${uid})`} style={{ mixBlendMode: 'screen' }} />}

      {/* 천장 펜던트 등 (소켓에 스마트 전구) */}
      <line x1={BULB.x} y1="0" x2={BULB.x} y2={BULB.y - 46} stroke="#4a3a2e" strokeWidth="3" />
      <path d={`M${BULB.x - 38} ${BULB.y - 18} q38 -40 76 0 z`} fill="#3f3128" />
      <rect x={BULB.x - 9} y={BULB.y - 50} width="18" height="18" rx="3" fill="#4a3a2e" />
      {bulbOn && (
        <circle cx={BULB.x} cy={BULB.y + 6} r={30 + 34 * b} fill={color} opacity={0.35 + 0.55 * b} filter={`url(#blur${uid})`} />
      )}
      <circle cx={BULB.x} cy={BULB.y + 4} r="20" fill={bulbGlass} />

      {/* 무드 조명 본체 */}
      <ellipse cx={LAMP.x} cy="453" rx="26" ry="6" fill="#5c4432" />
      <rect x={LAMP.x - 4} y="424" width="8" height="30" fill="#6b4f39" />
      {lampOn && (
        <circle cx={LAMP.x} cy={LAMP.y} r={36 + 40 * b} fill={color} opacity={0.35 + 0.55 * b} filter={`url(#blur${uid})`} />
      )}
      <circle cx={LAMP.x} cy={LAMP.y} r="34" fill={globe} />
    </svg>
  );
}
