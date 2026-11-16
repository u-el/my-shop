// 테스트 공통 준비: 브라우저 저장소(localStorage·sessionStorage)를 메모리로 흉내 낸다
// (최신 Node에는 미완성 localStorage가 들어 있어 jsdom 것을 가리므로, 테스트에서는 항상 이것을 쓴다)
const memoryStorage = () => {
  let data = {};
  return {
    getItem: (k) => (Object.hasOwn(data, k) ? data[k] : null),
    setItem: (k, v) => {
      data[k] = String(v);
    },
    removeItem: (k) => {
      delete data[k];
    },
    clear: () => {
      data = {};
    },
    key: (i) => Object.keys(data)[i] ?? null,
    get length() {
      return Object.keys(data).length;
    },
  };
};

for (const name of ['localStorage', 'sessionStorage']) {
  const storage = memoryStorage();
  Object.defineProperty(globalThis, name, { value: storage, configurable: true, writable: true });
  if (typeof window !== 'undefined' && window !== globalThis) {
    Object.defineProperty(window, name, { value: storage, configurable: true, writable: true });
  }
}
