import { useEffect, useRef, useState } from 'react';
import useModalFocus from './useModalFocus.js';
import { PRODUCT, formatWon } from '../data/content.js';

// 간편결제 데모 승인 창
// 실제 카카오페이·네이버페이와 연결되지 않고, 결제 정보도 받지 않는다.
export default function DemoPaySheet({ method, amount, qty, onApprove, onCancel }) {
  const [approving, setApproving] = useState(false);
  const sheetRef = useRef(null);
  useModalFocus(sheetRef, !!method);

  useEffect(() => {
    if (!method) return undefined;
    setApproving(false);
    const onKey = (e) => e.key === 'Escape' && onCancel();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [method, onCancel]);

  if (!method) return null;

  const approve = () => {
    setApproving(true);
    // 데모: 승인 대기처럼 잠깐 기다린 뒤 완료
    setTimeout(onApprove, 1200);
  };

  return (
    <div className="addr-layer" onClick={approving ? undefined : onCancel}>
      <div
        ref={sheetRef}
        className={`paysheet paysheet--${method.brand}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="paysheet-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="paysheet__head">
          <span className={`pay-badge pay-badge--${method.brand}`} aria-hidden="true">
            {method.mark}
          </span>
          <strong id="paysheet-title">{method.name} 결제</strong>
          <span className="paysheet__demo">데모</span>
        </div>

        <dl className="paysheet__info">
          <div>
            <dt>상품</dt>
            <dd>
              {PRODUCT.name} × {qty}
            </dd>
          </div>
          <div className="paysheet__amount">
            <dt>결제 금액</dt>
            <dd>{formatWon(amount)}</dd>
          </div>
        </dl>

        <p className="paysheet__note">
          데모 결제라 실제 {method.name}로 연결되지 않아요. 승인을 눌러도 돈이 나가지 않고, 결제 정보도 받지 않아요.
        </p>

        <div className="paysheet__actions">
          <button type="button" className="btn btn--ghost" onClick={onCancel} disabled={approving}>
            취소
          </button>
          <button type="button" className="btn paysheet__approve" onClick={approve} disabled={approving} data-autofocus>
            {approving ? '승인 중…' : `${formatWon(amount)} 결제 승인`}
          </button>
        </div>
      </div>
    </div>
  );
}
