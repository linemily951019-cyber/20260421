let capture;
let pg; // 宣告一個變數用來存放額外的透明圖層
let bubbles = []; // 宣告一個陣列來存放泡泡的資料

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.hide(); // 隱藏原生的 HTML 影片元素，讓我們可以自訂繪製
  
  // 產生一個與視訊畫面預計顯示大小一樣的圖層 (寬高的 75%)
  pg = createGraphics(width * 0.75, height * 0.75);
  
  // 初始化泡泡資料
  for (let i = 0; i < 30; i++) {
    bubbles.push({
      x: random(pg.width),
      y: random(pg.height),
      size: random(10, 40), // 隨機大小 10 到 40
      speed: random(1, 3)   // 隨機上升速度
    });
  }
  
  // 建立拍照按鈕
  let btn = createButton('📷 拍照');
  btn.position(20, 20); // 放在畫面左上角（視訊圖片外）
  btn.style('font-size', '18px');
  btn.style('padding', '10px 20px');
  btn.mousePressed(takeScreenshot); // 設定按下按鈕時執行的函數
}

function draw() {
  background(255, 240, 245); // 將背景設為粉白色
  
  let imgWidth = width * 0.75;
  let imgHeight = height * 0.75;
  
  // 在 pg 上面繪製你想要的內容
  pg.clear(); // 每一幀必須先清除上一幀的圖形，維持圖層透明
  
  // 繪製泡泡效果 (使用半透明的水藍色)
  pg.noStroke();
  pg.fill(100, 200, 255, 150);
  for (let i = 0; i < bubbles.length; i++) {
    let b = bubbles[i];
    pg.circle(b.x, b.y, b.size);
    
    b.y -= b.speed; // 讓泡泡往上飄
    b.x += sin(frameCount * 0.05 + i) * 1; // 利用 sin 函數產生左右搖擺的自然漂浮感
    
    // 如果泡泡飄出畫面上方，讓它從底部隨機水平位置重新出現
    if (b.y < -b.size) {
      b.y = pg.height + b.size;
      b.x = random(pg.width);
    }
  }
  
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

// 拍照並下載截圖的函數
function takeScreenshot() {
  let imgWidth = width * 0.75;
  let imgHeight = height * 0.75;
  
  // 使用 get(x, y, w, h) 只擷取畫面中「視訊圖片」的範圍
  let screenshot = get((width - imgWidth) / 2, (height - imgHeight) / 2, imgWidth, imgHeight);
  screenshot.save('my_photo', 'jpg'); // 將擷取的圖片儲存為 jpg 格式
}
