import { defineConfig } from 'vitest/config';

// 테스트 전용 설정 — 화면 테스트(*.test.jsx)의 JSX를 React 방식으로 바꾼다
export default defineConfig({
  esbuild: { jsx: 'automatic' },
  test: {
    // 화면이 늦게 그려지는 페이지(나눠 불러오기)를 기다릴 수 있게 넉넉히
    testTimeout: 15000,
    setupFiles: ['./src/test/setup.js'],
  },
});
