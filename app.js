
canvas = document.getElementById('MyCanvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx = canvas.getContext('2d');

var diamondW = 200;
var diamondH = 200;
var margin = -20;

console.log('window width ', window.innerWidth);
console.log('window height ', window.innerHeight);

// var across = Math.floor((window.innerWidth - margin * 2) / diamondW);
var across = Math.floor(window.innerWidth / diamondW)+4;

// var topToBottom = Math.floor((window.innerHeight - margin * 2)/(diamondH/2));
var topToBottom = Math.floor(window.innerHeight /(diamondH/2))+4;

console.log(across, topToBottom);

var vertices = [];

var x;
var y;

function Vertex(x, y, dx, dy, rangeX, rangeY) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.rangeX = rangeX;
  this.rangeY = rangeY;

  this.update = function() {
    if (this.x > x + this.rangeX/2 || this.x < x - this.rangeX/2) {
      this.dx = -this.dx;
    }

    if (this.y > y + this.rangeY/2 || this.y < y - this.rangeY/2){
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
  }
}

var rangeXMin = 30;
var rangeXMax = 40;
var rangeYMin = 25;
var rangeYMax = 30;

var dxMin = 0.25;
var dxMax = 0.35;
var dyMin = 0.2;
var dyMax = 0.3;

for (var i = 0; i <= topToBottom; i++){
  vertices.push([]);
  for (var j = 0; j < across + 1; j++){
    if (i % 2 === 0){
      x = margin + diamondW/2 + j * diamondW;
    } else {
      x = margin + j * diamondW;
    }

    y = margin + i * diamondH/2;

    var dx = Math.random() * (dxMax - dxMin) + dxMin;
    var dy = Math.random() * (dyMax - dyMin) + dyMin;

    var rangeX = Math.random() * (rangeXMax - rangeXMin) + rangeXMin;
    var rangeY = Math.random() * (rangeYMax - rangeYMin) + rangeYMin;

    vertices[i].push(new Vertex(x, y, dx, dy, rangeX, rangeY));
  }
}



console.log(vertices);

// for (var k = 0; k < vertices.length; k++){
//   for (var l = 0; l < vertices[k].length; l++){
//     ctx.beginPath();
//     ctx.rect(vertices[k][l][0], vertices[k][l][1],5,5);
//     ctx.fillStyle = 'black';
//     ctx.fill();

//   }
// }

// Colors
// Pink: #ffc0cb // rgb(255, 192, 203);
// Creme: #fff4e6 // rgb(255, 244, 230);
// Green: #30f2c6 // rgb(48, 242, 198);
// Lilac: #ebd8f9 // rgb(235, 216, 249);
// Yellow: eff066 // rgb(230, 240, 102);

function animate(canvas, ctx){

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var n = 0;

  while (n < topToBottom - 1) {

    if (n % 2 === 0) {

      for (var i = 0; i < across; i++){
        ctx.beginPath();
        ctx.moveTo(vertices[n][i].x, vertices[n][i].y);
        ctx.lineTo(vertices[n+1][i+1].x, vertices[n+1][i+1].y);
        ctx.lineTo(vertices[n+2][i].x, vertices[n+2][i].y);
        ctx.lineTo(vertices[n+1][i].x, vertices[n+1][i].y);
        ctx.lineTo(vertices[n][i].x, vertices[n][i].y);
        // ctx.stroke();
        ctx.fillStyle = '#ff3366';
        ctx.fill();
      }

    } else {
        for (var j = 1; j < across; j++){
          // console.log('row ', n, ', vertex ', j);
          ctx.beginPath();
          ctx.moveTo(vertices[n][j].x, vertices[n][j].y);
          ctx.lineTo(vertices[n+1][j].x, vertices[n+1][j].y);
          ctx.lineTo(vertices[n+2][j].x, vertices[n+2][j].y);
          ctx.lineTo(vertices[n+1][j-1].x, vertices[n+1][j-1].y);
          ctx.lineTo(vertices[n][j].x, vertices[n][j].y);
          ctx.fillStyle = '#4d4967';
          // ctx.stroke();
          ctx.fill();
        }
    }

    n++;
  }

  for (var p = 0; p < vertices.length; p++){
    console.log()
    for (var q = 0; q < vertices[p].length; q++){
      vertices[p][q].update();
   }
  }

  window.requestAnimationFrame(function() {
    animate(canvas, ctx);
  });

}

window.onload = function(){
  animate(canvas, ctx);
}

