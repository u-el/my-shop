# PROJECT_CONTEXT

> 이 파일은 사이트를 만들 때 AI가 가장 먼저 읽는 프로젝트 설명서입니다.
> 기획 문서에서 구현에 필요한 내용만 모아 두고, 수정할 때마다 최신 상태로 맞춥니다.
> 기준: 2026-11-17 `main` 브랜치의 현재 화면 구현. 01~04 기획 문서와 다른 부분은 구현을 따랐습니다.

## AI 작성 규칙
1. 사용자가 준 문서와 답변에 있는 내용만 씁니다. 없는 내용을 지어내지 않습니다.
2. 비어 있는 항목은 질문 기능으로 물어봅니다. 선택지와 추천안을 함께 보여 줍니다.
3. 사용자가 '미정'이라고 답한 항목은 [미정]으로 표시하고, 그 항목이 필요한 제작 단계에서 다시 묻습니다.
4. 각 내용 옆에 가져온 문서를 (출처: 파일명) 형태로 적습니다.
5. 분석 과정, 검토 메모, 선택하지 않은 후보처럼 구현에 영향이 없는 내용은 넣지 않습니다.
6. 화면이나 규칙이 바뀌면 이 파일에도 바로 반영합니다.

## 1. 프로젝트 개요
- 사이트 이름: LUMOOD 루무드 (출처: README.md, index.html)
- 한 줄 설명: 사기 전에 가상의 방에서 조명의 색·밝기를 직접 바꿔 보고, 그 분위기 그대로 구매까지 할 수 있는 스마트 무드 조명·스마트 전구 쇼핑몰 데모 사이트 (출처: README.md)
- 사이트 목적: 20~30대 자취생이 조명의 색상과 밝기에 따른 공간 변화를 구매 전에 가상으로 체험하고, 내 방에서도 원하는 분위기가 날지 예상해 보며 구매를 결정하도록 돕는다 (출처: docs/01-site-purpose.md)
- 판매 상품: 루무드 무드 조명(충전식, 49,000원) · 루무드 스마트 전구(E26, 19,000원) — 가격·사양은 임시안 (출처: src/data/products.js)
- 가장 중요한 행동: 가상 공간에서 장면 프리셋과 색상·밝기를 직접 조절하며 분위기 변화를 체험한다 (출처: docs/01-site-purpose.md)
- 보조 행동: 상품 상세 확인 → 장바구니·바로 구매 → 주문 (사이트 안에서 데모 결제) (출처: README.md, src/pages/Product.jsx)

## 2. 방문자
- 주요 방문자: SNS에서 감성적인 방 사진을 보고 들어온, 방 분위기를 바꾸고 싶은 20~30대 자취생. 주 접속 기기는 PC 데스크탑 (출처: docs/01-site-purpose.md)
- 방문자의 필요: 내 방에 두면 실제로 어떤 분위기가 될지 미리 알고 싶다. 사진에서 본 분위기와 실제가 다를까 봐 구매를 망설인다 (출처: docs/01-site-purpose.md)

## 3. 페이지와 이동 구조
공통: 상단 GNB(로고 → `/`, 체험하기, 제품, 로그인/마이페이지, 장바구니 + 담긴 개수) · 푸터(쇼핑 링크, 고객센터, 약관). 주문서·주문 완료 화면에서는 장바구니 버튼을 숨김 (출처: src/components/Header.jsx, src/components/Footer.jsx)

