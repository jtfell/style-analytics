var fs = require('fs');
var analyse = require('../src/index.js');

var bootstrap = fs.readFileSync(__dirname + '/bootstrap.css', 'utf8');
var basscss = fs.readFileSync(__dirname + '/bass.css', 'utf8');
var foundation = fs.readFileSync(__dirname + '/foundation.css', 'utf8');
var pure = fs.readFileSync(__dirname + '/pure.css', 'utf8');


var res = analyse(bootstrap);
console.log('Bootstrap: ' + JSON.stringify(res));
res = analyse(basscss);
console.log('Basscss: ' + JSON.stringify(res));
res = analyse(foundation);
console.log('Foundation: ' + JSON.stringify(res));
res = analyse(pure);
console.log('Pure: ' + JSON.stringify(res));
