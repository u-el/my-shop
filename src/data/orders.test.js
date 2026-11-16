import { beforeEach, describe, expect, it } from 'vitest';
import { findOrder, hasSavedOrders, ordersOf, readLastOrder, removeOrdersOf, saveOrder } from './orders.js';

// 브라우저 저장소는 src/test/setup.js가 메모리로 흉내 낸다
const order = (no, extra = {}) => ({ no, phone: '010-1234-5678', total: 52000, ...extra });

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

describe('주문 저장·조회', () => {
  it('저장한 주문을 주문 번호 + 휴대폰 번호로 찾는다 (하이픈·대소문자 무관)', () => {
    saveOrder(order('LM-20261116-1234'));
    expect(findOrder(' lm-20261116-1234 ', '01012345678')?.no).toBe('LM-20261116-1234');
  });

  it('휴대폰 번호가 다르면 찾지 않는다', () => {
    saveOrder(order('LM-1'));
    expect(findOrder('LM-1', '010-9999-9999')).toBeNull();
  });

  it('마지막 주문은 주문 완료 화면용으로 따로 기억한다', () => {
    saveOrder(order('LM-1'));
    saveOrder(order('LM-2'));
    expect(readLastOrder().no).toBe('LM-2');
  });

  it('같은 주문 번호는 한 번만 저장하고, 최대 20건까지 남긴다', () => {
    saveOrder(order('LM-1'));
    saveOrder(order('LM-1'));
    expect(JSON.parse(localStorage.getItem('lumood:orders'))).toHaveLength(1);
    for (let i = 0; i < 25; i += 1) saveOrder(order(`LM-X${i}`));
    const list = JSON.parse(localStorage.getItem('lumood:orders'));
    expect(list).toHaveLength(20);
    expect(list[0].no).toBe('LM-X24');
  });

  it('저장소가 깨져 있어도 오류 없이 빈 목록으로 본다', () => {
    localStorage.setItem('lumood:orders', '{망가진 값');
    expect(hasSavedOrders()).toBe(false);
    expect(findOrder('LM-1', '01012345678')).toBeNull();
  });
});

describe('데모 회원 주문', () => {
  it('회원 주문만 모아 보고, 탈퇴하면 그 회원 주문만 지운다', () => {
    saveOrder(order('LM-A', { memberEmail: 'a@example.com' }));
    saveOrder(order('LM-B', { memberEmail: 'b@example.com' }));
    saveOrder(order('LM-G'));
    expect(ordersOf('a@example.com').map((o) => o.no)).toEqual(['LM-A']);

    removeOrdersOf('a@example.com');
    expect(ordersOf('a@example.com')).toEqual([]);
    expect(ordersOf('b@example.com')).toHaveLength(1);
    expect(findOrder('LM-G', '010-1234-5678')).not.toBeNull();
  });
});
