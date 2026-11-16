// @vitest-environment jsdom
// 화면 동작 테스트 — 실제 페이지를 그려서 사용자처럼 누르고 입력해 본다
import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import App from './App.jsx';
import { LightProvider } from './context/LightContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

// jsdom에 없는 브라우저 기능을 간단히 채운다
beforeAll(() => {
  window.matchMedia ??= (query) => ({ matches: false, media: query, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
  window.scrollTo = () => {};
  globalThis.ResizeObserver ??= class { observe() {} unobserve() {} disconnect() {} };
  globalThis.IntersectionObserver ??= class {
    constructor(cb) { this.cb = cb; }
    observe(el) { this.cb([{ isIntersecting: true, intersectionRatio: 1, target: el }], this); }
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
  };
});

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});
afterEach(cleanup);

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <MotionConfig reducedMotion="always">
        <LightProvider>
          <AuthProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </AuthProvider>
        </LightProvider>
      </MotionConfig>
    </MemoryRouter>,
  );

const type = (el, value) => fireEvent.change(el, { target: { value } });
const $ = (sel) => document.querySelector(sel);

// 데모 회원을 미리 가입·로그인시켜 둔다
const seedMember = (extra = {}) => {
  const email = 'test@example.com';
  const member = { email, name: '김테스트', phone: '010-1234-5678', address: null, marketing: false, createdAt: '2026-11-16T00:00:00.000Z', ...extra };
  localStorage.setItem('lumood:members', JSON.stringify({ [email]: member }));
  localStorage.setItem('lumood:session', JSON.stringify(email));
  return member;
};

describe('회원가입', () => {
  it('빈 칸으로 가입하면 칸마다 안내하고 첫 칸으로 이동한다', async () => {
    renderAt('/signup');
    fireEvent.click(await screen.findByRole('button', { name: '가입하기' }));
    expect(screen.getByText('이름을 입력해 주세요.')).toBeTruthy();
    expect(screen.getByText('필수 약관에 동의해 주세요.')).toBeTruthy();
    expect(document.activeElement.id).toBe('su-name');
  });

  it('정보를 다 채우면 가입되고 마이페이지로 간다 (비밀번호는 저장하지 않음)', async () => {
    renderAt('/signup');
    await screen.findByRole('button', { name: '가입하기' });
    type($('#su-name'), '김루무');
    type($('#su-email'), 'New@Example.com');
    type($('#su-password'), 'lumood1234');
    type($('#su-confirm'), 'lumood1234');
    type($('#su-phone'), '010-2222-3333');
    fireEvent.click(screen.getByLabelText('전체 동의'));
    fireEvent.click(screen.getByRole('button', { name: '가입하기' }));

    expect(await screen.findByRole('heading', { name: '김루무님, 반가워요' })).toBeTruthy();
    expect(localStorage.getItem('lumood:members')).toContain('new@example.com');
    expect(localStorage.getItem('lumood:members')).not.toContain('lumood1234');
  });
});

describe('세트 할인', () => {
  it('세트를 담으면 장바구니에 할인이 붙는다', async () => {
    renderAt('/product');
    fireEvent.click(await screen.findByRole('button', { name: '세트 담기' }));
    fireEvent.click(screen.getByRole('link', { name: '장바구니 보기' }));

    const summary = await screen.findByRole('heading', { name: '결제 예정 금액' });
    const box = within(summary.parentElement);
    expect(box.getByText('세트 할인 × 1')).toBeTruthy();
    expect(box.getByText('−6,800원')).toBeTruthy();
    expect(box.getByRole('button', { name: '61,200원 주문하기' })).toBeTruthy();
  });
});

describe('주문', () => {
  it('필수 정보 없이 결제하면 안내하고 결제하지 않는다', async () => {
    renderAt('/checkout?item=lamp');
    fireEvent.submit((await screen.findByText('주문서 작성')).closest('section').querySelector('form'));
    expect(screen.getByText('받는 분 이름을 입력해 주세요.')).toBeTruthy();
    expect(screen.getByText('주문 내용 확인에 동의해 주세요.')).toBeTruthy();
    expect(localStorage.getItem('lumood:orders')).toBeNull();
  });

  it('회원은 정보가 미리 채워지고, 세트 주문이 마이페이지 내역에 남는다', async () => {
    seedMember({ address: { zonecode: '04524', address: '서울 중구 세종대로 110', detail: '1층' } });
    renderAt('/checkout?item=lamp,bulb');
    await screen.findByText('회원 주문');
    expect($('#co-name').value).toBe('김테스트');
    expect($('#co-address').value).toBe('서울 중구 세종대로 110');

    fireEvent.click($('#co-agree'));
    fireEvent.click(screen.getByRole('button', { name: /61,200원 결제하기/ }));

    expect(await screen.findByRole('link', { name: '주문 내역 보기' }, { timeout: 3000 })).toBeTruthy();
    const [saved] = JSON.parse(localStorage.getItem('lumood:orders'));
    expect(saved).toMatchObject({ memberEmail: 'test@example.com', discount: 6800, total: 61200 });
    expect(saved.items.map((i) => i.id)).toEqual(['lamp', 'bulb']);
  });
});

describe('찜하기', () => {
  it('로그인 전에 누르면 로그인 화면으로 보낸다', async () => {
    renderAt('/product/bulb');
    fireEvent.click(await screen.findByRole('button', { name: '루무드 스마트 전구 찜하기' }));
    expect(await screen.findByRole('heading', { name: '다시 만나서 반가워요' })).toBeTruthy();
  });

  it('회원이 누르면 찜하고 마이페이지에 모인다', async () => {
    seedMember();
    renderAt('/product/bulb');
    const heart = await screen.findByRole('button', { name: '루무드 스마트 전구 찜하기' });
    fireEvent.click(heart);
    expect(heart.getAttribute('aria-pressed')).toBe('true');
    expect(JSON.parse(localStorage.getItem('lumood:members'))['test@example.com'].wish).toEqual(['bulb']);
  });
});

describe('헤더 메뉴', () => {
  it('메뉴 버튼으로 열고 Esc로 닫는다', async () => {
    renderAt('/');
    const btn = screen.getByRole('button', { name: '메뉴 열기' });
    fireEvent.click(btn);
    expect(btn.getAttribute('aria-expanded')).toBe('true');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(btn.getAttribute('aria-expanded')).toBe('false');
  });
});
