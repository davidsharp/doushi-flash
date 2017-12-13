const fs = require('fs')
const path = require('path')
const Canvas = require('canvas').createCanvas
const registerFont = require('canvas').registerFont
const UPPER_LIMIT = 2000
const DEFAULT_SIZE = 500
const SPACER = 'て' // so we can approximate a character height

registerFont('./font.otf', {family: 'Noto Sans'});

const drawPlz = (text='こんにちは',options={/*colour,width,height*/}) =>{
  const textToPrint = Array.isArray(text)?text.join('\n'):text
  const margin = 10;
  const { colour } = options;
  const width = options.width && !isNaN(options.width) && options.width <= UPPER_LIMIT ?
        options.width:DEFAULT_SIZE;
  const height = options.height && !isNaN(options.height) && options.height <= UPPER_LIMIT ?
        options.height:DEFAULT_SIZE;
  const img = {width,height}

  var canvas = /*new */Canvas(img.width, img.height);
  var ctx = canvas.getContext('2d');
  
  const textWidth = ctx.measureText(textToPrint).width
  const textHeight = ctx.measureText(SPACER).width

  var g=ctx.createLinearGradient(img.width-10,0,0,img.height-10);
  g.addColorStop(0,"#dddd44");
  g.addColorStop(1,"#44dd44");
  ctx.fillStyle=g;
  ctx.fillRect(0, 0, img.width, img.height);
  
  ctx.font = '36px "Noto Sans"';
  ctx.fillStyle = "black";
  ctx.strokeStyle = "white";
  ctx.strokeWidth = "2px";
  ctx.textAlign = "center";
  textToPrint.split('\n').forEach((l,i)=>
    ctx.fillText(l, /*10, 50,*/(width/2)/*-(textWidth/2)+margin*/,50+(i*textHeight*5)+margin, width-margin)//100);
  )
  console.log(ctx.measureText(textToPrint).width)
  console.log(ctx.measureText(SPACER).width)
  
  return canvas
}

module.exports=drawPlz