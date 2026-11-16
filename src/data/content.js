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

// S-01-03 메인 특징 — 무드 조명 상품 정보(products.js)와 같은 내용을 쉬운 말로 (임시안: 문구)
export const FEATURES = [
  { icon: 'color', title: '원하는 빛 그대로', desc: '차가운 달빛부터 따뜻한 촛불 빛까지, 그날 기분에 맞는 색을 골라요.' },
  { icon: 'dim', title: '단계 없는 밝기', desc: '1%의 은은한 빛부터 100%의 환한 빛까지 부드럽게 조절해요.' },
  { icon: 'touch', title: '터치 한 번, 앱으로도', desc: '본체를 톡 건드리거나 전용 앱으로 멀리서도 바꿀 수 있어요.' },
  { icon: 'battery', title: '선 없이 어디서나', desc: 'USB-C로 충전하면 최대 8시간. 손바닥만 한 크기라 어디든 둘 수 있어요.' },
];

// S-01-04 후기
// ⚠ 예시 후기: 출시 전이라 실제 구매 후기가 아니에요. 화면에도 '예시'라고 표시해요.
//   실제 후기가 모이면 아래 내용을 바꾸고 REVIEWS_ARE_SAMPLES를 false로 바꿔 주세요.
export const REVIEWS_ARE_SAMPLES = true;
export const REVIEWS = [
  {
    name: '김*진',
    room: '원룸 자취',
    presetId: 'rest',
    rating: 5,
    text: '퇴근하고 형광등 대신 이것만 켜 두면 방이 카페처럼 바뀌어요. 체험해 본 앰버 색 그대로라 고민 없이 골랐어요.',
  },
  {
    name: '이*우',
    room: '기숙사',
    presetId: 'focus',
    rating: 5,
    text: '과제할 때는 하얀 빛, 쉴 때는 따뜻한 빛으로 바꿔 써요. 선이 없어서 책상이랑 침대 옆을 오가며 쓰기 편해요.',
  },
  {
    name: '박*아',
    room: '신혼집 침실',
    presetId: 'sleep',
    rating: 4,
    text: '잠들기 전에 밝기를 아주 낮게 해 두면 눈이 편해요. 앱으로도 끌 수 있어서 침대에서 일어날 필요가 없어요.',
  },
];

// 주문·결제 (데모: 실제 결제는 일어나지 않음)
// 임시안: 배송비·최대 수량·결제 수단
export const CHECKOUT = {
  shippingFee: 0,
  maxQty: 5,
  payMethods: [
    { id: 'card', name: '신용·체크카드' },
    // 간편결제: 데모 승인 창을 거친다 (실제 결제사와 연결 안 됨). mark는 공식 로고가 아닌 글자 배지
    { id: 'kakaopay', name: '카카오페이', easy: true, brand: 'kakao', mark: 'K' },
    { id: 'naverpay', name: '네이버페이', easy: true, brand: 'naver', mark: 'N' },
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

// 상품 페이지: 배송·교환 요약
// ⚠ 임시안: 출고 시각·택배사는 실제 운영 기준이 정해지면 바꿔 주세요.
export const SHIP_SUMMARY = [
  { icon: 'truck', title: '무료배송', desc: '평일 오후 2시 전 주문 시 당일 출고' },
  { icon: 'return', title: '7일 이내 교환·반품', desc: '받은 날부터 7일, 불량은 3개월까지' },
  { icon: 'shield', title: '1년 품질보증', desc: '정상 사용 중 고장 시 무상 수리' },
];
