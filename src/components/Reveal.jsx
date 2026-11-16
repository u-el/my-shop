import { motion } from 'motion/react';

// 화면에 들어올 때 살짝 떠오르며 나타나는 래퍼.
// from: 'up' | 'left' | 'right' | 'scale', delay: 초 단위.
// 동작 줄이기 설정을 켠 사용자에게는 main.jsx의 MotionConfig가 움직임 없이 보여 준다.
const OFFSET = {
  up: { y: 28 },
  left: { x: -36 },
  right: { x: 36 },
  scale: { scale: 0.94 },
};

export default function Reveal({ as = 'div', from = 'up', delay = 0, children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, ...OFFSET[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
