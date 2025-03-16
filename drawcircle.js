const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// const totalPixel = canvas.width * canvas.height;
// console.log(totalPixel);
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
data = imageData.data;

canvas.addEventListener("click", (e) => {
  console.log(data);
});

const array = ["apple", "orange", "banana"];
