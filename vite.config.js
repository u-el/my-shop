import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages 주소가 https://u-el.github.io/my-shop/ 이므로 빌드할 때만 base를 /my-shop/ 으로 둔다.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/my-shop/' : '/',
  plugins: [react()],
}));
