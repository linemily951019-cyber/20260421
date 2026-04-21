let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.hide(); // 隱藏原生的 HTML 影片元素，讓我們可以自訂繪製
}

function draw() {
  background(255, 240, 245); // 將背景設為粉白色
  
  let imgWidth = width * 0.6;
  let imgHeight = height * 0.6;
  
  // 設定影像繪製模式為以中心為基準，並畫在畫布正中央
  imageMode(CENTER);
  image(capture, width / 2, height / 2, imgWidth, imgHeight);
}
