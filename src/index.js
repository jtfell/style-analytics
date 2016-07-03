var postcss = require('postcss');
var utils = require('./utils');

module.exports = function(css) {
  var root = postcss.parse(css);

  // 1. Parse the AST and combine like properties
  //    eg (margin, margin-top and margin-bottom)
  var properties = combineLikeProperties(root);
  console.log('Properties: ' + JSON.stringify(properties));

  // 2. Calculate the ratio used
  var ratio = calculateRatio(properties['font-size']);
  var base = calculateBase(ratio, properties['font-size']);

  // 3. Use the ratio and base to identify any outliers
  var outliers = identifyOutliers(ratio, base, properties['font-size']);

  console.log('Ratio is ' + ratio);
  console.log('Base is ' + base);
  console.log('Outliers: ' + outliers);
};

function combineLikeProperties(root) {
  // Initialise a map from property => list of values
  var combinedDecls = {};

  // Iterate over every declaration
  root.walkDecls(function(decl) {
    
    // Normalise the declaration and add each sub declaration to the map
    normaliseDeclaration(decl).forEach(decl => {
      utils.addToMap(combinedDecls, decl.prop, utils.convertToEm(decl.value));
    });
  });

  return combinedDecls;
};

/**
 * Convert a CSS declaration to an array of equivalent declarations made up 
 * of a subset of properties.
 * decl => [decl]
 **/
function normaliseDeclaration(decl) {
  var topVal, botVal;

  if (decl.prop == 'margin' || decl.prop == 'padding') {
    // TODO: Deal with this case
  }
  if (decl.prop == 'font-size' ||
      decl.prop == 'margin-top' ||
      decl.prop == 'margin-bottom' ||
      decl.prop == 'padding-top' ||
      decl.prop == 'padding-bottom') {
    return [decl];
  }

  return [];
}

function calculateRatio(xs) {

  // Needs to be a lot better than this...
  var last = null;
  var ratios = xs.sort().map(function(current) {
    if (last === null) {
      last = current;
      return 0;
    }
    var ratio = (current / last);
    last = current;
    return ratio;
  });
  return 1.5; 
  return ratios;
}

function calculateBase(ratio, props) {
  return 1;
}

function identifyOutliers(ratio, base, props) {
  return props.filter(val => {

    var multiplier = val;

    // Continually divide by the ratio until you reach 1
    while(multiplier > 0.9) {
      multiplier = multiplier / ratio;
    }
    console.log(multiplier*ratio);

    // Filter out all values that fit the scale (allowing for some error)
    return Math.abs(multiplier*ratio - 1) > 0.05;
  });
}

