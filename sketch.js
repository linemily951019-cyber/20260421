let capture;
let pg; // 宣告一個變數用來存放額外的透明圖層

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.hide(); // 隱藏原生的 HTML 影片元素，讓我們可以自訂繪製
  
  // 產生一個與視訊畫面預計顯示大小一樣的圖層 (寬高的 75%)
  pg = createGraphics(width * 0.75, height * 0.75);
}

function draw() {
  background(255, 240, 245); // 將背景設為粉白色
  
  let imgWidth = width * 0.75;
  let imgHeight = height * 0.75;
  
  // 在 pg 上面繪製你想要的內容
  pg.clear(); // 每一幀必須先清除上一幀的圖形，維持圖層透明
  pg.fill(0, 255, 0, 150); // 設定半透明綠色
  pg.circle(pg.width / 2, pg.height / 2, 100); // 示範：在圖層正中央畫一個圓
  
  // 設定影像繪製模式為以中心為基準，並畫在畫布正中央
  push();
  translate(width / 2, height / 2); // 將座標原點移至畫面中央
  scale(-1, 1); // 進行水平翻轉 (X軸乘上 -1)
  imageMode(CENTER);
  image(capture, 0, 0, imgWidth, imgHeight); // 因為原點已移至中央，直接在 (0, 0) 畫出影像即可
  
  // 將這張 pg 圖片重疊畫在視訊畫面的上方
  image(pg, 0, 0, imgWidth, imgHeight);
  pop(); // 恢復原本的座標系統，避免影響其他繪圖
}