| 메뉴·페이지 | 섹션 순서와 역할 | 버튼 → 목적지 |
| --- | --- | --- |
| 메인 `/` | ① 첫 화면: 작은 액자 속 방이 스크롤하면 화면 가득 커지며 제목·소개 등장 ② 특징 4가지 ③ 체험 안내: 프리셋 4개 방 장면 + 조작 카드 ④ 제품 라인업 + 세트 할인 카드 ⑤ 사용 후기 (예시 표시) (출처: src/pages/Home.jsx) | 지금 체험해 보기·체험 시작하기 → `/experience` / 제품 카드 → `/product/:id` / 장바구니 담기 → 장바구니 저장 / 세트 구매 → `/checkout?item=lamp,bulb` (출처: src/pages/Home.jsx, src/components/ProductCard.jsx, src/components/BundleCard.jsx) |
| 가상 체험 `/experience` | 제목 → 왼쪽 가상 공간(현재 조합 표시, 일반 천장등 비교 스위치 + 좌우 드래그 비교) · 오른쪽 조절 패널(켜 볼 조명 무드 조명/전구/둘 다 → 장면 프리셋 → 색상 8개 → 밝기 다이얼) (출처: src/pages/Experience.jsx) | 이 분위기로 무드 조명/스마트 전구 보기 → `/product/lamp`·`/product/bulb` (둘 다면 `/product`) / 둘 다일 때 이 분위기로 세트 구매하기 → `/checkout?item=lamp,bulb` (출처: src/pages/Experience.jsx) |
| 제품 목록 `/product` | 제목 → 제품 카드 2개(체험한 색으로 물든 사진) → 세트 할인 카드 (출처: src/pages/ProductList.jsx) | 체험 → `/experience` / 카드 → `/product/:id` (출처: src/pages/ProductList.jsx) |
| 상품 상세 `/product/lamp`, `/product/bulb` | ① 사진(체험한 색·밝기) + 이름·찜·가격·요약·사양·수량·배송 요약 ② 자주 묻는 질문 ③ 구매: 체험한 조합 표시 ④ 함께 쓰면 좋은 제품 + 세트 카드 ⑤ 상품정보제공고시 (출처: src/pages/Product.jsx) | 장바구니 담기 → 장바구니 저장 / 바로 구매하기 → `/checkout?item=:id&qty=` / 다시 체험하기 → `/experience` / 찜(비로그인) → `/login?next=` (출처: src/pages/Product.jsx, src/components/WishButton.jsx) |
| 장바구니 `/cart` | 담은 상품(수량 변경·삭제) → 함께 사면 좋은 상품 제안 → 결제 예정 금액(세트 할인 자동 적용) (출처: src/pages/Cart.jsx, src/data/pricing.js) | 주문하기 → `/checkout` / 쇼핑 계속 → `/product` (출처: src/pages/Cart.jsx) |
| 주문서 `/checkout` | 주문 상품 → 배송 정보(도로명 주소 검색) → 결제 수단(카드·카카오페이·네이버페이·무통장) / 오른쪽 결제 금액 (출처: src/pages/Checkout.jsx, src/data/content.js) | 로그인 → `/login?next=` / 결제하기 → 간편결제는 데모 승인 창 → `/order-complete` (출처: src/pages/Checkout.jsx) |
| 주문 완료 `/order-complete` | 감사 문구 + 주문 정보 (출처: src/pages/OrderComplete.jsx) | 마이페이지 → `/mypage` / 주문 조회 → `/order-lookup?no=` / 체험 → `/experience` (출처: src/pages/OrderComplete.jsx) |
| 비회원 주문 조회 `/order-lookup` | 주문 번호 + 휴대폰 번호 입력 → 조회 결과 (출처: src/pages/OrderLookup.jsx, README.md) | 상품 보러 가기 → `/product` (출처: src/pages/OrderLookup.jsx) |
| 로그인 `/login` · 회원가입 `/signup` | 데모 회원 폼 (가입 시 이용약관·개인정보 필수 동의) (출처: src/pages/Login.jsx, src/pages/Signup.jsx) | 완료 → `next` 주소 / 서로 이동 / 비회원 주문 조회 → `/order-lookup` / 약관 → `/terms`, `/privacy` (출처: src/pages/Login.jsx, src/pages/Signup.jsx) |
| 마이페이지 `/mypage` | 주문 내역 → 찜한 상품 → 기본 배송지 → 회원 정보(로그아웃·탈퇴) (출처: src/pages/MyPage.jsx) | 찜 상품 → `/product/:id` / 탈퇴 → `/` (출처: src/pages/MyPage.jsx) |
| 약관 `/terms` · `/privacy` · `/refund` | 이용약관 · 개인정보처리방침 · 교환·반품 안내 (초안) (출처: src/pages/Legal.jsx, README.md) | — |
| 404 | 페이지를 찾을 수 없어요 (출처: src/pages/NotFound.jsx) | 메인 → `/` / 제품 → `/product` (출처: src/pages/NotFound.jsx) |

