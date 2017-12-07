const fs = require('fs')
const path = require('path')
const Canvas = require('canvas').createCanvas
const registerFont = require('canvas').registerFont

registerFont('./font.otf', {family: 'Noto Sans'});

const drawPlz = (text='こんにちは',colour,width,height) =>{
  const textToPrint = Array.isArray(text)?text.join('\n'):text
  const margin = 10;
  const img = {width:width||300,height:height||300}

  var canvas = /*new */Canvas(img.width, img.height);
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
  ctx.fillText(textToPrint, 10, 50,100);
  
  return canvas
}

module.exports=drawPlz