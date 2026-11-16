// 비회원 주문 저장·조회 (데모)
// 서버가 없어 이 브라우저의 localStorage에만 최근 주문을 저장한다.
// 그래서 주문한 브라우저에서만 조회할 수 있다.

const LIST_KEY = 'lumood:orders';
const LAST_KEY = 'lumood:lastOrder';
const MAX_ORDERS = 10;

const digits = (s) => String(s ?? '').replace(/\D/g, '');

const read = (storage, key) => {
  try {
    return JSON.parse(storage.getItem(key));
  } catch {
    return null;
  }
};

const readList = () => {
  const list = read(localStorage, LIST_KEY);
  return Array.isArray(list) ? list : [];
};

export const saveOrder = (order) => {
  try {
    sessionStorage.setItem(LAST_KEY, JSON.stringify(order));
    const list = [order, ...readList().filter((o) => o.no !== order.no)].slice(0, MAX_ORDERS);
    localStorage.setItem(LIST_KEY, JSON.stringify(list));
  } catch {
    /* 저장 못 해도 주문 완료 화면 이동에는 문제없음 */
  }
};

export const readLastOrder = () => read(sessionStorage, LAST_KEY);

// 주문 번호 + 휴대폰 번호가 모두 맞아야 찾아 준다
export const findOrder = (no, phone) => {
  const key = String(no).trim().toUpperCase();
  const tel = digits(phone);
  return readList().find((o) => o.no === key && digits(o.phone) === tel) ?? null;
};

export const hasSavedOrders = () => readList().length > 0;

export const clearOrders = () => {
  try {
    localStorage.removeItem(LIST_KEY);
    sessionStorage.removeItem(LAST_KEY);
  } catch {
    /* 무시 */
  }
};
