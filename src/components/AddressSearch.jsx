import { useEffect, useRef, useState } from 'react';
import useModalFocus from './useModalFocus.js';

// 카카오(다음) 우편번호 서비스 — 무료, API 키 불필요
// https://postcode.map.daum.net/guide
// t1.daumcdn.net 도메인은 2026-11-30 종료 예정이라 t1.kakaocdn.net 주소를 쓴다
const SCRIPT_SRC = 'https://t1.kakaocdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

let loading = null;
const loadPostcode = () => {
  if (window.daum?.Postcode) return Promise.resolve();
  if (!loading) {
    loading = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = SCRIPT_SRC;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => {
        loading = null;
        reject(new Error('postcode script failed'));
      };
      document.head.appendChild(s);
    });
  }
  return loading;
};

// 도로명 주소 + (법정동, 건물명) 형태로 정리
const toAddress = (d) => {
  const road = d.roadAddress || d.address;
  const extra = [d.bname && /[동로가]$/.test(d.bname) ? d.bname : '', d.apartment === 'Y' ? d.buildingName : '']
    .filter(Boolean)
    .join(', ');
  return extra ? `${road} (${extra})` : road;
};

// 주소 검색 레이어. 고르면 onSelect({ zonecode, address })를 부르고 닫힌다.
// focusAfterSelect: 주소를 고른 뒤 포커스를 옮길 입력칸 id (예: 상세 주소)
export default function AddressSearch({ open, onClose, onSelect, focusAfterSelect }) {
  const boxRef = useRef(null);
  const panelRef = useRef(null);
  const returnTo = useRef(null);
  useModalFocus(panelRef, open, returnTo);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    let alive = true;
    setFailed(false);
    loadPostcode()
      .then(() => {
        if (!alive || !boxRef.current) return;
        boxRef.current.innerHTML = '';
        new window.daum.Postcode({
          oncomplete: (d) => {
            if (focusAfterSelect) returnTo.current = document.getElementById(focusAfterSelect);
            onSelect({ zonecode: d.zonecode, address: toAddress(d) });
            onClose();
          },
          width: '100%',
          height: '100%',
        }).embed(boxRef.current);
      })
      .catch(() => alive && setFailed(true));
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      alive = false;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose, onSelect, focusAfterSelect]);

  if (!open) return null;

  return (
    <div className="addr-layer" onClick={onClose}>
      <div ref={panelRef} className="addr-layer__panel" role="dialog" aria-modal="true" aria-label="주소 검색" onClick={(e) => e.stopPropagation()}>
        <div className="addr-layer__head">
          <strong>주소 검색</strong>
          <button type="button" className="addr-layer__close" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </div>
        {failed ? (
          <p className="addr-layer__fail">
            주소 검색을 불러오지 못했어요. 인터넷 연결을 확인하거나, 주소를 직접 입력해 주세요.
          </p>
        ) : (
          <div ref={boxRef} className="addr-layer__body" />
        )}
      </div>
    </div>
  );
}