## 4. 디자인 기준
- 컬러 (출처: src/styles.css)
  - 배경: `--bg #faf5ee`(페이지) · `--surface #ffffff`(카드) · `--surface-warm #f3e9dc`(푸터, hover) · `--stage #221a15`(어두운 처리는 가상 공간·첫 화면 주변에만, 출처: docs/05-site-reference.md 7-2)
  - 글자: `--ink #3a2e26`(본문·제목) · `--ink-soft #7a6a5d`(보조)
  - 포인트: `--accent #c4703a` — 주 버튼, 장바구니 버튼, 선택 메뉴 밑줄, 라벨(eyebrow), 할인 금액 · 선: `--line #e7dccd`
- 타이포그래피: Pretendard. 본문 17px / 줄 간격 1.65 / 단어 단위 줄바꿈. h1 30~46px 700, h2 24~34px 700(화면 폭에 따라), 라벨 14px 600 (출처: src/styles.css, index.html)
- 레이아웃: 콘텐츠 최대 폭 1200px, 섹션 위아래 112px. 공간(결과)을 가장 크게, 조작 도구는 바로 곁에 둔다. 메인·체험은 이미지 중심, 설명은 상품 페이지에 짧은 목록으로 (출처: src/styles.css, docs/05-site-reference.md 7-1·7-2)
- 반복 요소: 버튼은 알약형(999px), 주 버튼(포인트 색)·보조 버튼(흰 바탕 + 선). 모서리 28px(큰 박스) · 18px(카드) · 12px(작은 요소). 그림자는 따뜻한 갈색 톤 (출처: src/styles.css)
- 분위기와 말투: 따뜻하고 아늑하며 편안한 나만의 공간. 차갑고 기계적인 테크 분위기는 피한다 (출처: docs/01-site-purpose.md). 말투는 부드러운 해요체 — 예: "사기 전에, 먼저 켜 보세요", "불 하나 바꿨을 뿐인데, 방이 나를 닮아 가요" (출처: src/pages/Home.jsx)
- 참고한 레퍼런스와 적용 위치 (출처: docs/05-site-reference.md 7-1, 7-3)
  - Häfele LOOX Light Room, Nanoleaf 편집 화면 → 체험 페이지: 가상 공간과 조절 패널을 한 화면에 좌우 배치
  - Philips Hue Features 장면 타일 → 체험 페이지: 프리셋을 색 미리보기 + 이름 + 설명 타일로
  - Philips Hue rooms / Hue KR → 메인 첫 화면: 따뜻한 방 이미지를 가로 전체로 + 겹친 짧은 제목
  - Ohouse AI 전/후 비교 → 체험 페이지: 일반 천장등과 좌우 드래그 비교
  - Hue KR 곡선 그래픽 → 색상을 차가운 빛 → 따뜻한 빛 순서로 배열
- Figma 링크 (출처: README.md, docs/03-site-map.md, docs/04-site-wireframe.md)
  - 파일: https://www.figma.com/design/T0rXsxZAHFpZeKUMDyOrQJ/%EB%A3%A8%EB%AC%B4%EB%93%9C-LUMOOD-?node-id=0-1
  - 사이트맵: node `3-3` / 와이어프레임: node `6-2` (P-01 `6-3`, P-02 `6-55`, P-03 `6-142`) / 레퍼런스: node `14-3`
  - 무드 시안·스타일 보드: [미정] (색 후보를 Figma에서 비교·확정하는 단계를 건너뜀, 출처: README.md 7)
  - 사이트맵·와이어프레임은 웹사이트 완성 후 현재 구현에 맞게 보완함 (출처: README.md 7)

