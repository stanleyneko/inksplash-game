// const canvas = document.getElementById("myCanvas");
// const ctx = canvas.getContext("2d");

// canvas.addEventListener("mousedown", (e) => {
//   //x座標　coordinate
//   //y z座標 coordinate
//   const x = e.offsetX;
//   const y = e.offsetY;
//   drawCircle(x, y);
// });

// function drawCircle(x, y) {
//   ctx.beginPath();
//   ctx.arc(x, y, 20, 0, Math.PI * 2);
//   ctx.fillStyle = "blue";
//   ctx.fill();
//   ctx.stroke();
// }

function drawRegularPolygon(ctx, centerX, centerY, sides, radius) {
  if (sides < 3) return;

  const angleStep = (Math.PI * 2) / sides; //各頂点の角度

  ctx.beginPath();

  for (let i = 0; i <= sides; i++) {
    const x = centerX + radius * Math.cos(i * angleStep - Math.PI / 2);
    const y = centerY + radius * Math.sin(i * angleStep - Math.PI / 2);

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }

    ctx.closePath();
    ctx.stroke();
  }
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
}
drawRegularPolygon(ctx, 150, 150, 6, 50);
