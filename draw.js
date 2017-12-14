const fs = require('fs')
const path = require('path')
const Canvas = require('canvas').createCanvas
const registerFont = require('canvas').registerFont
const UPPER_LIMIT = 2000
const DEFAULT_SIZE = 500

registerFont('./font.otf', {family: 'Noto Sans'});
registerFont('./font-bals.ttf', {family: 'Balsamiq Sans'});



const drawPlz = (text='こんにちは',options={/*colours,width,height*/}) =>{
  const textToPrint = Array.isArray(text)?text.join('\n'):text
  const margin = 10;
  const width = options.width && !isNaN(options.width) && options.width <= UPPER_LIMIT ?
        options.width:DEFAULT_SIZE;
  const height = options.height && !isNaN(options.height) && options.height <= UPPER_LIMIT ?
        options.height:DEFAULT_SIZE;
  const colours = options.colours || ['#DD4','#4D4']
  const img = {width,height,colours}

  var canvas = /*new */Canvas(img.width, img.height);
  var ctx = canvas.getContext('2d');
  
  const textWidth = ctx.measureText(textToPrint).width
  const textHeight = 36

  var g=ctx.createLinearGradient(img.width-10,0,0,img.height-10);
  colours.forEach((c,i)=>{g.addColorStop(i,c)})
  ctx.fillStyle=g;
  ctx.fillRect(0, 0, img.width, img.height);
  
  ctx.font = `${textHeight}px "Noto Sans"`;
  ctx.fillStyle = "white";//"#EEE";
  ctx.strokeStyle = "#444";
  ctx.lineWidth = 4;
  ctx.lineJoin = "round";
  ctx.textAlign = "center";
  textToPrint.split('\n').reduce((a,l)=>{if(ctx.measureText(l).width>=width-margin)l.split(', ').forEach((c,i,_a)=>{a.push(i<_a.length-1?c+',':c)});else a.push(l);return a;},[]).forEach((l,i,a)=>{
    ctx.font = `${textHeight}px "${/[a-zA-Z]/.test(l)?'Balsamiq':'Noto'} Sans"`;
    const yPosition = (height/2)-((a.length/2)*textHeight)+(i*textHeight)+(i*margin*2)
    ctx.strokeText(l.trim(), (width/2),yPosition, width-margin)
    ctx.fillText(l.trim(), (width/2),yPosition,width-margin)
  }
  )
  
  return canvas
}

module.exports=drawPlz