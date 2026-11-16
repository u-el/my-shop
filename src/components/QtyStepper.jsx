import { CHECKOUT } from '../data/content.js';

// 수량 선택: − [n] +  (1 ~ CHECKOUT.maxQty)
export default function QtyStepper({ value, onChange, label = '수량' }) {
  const set = (n) => onChange(Math.min(CHECKOUT.maxQty, Math.max(1, n)));
  return (
    <div className="qty" role="group" aria-label={label}>
      <button type="button" className="qty__btn" onClick={() => set(value - 1)} disabled={value <= 1} aria-label="수량 줄이기">
        −
      </button>
      <output className="qty__value" aria-live="polite">
        {value}
      </output>
      <button
        type="button"
        className="qty__btn"
        onClick={() => set(value + 1)}
        disabled={value >= CHECKOUT.maxQty}
        aria-label="수량 늘리기"
      >
        +
      </button>
    </div>
  );
}
