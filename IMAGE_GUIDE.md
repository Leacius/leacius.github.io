# 補上專案與論文圖片

首頁已保留原本的大頭照、研究興趣圖片與四篇既有論文圖片。桌球分析專案使用 `video/` 中的示範影片，可透過播放器手動播放；兒童篩檢、醫學影像與跌倒偵測專案使用下方對應論文的圖片。尚未提供素材的項目保留獨立的 SVG 佔位圖。

## 圖片位置

| 項目 | 目前素材路徑 |
| --- | --- |
| 桌球擊球分析系統 TISS | `video/桌球分析系統Demo - 張堂真 (720p, h264).mp4` |
| 兒童發展篩檢模組 | `images/17.png`（與論文共用） |
| 醫學影像定位與三維重建 | `images/141.png`（與論文共用） |
| 影像與超音波跌倒偵測 | `images/16.png`（與論文共用） |
| 生物組織大規模三維重建 | `images/kernel-fft-diagram.png`（Kernel → 2D FFT → FFT Kernel 示意圖） |
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

專案圖片建議使用 8:5 比例（例如 960 × 600），預設會裁切填滿預留空間。共用的論文圖片與示範影片則完整顯示，不會裁切內容。
論文圖片顯示區域為 3:2，會完整保留圖片內容。

網站沿用靜態 HTML/CSS 架構，更新圖片不需要安裝套件或執行建置。

## Kernel FFT 示意圖

`images/kernel-fft-diagram.png` 使用內建 imagegen 工具，依提供的兩張參考圖製作。
製圖提示：擷取第二張圖的空間域 kernel 與第一張圖的頻域 kernel，重組為白底、橫向的「Kernel → 2D FFT → FFT Kernel」圖，保留灰階特徵，移除 MRI、其他運算、尺寸與放大框，標示 Spatial domain 與 Frequency domain。
這張圖用於說明轉換流程，並非以數值計算得到的 FFT 輸出。
