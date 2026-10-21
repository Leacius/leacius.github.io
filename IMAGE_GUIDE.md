# 補上專案與論文圖片

首頁已保留原本的大頭照、研究興趣圖片與四篇既有論文圖片。新增項目使用獨立的 SVG 佔位圖，尚未補圖時也能正常顯示。

## 圖片位置

| 項目 | 目前佔位圖路徑 |
| --- | --- |
| 桌球擊球分析系統 TISS | `images/placeholders/table-tennis.svg` |
| 兒童發展篩檢模組 | `images/placeholders/child-screening.svg` |
| 醫學影像定位與三維重建 | `images/placeholders/medical-reconstruction.svg` |
| 影像與超音波跌倒偵測 | `images/placeholders/fall-detection.svg` |
| 生物組織大規模三維重建 | `images/placeholders/tissue-reconstruction.svg` |
| FLOW 論文 | `images/placeholders/flow.svg` |
| IEEE VRW 2026 論文 | `images/placeholders/serve-training.svg` |

## 替換方式

1. 將實際圖片放入 `images/`，例如 `images/table-tennis.jpg`。
2. 在 `index.html` 搜尋對應的佔位圖路徑，將該圖片的 `src` 改為新路徑。
3. 同時將 `alt` 改為實際圖片的描述。

例如：

```html
<img class="project-image" src="images/table-tennis.jpg"
     alt="桌球擊球分析系統操作畫面"
     width="960" height="600" loading="lazy">
```

專案圖片建議使用 8:5 比例（例如 960 × 600），圖片會裁切填滿預留空間。
論文圖片顯示區域為 3:2，會完整保留圖片內容。

網站沿用靜態 HTML/CSS 架構，更新圖片不需要安裝套件或執行建置。
