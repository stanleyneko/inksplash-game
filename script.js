//Ink Splash game

//Create canvas.
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

/*Fill canvas background color white to get white pixel data.
 Default canvas background is transparent so it won't return anything.  */
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

//Check the canvas size.
console.log(`canvas size ${canvas.width} : ${canvas.height}`);

//ロード後３秒後に「マウスをクリックしてペイントしよう！10秒でどのくらいペイントできるかな？！」が表示される

//Create ink images and array.
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

//インクをinkImages配列から取り出し、サイズをランダムに変更
const getInkImages = () => {
  const img = inkImages[Math.floor(Math.random() * inkImages.length)];
  //100から200pxの間のランダムな大きさにする
  const size = Math.random() * 100 + 200;

  return { img, size };
};

// const inkData = getInkImages();
// const img = inkData.img;
// const size = inkData.size;

const drawInkImage = (x, y, img, size) => {
  ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
};

canvas.addEventListener("click", (e) => {
  const { img, size } = getInkImages();
  drawInkImage(e.offsetX, e.offsetY, img, size);
  const colorPixels = getPixeldata();
  getPixeldata();
  showPercentage(colorPixels);
});

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

//   const percentageRounded = Math.floor(percentage * 100) / 100;
//   console.log(`${percentageRounded}%`);

//   const finishText = document.getElementById("finishText");
//   finishText.innerHTML = `You painted ${percentageRounded}%!`;
// });

// canvas.addEventListener("click", (e) => {

//   const img = inkImages[Math.floor(Math.random() * inkImages.length)];

//   const size = Math.random() * 100 + 200;
//   ctx.drawImage(img, e.offsetX - size / 2, e.offsetY - size / 2, size, size);

//   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//   const data = imageData.data;
//   let colorCount = 0;
//   //create object with key rgba and value of color number
//   for (let i = 0; i < data.length; i += 4) {
//     const rgba = {};
//     rgba.r = data[i];
//     rgba.g = data[i + 1];
//     rgba.b = data[i + 2];
//     rgba.a = data[i + 3];
//     //return true(white) when color number is 255
//     const isWhite = checkColor(rgba);
//     //count non white color
//     if (!isWhite) {
//       colorCount += 1;
//     }
//   }

//   console.log(colorCount);

//   //display number in xx.xx format
//   const percentage = (colorCount / (canvas.width * canvas.height)) * 100;
//   const percentageRounded = Math.floor(percentage * 100) / 100;
//   console.log(`${percentageRounded}%`);

//   const finishText = document.getElementById("finishText");
//   finishText.innerHTML = `You painted ${percentageRounded}%!`;
// });

// //check rgb color number
// const checkColor = (rgba) => {
//   if (rgba.r === 255 && rgba.g === 255 && rgba.b === 255) {
//     return true;
//   } else {
//     return false;
//   }
// };

//animation starts when game ends
const getEndGameText = document.getElementById("endgameText-animation");

canvas.addEventListener("click", () => {
  const showText = () => {
    getEndGameText.classList.add("show");
  };
  setTimeout(showText, 10000);
  removeEventListener("click");
});

// const showGameMessage = () => {
//   getEndGameText.classList.add("show");
// };

// setTimeout(getEndGameText, 10000);

// setTimeout(() => {
//   getEndGameText.classList.add("show");
// }, 10000);

// const clickHandler = () => {
//   setTimeout(showGameMessage(), 10000);
//   removeEventListener;
// };

// addEventListener("click", () => {
//   clickHandler();
// });

//終了時の音
// const playSound = () => {
//   const alertSound = new Audio("audio/whistle.mp3");
//   alertSound.play();
// };
