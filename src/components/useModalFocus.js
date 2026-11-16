import { useEffect } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select, textarea, iframe, [tabindex]:not([tabindex="-1"])';

// 모달이 열려 있는 동안 키보드 포커스를 창 안에 가두고, 닫히면 열기 전 위치로 돌려준다.
// - Tab / Shift+Tab은 창 안에서 처음 ↔ 끝으로 돈다
// - iframe(주소 검색) 안에서 Tab으로 빠져나와도 창 밖으로 나가지 않게 focusin으로 되돌린다
// - 열려 있는 동안 뒤 페이지 스크롤을 막는다
// returnTo(ref)에 요소를 넣어 두면 닫힐 때 열기 전 위치 대신 그 요소로 포커스를 옮긴다
export default function useModalFocus(ref, active, returnTo) {
  useEffect(() => {
    if (!active) return undefined;
    const opener = document.activeElement;
    const items = () => [...(ref.current?.querySelectorAll(FOCUSABLE) ?? [])];

    // 처음 포커스: data-autofocus가 붙은 요소, 없으면 첫 요소
    // (React autoFocus를 쓰면 열기 전 위치를 기억하기 전에 포커스가 옮겨져서 쓰지 않는다)
    (ref.current?.querySelector('[data-autofocus]') ?? items()[0])?.focus();

    const onKey = (e) => {
      if (e.key !== 'Tab') return;
      const list = items();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onFocusIn = (e) => {
      if (ref.current && !ref.current.contains(e.target)) items()[0]?.focus();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    document.addEventListener('focusin', onFocusIn);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('focusin', onFocusIn);
      // 지정한 곳, 없으면 열었던 버튼(아직 화면에 있을 때)으로 포커스를 돌려준다
      const target = returnTo?.current ?? opener;
      if (returnTo) returnTo.current = null;
      if (target instanceof HTMLElement && target.isConnected) target.focus();
    };
  }, [ref, active, returnTo]);
}
