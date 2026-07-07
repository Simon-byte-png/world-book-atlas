# 环球书榜 · World Book Atlas

以**可旋转的 3D 地球**与**史诗时间线**为入口，检索世界各国的经典好书。点击地球上的国家即可转到该国并查看其代表作书单，每本书配有从开放数据库抓取的真实封面。

![tech](https://img.shields.io/badge/React-18-61dafb) ![build](https://img.shields.io/badge/Vite-5-646cff)

## ✨ 功能

- **🌐 旋转地球**：正射投影地球，可拖拽旋转、滚轮缩放；各国按收录好书数量做鎏金热力着色；点击国家平滑旋转居中并弹出书单。
- **📜 时间线**：从公元前 800 年的荷马史诗到当代诺奖新作，按古典 / 近代 / 现代 / 当代分段的阅读编年史。
- **🏆 全球总榜**：154 本世界好书按综合评分排名。
- **🔍 搜索**：按书名（中/英/原文）、作者、国家检索。
- **🎨 真实封面书墙**：154 本全部配有真实封面（来自 Open Library），加载失败时回退到按体裁生成的设计封面。
- **评分与标记**：每本书含综合评分、豆瓣评分快照、以及作者的诺贝尔文学奖年份标记。

## 🗂 数据

- 书单数据：`src/data/books.js`（48 国 / 154 本，含中文名、原文名、英文名、作者、年代、体裁、评分、诺奖年份、简介）。
- 封面图片：`public/covers/{slug}.jpg`，清单在 `src/data/covers-manifest.json`。
- 地图数据：`world-atlas`（topojson），国家名与书单 `country` 字段一一对应。

> 说明：豆瓣评分为整理快照（豆瓣无开放 API，非实时）；封面来自 Open Library 开放库，按「英文书名 + 作者」匹配，个别可能是同书不同版本。

## 🚀 本地运行

```bash
npm install
npm run dev      # 本地开发，默认 http://localhost:5173
npm run build    # 构建到 dist/
npm run preview  # 预览构建产物
```

## 🖼 重新抓取封面（可选）

封面已随仓库提交，无需重抓。如需更新：

```bash
node scripts/fetch-covers.mjs
```

脚本会为 `src/data/books.js` 中每本书从 Open Library 匹配封面、下载到 `public/covers/`，并更新 `src/data/covers-manifest.json`。

## 🧱 技术栈

- React 18 + Vite 5
- react-simple-maps + d3-geo（地球与投影）
- world-atlas（世界地图 topojson）
- 纯前端、纯静态，数据内置，无需后端

## 📁 目录结构

```
src/
  App.jsx                  # 主应用（视图切换、搜索、书卡、时间线、弹窗）
  components/
    WorldMap.jsx           # 旋转地球
    BookCover.jsx          # 真实封面 / 设计封面
  data/
    books.js               # 书单数据
    covers-manifest.json   # 已有封面清单
  styles.css
public/covers/             # 真实封面图片
scripts/fetch-covers.mjs   # 封面抓取脚本
```

## 📜 许可

书目信息与封面版权归各出版方/作者所有，本项目仅作展示与检索用途。代码可自由使用。
