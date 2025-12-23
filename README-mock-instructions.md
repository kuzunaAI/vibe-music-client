```markdown
如何以“纯前端 mock” 模式运行（新增说明）

1. 启用 mock
  - 在项目根创建 `.env.local`（或在现有 .env.* 中）并设置：
    VITE_USE_MOCK=true

2. 运行（以 Vite 项目为例）
  - 安装依赖：npm install  或 pnpm install 或 yarn
  - 启动：npm run dev  （控制台会显示本地 URL）

3. 数据位置
  - 所有 mock 数据都在：src/mocks/data.ts
  - 本地 mock API：src/api/mockApi.ts
  - 运行时切换入口：src/api/index.ts

4. 替换真实调用（可选）
  - 若项目中有直接使用 axios/fetch 的地方，推荐改为统一通过 `src/api/index.ts` 导入：
    import api from '@/api';
    const playlists = await api.getPlaylists();

5. 提交分支
  - 我已准备一个分支名 `pure-frontend-mock`（如果你想我推送，请再次确认授权）。
```
