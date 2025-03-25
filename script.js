//キャンバスを作成する
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("start-button");

const startGame = () => {
  setTimeout(endGame, 10000);
  canvas.addEventListener("click", onCanvasClick);
  countDownTimer();
};

startButton.addEventListener("click", startGame);

//透明の背景を白くぬる
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

//Check the canvas size.
console.log(`canvas size ${canvas.width} : ${canvas.height}`);

//インクのイメージの変数を作成
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

//インクの配列を作成
const inkImages = [blue, green, skyblue, pink, yellow];

//インクをinkImages配列から取り出し、サイズをランダムに変更
const getInkImages = () => {
  const img = inkImages[Math.floor(Math.random() * inkImages.length)];
  //100から200pxの間のランダムな大きさにする
  const size = Math.random() * 100 + 200;

  return { img, size };
};

const drawInkImage = (x, y, img, size) => {
  ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
};

const onCanvasClick = (e) => {
  e.preventDefault();
  const { img, size } = getInkImages();
  drawInkImage(e.offsetX, e.offsetY, img, size);
  const colorPixels = getPixeldata();
  getPixeldata();
  showPercentage(colorPixels);
  // Move this into a button on click method
  // you might need som estate flag, like `isPlaying`
};

const removeHandler = () => {
  canvas.removeEventListener("click", onCanvasClick);
};

const checkColor = (rgba) => {
  if (rgba.r === 255 && rgba.g === 255 && rgba.b === 255) {
    return true;
  } else {
    return false;
  }
};

const getPixeldata = () => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  let colorCount = 0;
  //白かカラーを調べ、連想配列に追加していく
  for (let i = 0; i < data.length; i += 4) {
    const rgba = {};
    rgba.r = data[i];
    rgba.g = data[i + 1];
    rgba.b = data[i + 2];
    rgba.a = data[i + 3];
    //255であったら白
    const isWhite = checkColor(rgba);
    //255でなかったらカラーなのでカウンターに1追加
    if (!isWhite) {
      colorCount += 1;
    }
  }
  return colorCount;
};

const showPercentage = (colorPixels) => {
  const percentage = (colorPixels / (canvas.width * canvas.height)) * 100;
  const percentageRounded = Math.floor(percentage * 100) / 100;
  console.log(`${percentageRounded}%`);
  const finishText = document.getElementById("finishText");
  finishText.innerHTML = `You painted ${percentageRounded}%!`;
};

//animation starts when game ends
const getEndGameText = document.getElementById("endgameText-animation");

const endGame = () => {
  removeHandler();
  getEndGameText.classList.add("show");
};

const timer = document.getElementById("timer");
const countDownTimer = () => {
  let i = 9;
  const intervalID = setInterval(() => {
    timer.innerHTML = i;
    i--;
    if (i === -1) {
      clearInterval(intervalID);
    }
  }, 1000);
};