## 5. 인터랙션
| 위치 | 무엇을 | 언제 | 어떻게 | 상태 |
| --- | --- | --- | --- | --- |
| 메인 첫 화면 | 액자 속 방 이미지 | 스크롤할 때 | 작은 액자 → 화면 가득 커지고 제목·소개·버튼이 나타남 (출처: src/components/ScrollExpand/ScrollExpand.jsx) | 구현됨 |
| 전체 섹션 | 제목·카드 | 화면에 들어올 때 | 아래·옆에서 살짝 떠오르며 나타남, 한 번만 (출처: src/components/Reveal.jsx) | 구현됨 |
| GNB | 헤더 배경 | 스크롤을 8px 넘게 내렸을 때 | 그림자가 깔림 (출처: src/components/Header.jsx, src/styles.css) | 구현됨 |
| 메인 체험 안내 | 조작 카드·밝기 막대 | 항상 | 둥실 떠 있고 밝기 막대가 천천히 오르내림. 장면 카드는 마우스를 올리면 확대 (출처: src/styles.css) | 구현됨 |
| 체험 페이지 | 가상 공간 | 프리셋·색상·밝기·켜 볼 조명을 바꿀 때 | 즉시 방의 빛이 바뀜. 고른 값은 상품 사진·구매 섹션까지 유지 (출처: src/pages/Experience.jsx, src/context/LightContext.jsx) | 구현됨 |
| 체험 페이지 | 밝기 다이얼 | 돌리거나 튕길 때 | 5~100%, 관성 있게 값이 바뀜 (출처: src/components/CometDial/CometDial.jsx) | 구현됨 |
| 체험 페이지 | 일반 천장등 비교 | 스위치를 켤 때 | 좌우 드래그로 비교 위치 이동 (출처: src/pages/Experience.jsx) | 구현됨 |
| 상품 상세 | 램프 빛 | 항상 | 숨 쉬듯 은은하게 밝기 변화 (출처: src/styles.css) | 구현됨 |
| 상품 카드·상세 | 찜 버튼 | 누를 때 | 로그인 상태면 찜 토글, 아니면 로그인 화면으로 (출처: src/components/WishButton.jsx) | 구현됨 |
| 주문서 | 간편결제 | 카카오페이·네이버페이로 결제할 때 | 데모 승인 창을 거친 뒤 주문 완료 (출처: src/pages/Checkout.jsx) | 구현됨 |
| 버튼 공통 | 버튼 | 마우스 올림 / 누름 | 살짝 떠오름 / 살짝 눌림 (출처: src/styles.css) | 구현됨 |
| 공통 | 모든 움직임 | 동작 줄이기 설정 시 | 애니메이션 끔 (출처: src/styles.css, src/components/Reveal.jsx) | 구현됨 |

## 6. 에셋
- 로고: 이미지 없이 글자 로고 "LUMOOD" (굵게, 넓은 자간) (출처: src/components/Header.jsx, src/styles.css)
- 이미지: 첫 화면 방 일러스트 `hero-room.svg`, 상품 사진 `product-lamp.jpg`·`product-bulb.jpg`(사진 위에 체험한 색을 입힘), 가상 공간은 SVG 자취방 일러스트(임시안), 링크 미리보기 `og-image.png`, 파비콘 `favicon.svg`·`apple-touch-icon.png` (출처: src/assets, public, src/components/Room.jsx, docs/06-implementation.md)
- 글꼴: Pretendard v1.3.9 (jsDelivr CDN) (출처: index.html)
- 파일 위치: `src/assets/`(사진·일러스트), `public/`(파비콘·OG 이미지), 문구·가격은 `src/data/` (출처: README.md 부록)

## 7. 반응형 기준
- 모바일 헤더와 메뉴: 560px 이하에서 체험하기·제품·로그인 메뉴를 햄버거 버튼 아래 패널로 접음. 장바구니 버튼은 밖에 둠. 페이지 이동·Esc로 닫힘 (출처: src/components/Header.jsx, src/styles.css)
- 작은 화면에서 바뀌는 배치 (출처: src/styles.css)
  - 960px 이하: 체험(공간 + 패널)·상품 상세·체험 안내가 한 줄로 세로 배치, 특징 2열, 후기 1열, 섹션 여백 80px
  - 760px 이하: 세트 카드 세로 배치
  - 560px 이하: 좌우 여백 16px, 특징 1열, 주문서 입력·결제 수단 1열, 체험 화면 상태 표시줄 세로 배치
- 터치 환경에서 바뀌는 인터랙션: 터치 전용으로 바뀌는 동작 없음. 밝기 다이얼·비교 슬라이더는 포인터 이벤트라 터치 드래그로도 조작됨 (출처: src/components/CometDial/CometDial.jsx, src/pages/Experience.jsx)

