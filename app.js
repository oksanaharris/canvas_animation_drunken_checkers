
canvas = document.getElementById('MyCanvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx = canvas.getContext('2d');

var colorArr = ['#4deeea', '#74ee15', '#ffe700', '#f000ff', '#001eff', '#ff0303', '#8400ff', '#00fff6', '#0028ff', '#00ff28', '#ffa300', '#cf0060', '#ff00ff', '#13a8fe', '#4e87a4', '#b0d5ce', '#fff1e4', '#fa86ab', '#ee2889','#7b297d', '#e87888', '#eae8e5', '#b1185a','#c351a2', '#efa9df', '#f3cff1'];

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

function Vertex(x, y, dx, dy, rangeX, rangeY, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.rangeX = rangeX;
  this.rangeY = rangeY;
  this.radius = radius;
  this.color = color;

  this.drawCircles = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  }

  this.update = function() {
    // this.drawCircles();

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

var rangeXMin = 40;
var rangeXMax = 50;
var rangeYMin = 45;
var rangeYMax = 55;

var dxMin = 0.25;
var dxMax = 0.35;
var dyMin = 0.2;
var dyMax = 0.3;

var radiusMin = 18;
var radiusMax = 24;


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

    var color = 'rgb(' + Math.random()*255 + ',' + Math.random()*255 + ',' + Math.random()*255 + ')';

    var radius = Math.random() * (radiusMax - radiusMin) + radiusMin;

    vertices[i].push(new Vertex(x, y, dx, dy, rangeX, rangeY, radius, color));
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
        // ctx.strokeStyle = 'yellow';
        // ctx.lineWidth = 2;
        // ctx.stroke();
        // ctx.fillStyle = '#ff3366';
        ctx.fillStyle = colorArr[i];
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
          ctx.fillStyle = '#413e56';
          // ctx.strokeStyle = 'yellow';
          // ctx.lineWidth = 2;
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

