import { createContext, useContext, useMemo, useState } from 'react';
import { DEFAULT_PRESET_ID, findColor, findPreset } from '../data/content.js';

// 체험한 분위기(프리셋·색상·밝기)를 페이지 사이에서 유지해
// 상품 정보 페이지에서 "체험한 분위기 그대로" 보여줄 수 있게 한다.
const LightContext = createContext(null);

export function LightProvider({ children }) {
  const initial = findPreset(DEFAULT_PRESET_ID);
  const [presetId, setPresetId] = useState(initial.id);
  const [colorId, setColorId] = useState(initial.colorId);
  const [brightness, setBrightnessState] = useState(initial.brightness);
  // 체험에서 켜 볼 조명: 'lamp'(무드 조명) | 'bulb'(스마트 전구) | 'both'
  const [fixture, setFixture] = useState('lamp');

  const value = useMemo(
    () => ({
      presetId,
      colorId,
      color: findColor(colorId),
      brightness,
      fixture,
      setFixture,
      applyPreset(id) {
        const p = findPreset(id);
        if (!p) return;
        setPresetId(p.id);
        setColorId(p.colorId);
        setBrightnessState(p.brightness);
      },
      // 직접 조절하면 프리셋에서 벗어나 '나만의 조합'이 된다
      setColor(id) {
        setColorId(id);
        setPresetId(null);
      },
      setBrightness(v) {
        setBrightnessState(v);
        setPresetId(null);
      },
    }),
    [presetId, colorId, brightness, fixture],
  );

  return <LightContext.Provider value={value}>{children}</LightContext.Provider>;
}

export function useLight() {
  const ctx = useContext(LightContext);
  if (!ctx) throw new Error('useLight must be used inside LightProvider');
  return ctx;
}
