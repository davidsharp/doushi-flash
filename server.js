/**/'use strict';

const express = require('express');
//const cookieParser = require('cookie-parser');
const { verbs, conjugations } = require('./lib/verbs');
//const getSettings = require('./middleware/get-settings');
const pick = require('./lib/pick');
const app = express();

var drawPlz = require('./draw')

//app.set('view engine', 'hbs');
app.use(express.static('public'));
//app.use(cookieParser());
//app.use(getSettings);

// random verb

app.get('/', (req, res) => {
  const { plain, kana, meaning, masu, te } = pick(verbs);
  
  let i = drawPlz([
    `${plain} (${kana})`,
    `${meaning}`,
    `${masu.kana}`,
    `${te.kana}`
  ]).toBuffer()
  res.writeHead(200, {
     'Content-Type': 'image/png',
     'Content-Length': i.length
   });
  res.end( i );
});

app.get('/:width/:height', (req, res) => {
  const { plain, kana, meaning, masu, te } = pick(verbs);
  //const { width, height } = req.params
  const width = parseInt(req.params.width)
  const height = parseInt(req.params.height)
  
  let i = drawPlz([
    `${plain} (${kana})`,
    `${meaning}`,
    `${masu.kana}`,
    `${te.kana}`
  ],{width,height}).toBuffer()
  res.writeHead(200, {
     'Content-Type': 'image/png',
     'Content-Length': i.length
   });
  res.end( i );
});

// specify verb

app.get('/v/:verb', (req, res) => {
  const verb =
        verbs.find(c=>(
                   c.kana==req.params.verb ||
                   c.kanji==req.params.verb ||
                   c.meaning.split(' ')[1]==req.params.verb ||
                   c.masu.kana==req.params.verb ||
                   c.masu.kanji==req.params.verb ||
                   c.te.kana==req.params.verb ||
                   c.te.kanji==req.params.verb
                  )) || {plain:`${req.params.verb} not found`,kana:'sorry',meaning:'supports plain, english, masu and te',masu:{kana:'try again? 🙈'},te:{kana:'❤️ david'}} //redirect!
  const { plain, kana, meaning, masu, te } = verb;
  let i = drawPlz([
    `${plain} (${kana})`,
    `${meaning}`,
    `${masu.kana}`,
    `${te.kana}`
  ]).toBuffer()
  res.writeHead(200, {
     'Content-Type': 'image/png',
     'Content-Length': i.length
   });
  res.end( i );
});

// custom write

app.get('/w/:write', (req, res) => {
  let i = drawPlz([
    req.params.write
  ]).toBuffer()
  res.writeHead(200, {
     'Content-Type': 'image/png',
     'Content-Length': i.length
   });
  res.end( i );
});

app.get('/w/:write/:width/:height', (req, res) => {
  const width = parseInt(req.params.width)
  const height = parseInt(req.params.height)
  
  let i = drawPlz([
    req.params.write
  ],{width,height}).toBuffer()
  res.writeHead(200, {
     'Content-Type': 'image/png',
     'Content-Length': i.length
   });
  res.end( i );
});

app.get('/oldindex', (req, res) => {
  res.render('index', {
    conjugations: conjugations.map(c => {
      return { name: c, enabled: res.locals.conjugations.includes(c) };
    }),
    kanjiOptional: res.locals.kanjiOptional
  });
});

app.get('/test', (req, res) => {
  const conjugation = pick(res.locals.conjugations);
  const { plain, kana } = pick(verbs);

  res.render('test', { conjugation, plain, kana });
});

app.get('/check', (req, res) => {
  const { plain, conjugation, guess } = req.query;
  const verb = verbs.find(verb => verb.plain === plain);
  const trimmed = guess.replace(/[\x08|\s]/g, '');
  const kanjiOptional = res.locals.kanjiOptional;
  const { kanji, kana } = verb[conjugation];
  console.log({ kanji, kana, kanjiOptional })
  const result = kanji === trimmed || kanjiOptional && kana === trimmed;

  res.render('check', { result, guess, kanji, kana });
});

app.listen(3000, console.log('Listening.'));//*/

/** /
var http = require('http')
var Canvas = require('canvas')

//var clock = require('./clock')
var drawPlz = require('./draw')

var canvas = new Canvas(320, 320)
var ctx = canvas.getContext('2d')

http.createServer(function (req, res) {
  //clock(ctx)

  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(
    //'<meta http-equiv="refresh" content="1;" />' +
    '<img src="' + drawPlz().toDataURL() + '" />'
  )
}).listen(3000, function () {
  console.log('Server started on port 3000')
})
//*/
