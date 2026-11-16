// 사이트 콘텐츠 한곳 모음.
// ⚠ 아래 값 중 "임시안" 표시는 docs의 '추후 결정' 항목을 구현을 위해 임시로 채운 것입니다.
//   확정되면 이 파일만 고치면 됩니다.

// C-02 색상 — 05 문서 4-3: 차가운 빛 → 따뜻한 빛 흐름으로 배열 (임시안: 종류·개수)
export const COLORS = [
  { id: 'moon', name: '달빛 화이트', hex: '#e4ecff' },
  { id: 'sky', name: '새벽 하늘', hex: '#a9c6ff' },
  { id: 'lavender', name: '라벤더', hex: '#bba6ff' },
  { id: 'blossom', name: '블러썸', hex: '#ffb1c6' },
  { id: 'peach', name: '피치', hex: '#ffc09a' },
  { id: 'amber', name: '앰버', hex: '#ffaa5c' },
  { id: 'sunset', name: '선셋', hex: '#ff8f3d' },
  { id: 'candle', name: '캔들', hex: '#ff7426' },
];

// C-01 장면 프리셋 = 색상 + 밝기의 조합 (임시안: 종류·개수)
export const PRESETS = [
  { id: 'rest', name: '휴식', desc: '느긋한 저녁', colorId: 'amber', brightness: 55 },
  { id: 'focus', name: '집중', desc: '과제·작업할 때', colorId: 'moon', brightness: 90 },
  { id: 'movie', name: '영화', desc: '불 끄고 한 편', colorId: 'lavender', brightness: 25 },
  { id: 'sleep', name: '잠들기 전', desc: '눈이 편안하게', colorId: 'candle', brightness: 15 },
];

export const DEFAULT_PRESET_ID = 'rest';

export const findColor = (id) => COLORS.find((c) => c.id === id) ?? COLORS[0];
export const findPreset = (id) => PRESETS.find((p) => p.id === id);

// P-03 상품 정보 (임시안: 상세 정보 항목·값)
export const PRODUCT = {
  name: '루무드 무드 조명',
  // 임시안: 충전식·앱 연동 소형 무드등 시장의 중간대(4~6만 원)에 맞춘 가격
  price: 49000,
  summary:
    '손바닥만 한 크기로 침대 옆, 책상 위 어디에나 둘 수 있어요. 체험해 본 색상과 밝기를 그대로, 내 방에서 켜 보세요.',
  specs: [
    { label: '크기', value: '지름 12cm × 높이 18cm' },
    { label: '빛 색상', value: '차가운 빛부터 따뜻한 빛까지 자유롭게' },
    { label: '밝기', value: '1~100% 단계 없이 조절' },
    { label: '조작', value: '본체 터치 · 전용 앱' },
    { label: '전원', value: 'USB-C 충전식 (최대 8시간)' },
  ],
};

// S-01-03 메인 특징 — 상품 정보(PRODUCT.specs)와 같은 내용을 쉬운 말로 (임시안: 문구)
export const FEATURES = [
  { icon: 'color', title: '원하는 빛 그대로', desc: '차가운 달빛부터 따뜻한 촛불 빛까지, 그날 기분에 맞는 색을 골라요.' },
  { icon: 'dim', title: '단계 없는 밝기', desc: '1%의 은은한 빛부터 100%의 환한 빛까지 부드럽게 조절해요.' },
  { icon: 'touch', title: '터치 한 번, 앱으로도', desc: '본체를 톡 건드리거나 전용 앱으로 멀리서도 바꿀 수 있어요.' },
  { icon: 'battery', title: '선 없이 어디서나', desc: 'USB-C로 충전하면 최대 8시간. 손바닥만 한 크기라 어디든 둘 수 있어요.' },
];

// 주문·결제 (데모: 실제 결제는 일어나지 않음)
// 임시안: 배송비·최대 수량·결제 수단
export const CHECKOUT = {
  shippingFee: 0,
  maxQty: 5,
  payMethods: [
    { id: 'card', name: '신용·체크카드' },
    { id: 'easy', name: '간편결제' },
    { id: 'bank', name: '무통장 입금' },
  ],
};

export const formatWon = (n) => `${n.toLocaleString('ko-KR')}원`;

// 푸터 사업자·고객센터 정보
// ⚠ 임시안: 실제 사업자 정보가 아니에요. 사업자 등록 후 실제 값으로 바꿔 주세요.
export const COMPANY = {
  name: '루무드(LUMOOD)',
  ceo: 'OOO',
  bizNo: '000-00-00000',
  mailOrderNo: '제0000-서울OO-0000호',
  address: '서울특별시 OO구 OO로 00, 0층',
  privacyOfficer: 'OOO',
  cs: {
    phone: '0000-0000',
    hours: '평일 10:00 ~ 17:00',
    lunch: '점심 12:00 ~ 13:00',
    off: '주말·공휴일 휴무',
    email: 'help@lumood.example',
  },
};
