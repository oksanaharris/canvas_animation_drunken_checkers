
canvas = document.getElementById('MyCanvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx = canvas.getContext('2d');

var diamondW = 200;
var diamondH = 200;
var margin = -200;

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

function Diamond(topx, topy, rightx, righty, bottomx, bottomy, leftx, lefty, color) {
  this.topx = topx;
  this.topy = topy;
  this.rightx = rightx;
  this.righty = righty;
  this.bottomx = bottomx;
  this.bottomy = bottomy;
  this.leftx = leftx;
  this.lefty = lefty;
  this.baseColor = color;
  this.opacity;
  this.width = this.rightx - this.leftx;
  this.widthPercent;

  this.draw = function(){
    ctx.beginPath();
    ctx.moveTo(this.topx, this.topy);
    ctx.lineTo(this.rightx, this.righty);
    ctx.lineTo(this.bottomx, this.bottomy);
    ctx.lineTo(this.leftx, this.lefty);
    ctx.lineTo(this.topx, this.topy);
    // ctx.stroke();

    this.widthPercent = this.width/diamondW;
    console.log('width percent ', this.widthPercent);

    if (this.widthPercent <= .40) {
      this.opacity = 1;
    } else if (this.widthPercent >= 1.8) {
      this.opacity = 0.5;
    } else {
      this.opacity = 1 - (this.widthPercent - .30)/2;
    }

    var newColor = this.baseColor + this.opacity + ')';

    ctx.fillStyle = newColor;
    ctx.fill();
  }
}

var rangeXMin = 30;
var rangeXMax = 60;
var rangeYMin = 25;
var rangeYMax = 30;

var dxMin = 0.15;
var dxMax = 0.25;
var dyMin = 0.1;
var dyMax = 0.2;

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

// for (var k = 0; k < vertices.length; k++){
//   for (var l = 0; l < vertices[k].length; l++){
//     ctx.beginPath();
//     ctx.rect(vertices[k][l][0], vertices[k][l][1],5,5);
//     ctx.fillStyle = 'black';
//     ctx.fill();

//   }
// }

function animate(canvas, ctx){

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var n = 0;

  var diamondArr = [];

  while (n < topToBottom - 1) {

    if (n % 2 === 0) {

      for (var i = 0; i < across; i++){

        diamondArr.push(new Diamond(vertices[n][i].x, vertices[n][i].y, vertices[n+1][i+1].x, vertices[n+1][i+1].y, vertices[n+2][i].x, vertices[n+2][i].y, vertices[n+1][i].x, vertices[n+1][i].y, 'rgba(230, 0, 57,'));

      }

    } else {
        for (var j = 1; j < across; j++){

          diamondArr.push(new Diamond (vertices[n][j].x, vertices[n][j].y, vertices[n+1][j].x, vertices[n+1][j].y, vertices[n+2][j].x, vertices[n+2][j].y, vertices[n+1][j-1].x, vertices[n+1][j-1].y, 'rgba(26, 26, 26,'));
        }
    }

    n++;
  }


  for (var k = 0; k < diamondArr.length; k++){
    diamondArr[k].draw();
  }

  for (var p = 0; p < vertices.length; p++){
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

