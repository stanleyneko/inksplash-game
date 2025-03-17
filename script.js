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

//Get random ink images from inkImages array by getting random index.
//Create random size of the ink images.
//Get pixel data of the canvas to identify white and color.
//Count the white pixel sum.
//Calculate the percentage of area player painted.

canvas.addEventListener("click", (e) => {
  //JavaScript representation of image HTML element
  const img = inkImages[Math.floor(Math.random() * inkImages.length)];

  //create ink image in random size
  const size = Math.random() * 100 + 200;
  ctx.drawImage(img, e.offsetX - size / 2, e.offsetY - size / 2, size, size);

  //get pixel data from image on canvas
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  let colorCount = 0;
  //create object with key rgba and value of color number
  for (let i = 0; i < data.length; i += 4) {
    const rgba = {};
    rgba.r = data[i];
    rgba.g = data[i + 1];
    rgba.b = data[i + 2];
    rgba.a = data[i + 3];
    //return true(white) when color number is 255
    const isWhite = checkColor(rgba);
    //count non white color
    if (!isWhite) {
      colorCount += 1;
    }
  }

  console.log(colorCount);

  //display number in xx.xx format
  const percentage = (colorCount / (canvas.width * canvas.height)) * 100;
  const percentageRounded = Math.floor(percentage * 100) / 100;
  console.log(`${percentageRounded}%`);

  const finishText = document.getElementById("finishText");
  finishText.innerHTML = `You painted ${percentageRounded}%!`;
});

//check rgb color number
const checkColor = (rgba) => {
  if (rgba.r === 255 && rgba.g === 255 && rgba.b === 255) {
    return true;
  } else {
    return false;
  }
};

//10秒すぎると、「Times Up！」とキャンバスの上に表示されフリーズする。//マウスをクリックするとカウントダウンがスタート！

//10秒カウントする
//
const alertmsg = function () {
  alert("Times up!!!!Look at how much you painted!");
};

const alertPopout = function () {
  setTimeout(alertmsg, 10000);
};

addEventListener("click", () => {
  alertPopout();
  removeEventListener();
});

//終了時の音
const playSound = function () {
  const alertSound = new Audio("audio/whistle.mp3");
  alertSound.play();
};
