import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { removeOrdersOf } from '../data/orders.js';

// 데모 회원 기능
// ⚠ 서버가 없어 회원 정보를 이 브라우저의 localStorage에만 저장한다.
//   비밀번호는 저장하지도, 확인하지도 않는다. 로그인은 가입한 이메일만 맞으면 된다.
//   실제 운영에서는 인증 서비스(예: Supabase Auth)로 바꿔야 한다.
const MEMBERS_KEY = 'lumood:members';
const SESSION_KEY = 'lumood:session';

const AuthContext = createContext(null);

const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};
const write = (key, value) => {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* 저장 못 해도 이번 방문 동안은 동작 */
  }
};

export const normEmail = (s) => String(s ?? '').trim().toLowerCase();

export function AuthProvider({ children }) {
  // { [email]: { email, name, phone, address, createdAt, marketing } }
  const [members, setMembers] = useState(() => read(MEMBERS_KEY, {}));
  const [email, setEmail] = useState(() => read(SESSION_KEY, null));

  useEffect(() => write(MEMBERS_KEY, members), [members]);
  useEffect(() => write(SESSION_KEY, email), [email]);

  const value = useMemo(() => {
    const user = email ? members[email] ?? null : null;
    return {
      user,
      exists: (e) => Boolean(members[normEmail(e)]),
      signup({ email: e, name, phone, marketing }) {
        const key = normEmail(e);
        const member = { email: key, name: name.trim(), phone: phone.trim(), address: null, marketing, createdAt: new Date().toISOString() };
        setMembers((m) => ({ ...m, [key]: member }));
        setEmail(key);
        return member;
      },
      // 데모: 가입한 이메일이면 로그인 (비밀번호는 확인하지 않음)
      login(e) {
        const key = normEmail(e);
        if (!members[key]) return false;
        setEmail(key);
        return true;
      },
      logout() {
        setEmail(null);
      },
      // 기본 배송지 저장/삭제 — address: { zonecode, address, detail } | null
      saveAddress(address) {
        if (!email) return;
        setMembers((m) => ({ ...m, [email]: { ...m[email], address } }));
      },
      // 탈퇴: 회원 정보와 그 회원의 주문 기록을 이 브라우저에서 지운다
      withdraw() {
        if (!email) return;
        removeOrdersOf(email);
        setMembers((m) => {
          const next = { ...m };
          delete next[email];
          return next;
        });
        setEmail(null);
      },
    };
  }, [members, email]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
