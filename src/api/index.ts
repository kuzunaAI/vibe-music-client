// 运行时按 env 切换 mock / real 实现
// 组件通过 `import api from '@/api'` 使用（或相对路径）
// 说明：如果项目没有 realApi.ts，这个模块会回退到 mockApi
const useMock = import.meta.env.VITE_USE_MOCK === 'true';

let impl: any = null;

if (useMock) {
  const mod = await import('./mockApi');
  impl = mod.default ?? mod;
} else {
  try {
    const mod = await import('./realApi'); // 如果存在 realApi，会被用到
    impl = mod.default ?? mod;
  } catch (e) {
    // realApi 不存在或导入失败，回退到 mock
    const mod = await import('./mockApi');
    impl = mod.default ?? mod;
  }
}

export default impl;
