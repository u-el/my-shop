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

// 상품 페이지: 자주 묻는 질문
// ⚠ 임시안: 실제 제품 사양이 확정되면 답변을 함께 확인해 주세요.
export const FAQS = [
  {
    q: '한 번 충전하면 얼마나 쓸 수 있나요?',
    a: '밝기 50% 기준으로 최대 8시간 쓸 수 있어요. USB-C 케이블로 약 2시간이면 완전히 충전돼요. 충전하면서 켜 둘 수도 있어요.',
  },
  {
    q: '앱이 꼭 있어야 하나요?',
    a: '아니요. 본체 윗면을 터치해 켜고 끄기, 밝기, 색 바꾸기를 모두 할 수 있어요. 앱을 쓰면 원하는 색을 더 세밀하게 고르고, 꺼짐 예약도 할 수 있어요.',
  },
  {
    q: '사이트에서 체험한 색 그대로 나오나요?',
    a: '체험 화면과 같은 색 값을 기준으로 맞췄어요. 다만 모니터와 방의 조명에 따라 조금 다르게 보일 수 있어요.',
  },
  {
    q: '아이 방이나 수면등으로 써도 괜찮나요?',
    a: '깜빡임이 없는 LED를 쓰고, 밝기를 1%까지 낮출 수 있어 수면등으로 쓰기 좋아요. 본체가 뜨거워지지 않지만, 어린아이가 케이블을 갖고 놀지 않도록 주의해 주세요.',
  },
  {
    q: '고장 나면 어떻게 하나요?',
    a: '구매일부터 1년 동안 정상 사용 중 생긴 고장은 무상으로 수리해 드려요. 고객센터로 주문 번호와 증상을 알려 주세요.',
  },
];

// 상품정보제공고시 (전기용품·조명 품목)
// ⚠ 임시안: KC 인증번호, 제조자, 정격 정보 등은 실제 값으로 반드시 바꿔 주세요.
export const PRODUCT_NOTICE = [
  { label: '품명 및 모델명', value: '루무드 무드 조명 / LM-01' },
  { label: 'KC 인증 정보', value: '인증번호 확인 후 기재 예정' },
  { label: '정격전압·소비전력', value: 'DC 5V / 5W (USB-C 충전)' },
  { label: '출시연월', value: '2026년 12월 (예정)' },
  { label: '제조자(수입자)', value: '확정 후 기재 예정' },
  { label: '제조국', value: '확정 후 기재 예정' },
  { label: '크기·무게', value: '지름 12cm × 높이 18cm / 약 350g' },
  { label: '품질보증기준', value: '구매일로부터 1년, 소비자분쟁해결기준(공정거래위원회 고시)에 따름' },
  { label: 'A/S 책임자와 전화번호', value: `${COMPANY.name} 고객센터 ${COMPANY.cs.phone}` },
];
