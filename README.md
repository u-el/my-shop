# LUMOOD 루무드

스마트 무드 조명과 스마트 전구를 파는 쇼핑몰 데모 사이트입니다.
구매하기 전에 가상의 방에서 빛의 색과 밝기를 직접 바꿔 보는 **체험**이 핵심입니다.

- 배포 주소: https://u-el.github.io/my-shop/
- 기획 문서: [`docs/`](docs) (목적 → 구조 → 사이트맵 → 와이어프레임 → 레퍼런스 → 구현)

> ⚠ **데모 사이트입니다.** 결제는 실제로 일어나지 않고, 회원·주문 정보는 서버 없이 방문한 브라우저에만 저장됩니다.

## 기능

| 영역 | 내용 |
| --- | --- |
| 메인 | 스크롤하면 커지는 첫 화면, 특징, 체험 안내, 제품 라인업, 세트 할인, 후기(예시) |
| 가상 체험 (`/experience`) | 장면·색·밝기를 고르고 무드 조명 / 전구 / 둘 다 켜 보기 |
| 제품 (`/product`, `/product/:id`) | 체험한 색으로 물든 제품 사진, 사양, FAQ, 상품정보제공고시, 찜하기 |
| 세트 할인 | 무드 조명 + 전구를 함께 사면 세트 수만큼 10% 할인 (자동 적용) |
| 장바구니 (`/cart`) | 수량 변경·삭제, 함께 사면 좋은 상품 담기 |
| 주문 (`/checkout`) | 도로명 주소 검색(카카오 우편번호), 카드·계좌이체·카카오페이·네이버페이 **데모 결제** |
| 비회원 주문 조회 (`/order-lookup`) | 주문 번호 + 휴대폰 번호 |
| 데모 회원 (`/signup`, `/login`, `/mypage`) | 가입·로그인, 주문 내역, 기본 배송지, 찜한 상품, 탈퇴 |
| 약관 (`/terms`, `/privacy`, `/refund`) | 이용약관, 개인정보처리방침, 교환·반품 안내 (초안) |

## 시작하기

```bash
npm install
npm run dev      # 개발 서버 (http://localhost:5173)
npm test         # 계산·주문 저장 로직 테스트
npm run build    # 배포용 빌드 (dist/)
```

`main` 브랜치에 푸시하면 GitHub Actions가 테스트 → 빌드 → GitHub Pages 배포를 합니다
([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)). 테스트가 실패하면 배포하지 않습니다.

**새 페이지를 추가하면** `deploy.yml`의 경로 목록에도 넣어 주세요. 그래야 그 주소로 바로 들어와도 열립니다.

## 내용 바꾸는 곳

| 바꿀 것 | 파일 |
| --- | --- |
| 상품 이름·가격·사양·FAQ·상품정보제공고시 | `src/data/products.js` |
| 세트 할인율 | `src/data/pricing.js` (`BUNDLE`) |
| 색상·장면, 메인 특징, 후기, 배송비·최대 수량·결제 수단, 회사 정보 | `src/data/content.js` |
| 약관·개인정보처리방침·교환반품 | `src/data/legal.js` |
| 상품 사진 | `src/assets/product-*.jpg` (사진 속 유리구 위치는 `src/components/ProductVisual.jsx`) |
| 링크 미리보기 문구·이미지 | `index.html`, `public/og-image.png` |

## 실제 판매 전에 꼭 할 일

데모용으로 채운 **임시 값**입니다. 코드에서 `임시안`, `확정 후 기재` 를 검색하면 찾을 수 있습니다.

- [ ] 사업자 정보·통신판매업 신고번호·고객센터 연락처 (`content.js`의 `COMPANY`)
- [ ] KC 인증번호, 제조자·제조국 (`products.js`의 `notice`)
- [ ] 실제 가격·할인율·사양
- [ ] 실제 구매 후기로 바꾸고 `REVIEWS_ARE_SAMPLES = false`
- [ ] 약관·개인정보처리방침 법률 검토
- [ ] 결제대행사(PG) 계약 후 실제 결제 연동
- [ ] 회원·주문을 서버(예: Supabase)로 옮기기. 지금은 **비밀번호를 저장·확인하지 않는** 데모 로그인입니다

## 구조

```
src/
  pages/        페이지 (메인 외에는 들어갈 때 불러옴)
  components/   헤더·푸터·상품 카드·세트 카드·결제 창 등
  context/      빛(색·밝기) · 장바구니 · 데모 회원 상태
  data/         상품·문구·가격 계산·주문 저장 (+ *.test.js)
docs/           기획 문서
```

기술: React 19, React Router 7, Vite 8, Motion, Vitest
