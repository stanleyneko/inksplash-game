//create canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("start-button");

const startGame = () => {
  setTimeout(endGame, 10000);
  canvas.addEventListener("click", onCanvasClick);
  countDownTimer();
};

startButton.addEventListener("click", startGame);

//change canvas background colour to white from transparent
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

//create ink image variables
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

//create ink images array
const inkImages = [blue, green, skyblue, pink, yellow];

//get an ink image from inkImages array and change it in random size
const getInkImages = () => {
  const img = inkImages[Math.floor(Math.random() * inkImages.length)];
  //generate random numbers between 100 - 200px. This number will be the ink image size
  const size = Math.random() * 100 + 200;

  return { img, size };
};

//when user click on canvas to fire the ink, it will appear where the cursor pointing
const drawInkImage = (x, y, img, size) => {
  ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
};

//main methods for all user interactions happening on canvas
const onCanvasClick = (e) => {
  e.preventDefault();
  const { img, size } = getInkImages();
  drawInkImage(e.offsetX, e.offsetY, img, size);
  const colorPixels = getPixeldata();
  getPixeldata();
  showPercentage(colorPixels);
};

//inactivate click after the game time end
const removeHandler = () => {
  canvas.removeEventListener("click", onCanvasClick);
};

//check color code to identify white or color
const checkColor = (rgba) => {
  if (rgba.r === 255 && rgba.g === 255 && rgba.b === 255) {
    return true;
  } else {
    return false;
  }
};

//check the pixels whether white or color
const getPixeldata = () => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  let colorCount = 0;
  //check whether white or color
  for (let i = 0; i < data.length; i += 4) {
    const rgba = {};
    rgba.r = data[i];
    rgba.g = data[i + 1];
    rgba.b = data[i + 2];
    rgba.a = data[i + 3];
    //if its 255 = white
    const isWhite = checkColor(rgba);
    //if its not 255 = color it counts
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

const getEndGameText = document.getElementById("endgameText-animation");

//inactivate click and starts animation to tell the game end
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
