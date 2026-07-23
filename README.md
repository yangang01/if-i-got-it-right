# 写给你 · Interactive Apology Letter

一个移动端优先的互动道歉信 H5，使用 React、Vite、TypeScript、Motion 和原生 CSS 构建，可直接部署到 GitHub Pages。

阅读体验采用一条连续的 70 分钟通勤时间线：拖动时间轴从出门、步行、进站、地铁途中到到达公司；桌面支持指针拖动和方向键，移动端支持触摸拖动，也可以直接选择阶段节点。

## 本地运行

```bash
pnpm install
pnpm dev
```

开发服务器会监听局域网。电脑和手机连接同一个 Wi-Fi 后，在手机打开终端输出的 `Network` 地址，例如 `http://172.31.8.105:5173/`。

生产构建检查：

```bash
pnpm test -- --run
pnpm build
pnpm preview
```

## GitHub Pages

1. 将仓库推送到 GitHub 的 `main` 分支。
2. 在仓库 Settings → Pages → Build and deployment → Source 中选择 GitHub Actions。
3. 工作流会自动构建并发布到 `https://<用户名>.github.io/<仓库名>/`。

当前工作流按“项目站点”配置了 `VITE_BASE_PATH`。如果仓库名是 `<用户名>.github.io`，请将 `.github/workflows/deploy.yml` 中的环境变量改成 `/`。

文案集中在 `src/content/apology.ts`，可以在那里替换称呼、日期和个人细节。页面不提交表单、不收集访问者信息，结尾按钮只改变当前页面状态。
