var fs = require('fs');
var stylePolice = require('../src/index.js');

var css = fs.readFileSync('./test/basic.css', 'utf8');
stylePolice(css);

