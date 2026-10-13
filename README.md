# 作品集网站 — 使用与部署指南

一个零依赖、免构建的静态作品集网站。改几个占位符就能上线，免费托管。

## 1. 本地预览

最简单：直接双击 `index.html` 用浏览器打开。

如果想模拟线上环境（推荐）：

```bash
cd C:/Users/EDY/Desktop/freelance-kit/portfolio
python -m http.server 8080
# 浏览器打开 http://localhost:8080
```

## 2. 上线前必改的占位符（都在 index.html 里，搜 TODO）

| 位置 | 找什么 | 改成什么 |
|---|---|---|
| `<title>` | `Your Name` | 你的名字（英文拼写） |
| Hero 标题 | `Your Name` | 你的名字 |
| Hero 副标题 | `X years` | 你的真实年限，比如 `5 years` |
| 三个项目卡片 | 电商/监控/同步工具 | **你真实做过的项目**（课程设计、公司内部系统、小工具都行），每张卡片改 emoji、标签、标题、一句话效果 |
| 技术栈 chips | 按需增删 | 你真实掌握的技术，别写没碰过的 |
| 联系方式 | `your.email@example.com` | 你的邮箱 |
| GitHub/Fiverr/Upwork 链接 | `yourname` | 你的主页地址，没注册的先删掉那行 |

> 打字机代码窗口里的内容在 `js/main.js` 顶部 `lines` 数组里，把 `Your Name` 换掉即可。

**写项目卡片的诀窍**：客户不看技术名词，看"结果"。写「替代了 3 个 Excel 表格」「P95 加载低于 1 秒」这种，比写「使用了 Redis」有说服力。

## 3. 部署（三选一，全免费）

### 方案 A：GitHub Pages（最稳）

```bash
cd C:/Users/EDY/Desktop/freelance-kit/portfolio
git init
git add .
git commit -m "portfolio v1"
# 先在 GitHub 上新建一个公开仓库，比如 yourname.github.io 或 portfolio
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main   # 或 master，看本地分支名
```

然后：仓库页面 → **Settings → Pages → Source 选 `main` 分支 / root** → Save。
1 分钟后访问 `https://你的用户名.github.io/仓库名/`。

### 方案 B：Vercel（最快，以后想加域名方便）

1. 注册 [vercel.com](https://vercel.com)（可用 GitHub 账号登录）
2. 把代码推到 GitHub 仓库（同方案 A 的 git 步骤）
3. Vercel → Add New Project → 导入该仓库 → Deploy，十几秒出结果
4 免费送一个 `xxx.vercel.app` 域名

### 方案 C：Cloudflare Pages（国内访问速度最好）

1. 注册 Cloudflare → Workers & Pages → Create → Pages → Connect to Git
2. 选仓库 → 构建命令留空、输出目录填 `/` → Save and Deploy

> 国内客户也要看？方案 C 对国内访问最友好；或者两个都部署，简历里放两个链接。

## 4. 上线之后

- 把网站链接放进 Upwork profile、Fiverr 卖家页、闲鱼简介和发给客户的第一个消息里
- 接到新单、做完新项目 → 回来更新一张项目卡片（`git add . && git commit && git push` 自动更新）
