//チュートリアルの画面
//マウスが押された時に、
//ランダムで画像を出す

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const blue = new Image();
blue.src = "images/blue.png";
const green = new Image();
green.src = "images/green.png";
const skyblue = new Image();
skyblue.src = "images/skyblue.png";
const pink = new Image();
pink.src = "images/pink.png";
const yellow = new Image();
yellow.src = "images/yellow.png";

const inkImages = [blue, green, skyblue, pink, yellow];

canvas.addEventListener("click", (e) => {
  //JavaScript representation of image HTML element
  const img = inkImages[Math.floor(Math.random() * inkImages.length)];
  //literally means img.src
  console.log(img);

  const size = Math.random() * 100 + 200;
  ctx.drawImage(img, e.offsetX - size / 2, e.offsetY - size / 2, size, size);
  //30px - 50px のランダムさいず
});

//画面内でどのくらい濡れてるかを判定
const imageData = ctx.getImageData(0, 0, 1000, 500);
const data = imageData.data;
console.log(imageData);
