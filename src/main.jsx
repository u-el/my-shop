import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import App from './App.jsx';
import { LightProvider } from './context/LightContext.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <MotionConfig reducedMotion="user">
        <LightProvider>
          <App />
        </LightProvider>
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>,
);
