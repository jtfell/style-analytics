var fs = require('fs');
var analyse = require('../src/index.js');
var assert = require('assert');

var cssGood = fs.readFileSync('./test/basic.css', 'utf8');
var cssBad = fs.readFileSync('./test/basic-non-modular.css', 'utf8');

describe('Basic test', function() {
  it('Should determine a ratio of 1.5 and a almost perfect fit', function() {
    var res = analyse(cssGood);

    assert.ok(res.ratio > 1.49 && res.ratio < 1.51);
    assert.ok(res.fit > 0.999);
  });

  it('Should determine a non-modular scale', function() {
    var res = analyse(cssBad);

    assert.ok(res.fit < 0.999);
  });
});

