'use strict';

const verbs = require('../lib/verbs');
const cookieName = 'japanese-conjugations-settings';
const cookieOpts = Object.freeze({ httpOnly: true, secure: true });

function getSettings(req, res, next) {
  let conjugations;
  let kanjiOptional;

  const cookies = req.cookies[cookieName] || {};
  
  if (req.query.settings === 'on') { // new settings
    conjugations = verbs.conjugations.filter(c => req.query[c] === 'on');
    kanjiOptional = req.query.kanjiOptional === 'on';

    res.cookie(cookieName, { conjugations, kanjiOptional }, cookieOpts);
  } else if (Array.isArray(cookies)) { // upgrade old cookie
    conjugations = cookies;
    kanjiOptional = false;

    res.cookie(cookieName, { conjugations, kanjiOptional } , cookieOpts);
  } else { // load from cookie
    conjugations = cookies.conjugations || [];
    kanjiOptional = cookies.kanjiOptional || false;
  }

  res.locals.conjugations = conjugations;
  res.locals.kanjiOptional = kanjiOptional;

  next();
}

module.exports = getSettings;
