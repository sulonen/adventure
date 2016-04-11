'use strict';

module.exports = {
  west: new RegExp(/.*west.*|^a$/, 'i'),
  east: new RegExp(/.*east.*|^d$/, 'i'),
  north: new RegExp(/.*north.*|^w$/, 'i'),
  south: new RegExp(/.*south.*|^s$/, 'i'),
  get: new RegExp(/.*get.*|.*pick.*/, 'i'),
  give: new RegExp(/.*give.*|.*use.*|.*drop.*/, 'i'),
  warrior: new RegExp(/.*war.*/, 'i'),
  archer: new RegExp(/.*arch.*/, 'i')
};

  