## 8. 기술과 배포
- 구현 방식과 폴더 구조 (출처: package.json, README.md, src/App.jsx)
  - React 19 + React Router 7 + Vite 8, 움직임은 Motion, 테스트는 Vitest + Testing Library
  - 메인 외 페이지는 들어갈 때 불러옴(lazy). 페이지마다 브라우저 탭 제목 설정
  - 상태: 빛(프리셋·색·밝기) · 장바구니 · 데모 회원을 Context로 공유. 장바구니·회원·주문은 서버 없이 브라우저 localStorage에 저장 (출처: src/context/*, src/data/orders.js)
  - `src/pages`(페이지) · `src/components`(공통 요소) · `src/context`(상태) · `src/data`(상품·문구·가격 계산·주문 저장 + 테스트) · `docs`(기획 문서)
- 배포 방법: GitHub Pages https://u-el.github.io/my-shop/ . `main`에 push → GitHub Actions에서 테스트 → 빌드(`base: /my-shop/`) → 경로별 `index.html`과 `404.html` 생성 → 배포. 테스트가 실패하면 배포하지 않음. 새 페이지를 추가하면 `deploy.yml`의 경로 목록에도 넣어야 함 (출처: .github/workflows/deploy.yml, vite.config.js, README.md)

## 9. 아직 정하지 않은 사항
- [미정] 메인 색상·글꼴 확정 (Figma 무드 시안·스타일 보드) / 3. 디자인 쌓기 단계 (출처: README.md 7)
- [미정] 장면 프리셋 종류·개수 — 지금은 휴식·집중·영화·잠들기 전 임시안 / 2. 페이지 설계 단계 (출처: docs/06-implementation.md, src/data/content.js)
- [미정] 가상 공간 표현 방식 — 지금은 SVG 자취방 일러스트 임시안 / 4. 에셋 삽입 단계 (출처: docs/06-implementation.md)
- [미정] 실제 가격·세트 할인율·사양, 배송비·출고 기준 / 1. 목적·범위 확인 단계 (출처: src/data/products.js, src/data/pricing.js, src/data/content.js)
- [미정] 사업자 정보·고객센터 연락처, KC 인증번호·제조자·제조국 / 7. 배포 단계 (출처: README.md 부록, src/data/content.js, src/data/products.js)
- [미정] 실제 구매 후기 (지금은 예시 후기) / 7. 배포 단계 (출처: src/data/content.js)
- [미정] 약관·개인정보처리방침 법률 검토 / 7. 배포 단계 (출처: README.md 부록)
- [미정] 실제 결제(PG) 연동, 회원·주문 서버 저장 — 지금은 데모 결제, 비밀번호를 확인하지 않는 데모 로그인 / 7. 배포 단계 (출처: README.md 부록)
- [미정] 01~04 문서를 현재 구현에 맞게 고칠지 (Figma 사이트맵·와이어프레임은 보완 완료) / 2. 페이지 설계 단계 (출처: README.md 7)

## 제작 진행 규칙
AI는 아래 순서대로 한 단계씩만 진행합니다. 단계가 끝나면 결과를 보여 주고 질문 기능으로 '승인 · 다음 단계로 / 수정 요청 / 이 단계 다시 하기'를 묻습니다. 승인 전에는 다음 단계로 넘어가지 않습니다.
1. 목적·범위 확인: 1~2번 항목을 요약해 확인받고, 빠진 정보를 질문합니다.
2. 페이지 설계: 3번 항목대로 페이지와 섹션, 메뉴·버튼 이동만 만듭니다. 색·글꼴·움직임은 넣지 않습니다.
3. 디자인 쌓기: 4번 항목의 컬러, 글꼴, 여백, 반복 요소를 적용합니다.
4. 에셋 삽입: 6번 항목의 로고와 이미지를 넣고, 비어 있는 자리는 어떻게 채울지 묻습니다.
5. 인터랙션: 5번 항목을 바탕으로 동작을 제안하고, 하나씩 승인받아 적용합니다.
6. 반응형: 7번 항목 기준으로 모바일 화면을 점검하고 수정합니다.
7. 배포: 배포 방법을 제안하고, 배포 후 실제 주소에서 확인할 항목을 알려 줍니다.
수정이 생기면 화면과 이 파일을 함께 고칩니다.
