var fs = require('fs');
var analyse = require('../src/index.js');

var css = fs.readFileSync('./test/basic.css', 'utf8');
analyse(css);

