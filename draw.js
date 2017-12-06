const fs = require('fs')
const path = require('path')
const Canvas = require('canvas').createCanvas
const registerFont = require('canvas').registerFont

registerFont('./font.otf', {family: 'Noto Sans'});

const drawPlz = (text,colour,width,height) =>{
const margin = 10;
const img = {width:width||300,height:height||300}

  var canvas = /*new */Canvas(img.width+2, img.height+2);
  var ctx = canvas.getContext('2d');

  var g=ctx.createLinearGradient(img.width-10,0,0,img.height-10);
  g.addColorStop(0,"#dddd44");
  g.addColorStop(1,"#44dd44");
  ctx.fillStyle=g;
  ctx.fillRect(0, 0, img.width, img.height);
  
  ctx.font = '36px "Noto Sans"';
  ctx.fillStyle = "black";
  ctx.strokeStyle = "white";
  ctx.strokeWidth = "2px";
  ctx.fillText(text||'こんいちは', 10, 50,100);
  
  /*
  const { registerFont, createCanvas } = require('canvas');
  registerFont('comicsans.ttf', {family: 'Comic Sans'});

var canvas = createCanvas(500, 500),
  ctx = canvas.getContext('2d');

ctx.font = '12px "Comic Sans"';
ctx.fillText(250, 10, 'Everyone hates this font :(');
  */
  
  // Create a circle
  //ctx.beginPath();
  //ctx.arc(img.width/2, img.height/2, (img.height/2)-10, 0, Math.PI * 2, true);

  // Clip to the current path
  //ctx.clip();

  //ctx.drawImage(img, 0, 0, img.width, img.height);
  
  return canvas
}

//export default drawPlz
//export { drawPlz }
module.exports=drawPlz