let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.hide(); // 隱藏原生的 HTML 影片元素，讓我們可以自訂繪製
}

function draw() {
  background(255, 240, 245); // 將背景設為粉白色
  
  let imgWidth = width * 0.75;
  let imgHeight = height * 0.75;
  
  // 設定影像繪製模式為以中心為基準，並畫在畫布正中央
  push();
  translate(width / 2, height / 2); // 將座標原點移至畫面中央
  scale(-1, 1); // 進行水平翻轉 (X軸乘上 -1)
  imageMode(CENTER);
  image(capture, 0, 0, imgWidth, imgHeight); // 因為原點已移至中央，直接在 (0, 0) 畫出影像即可
  pop(); // 恢復原本的座標系統，避免影響其他繪圖
}
