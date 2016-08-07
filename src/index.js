var postcss = require('postcss');
var utils = require('./utils');
var regression = require('./regression');

module.exports = function(css) {
  var root = postcss.parse(css);

  // Parse the AST and combine like properties
  var properties = combineLikeProperties(root);

  // Calculate the ratio used
  var results = calculateRatio(properties['font-size']);

  return results;
};

function combineLikeProperties(root) {
  // Initialise a map from property => list of values
  var combinedDecls = {};
  root.walkDecls(function(decl) {
    
    // Normalise the declaration and add each sub declaration to the map
    normaliseDeclaration(decl).forEach(function(decl) {
      var number = utils.convertToEm(decl.value);
      if (number !== null) {
        utils.addToMap(combinedDecls, decl.prop, utils.convertToEm(decl.value));
      }
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

/**
 * Perform exponential regression on the values in the list
 **/
function calculateRatio(xs) {
  var uniqueSizes = xs.sort().filter(onlyUnique);
  return regression(uniqueSizes);
}

/**
 * Function for filtering out non-unique values in a list
 **/
function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}

