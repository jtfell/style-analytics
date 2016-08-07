function linearRegression(dataPoints) {
  var Sx = 0;
  var Sy = 0;
  var Sxx = 0;
  var Sxy = 0;
  var Syy = 0;

  var n = dataPoints.length;
  var x = 0;
  var y;

  while (dataPoints.length) {
    y = dataPoints.shift();

    Sx += x;
    Sy += y;
    Sxx += x*x;
    Sxy += x*y;
    Syy += y*y;
    x += 1;
  }

  var m = ((n * Sxy) - (Sx * Sy)) / ((n * Sxx) - (Sx * Sx));
  var b = (Sy - (m * Sx)) / n;
  var r = ((n * Sxy) - (Sx * Sy)) / (Math.sqrt((n * Sxx) - (Sx * Sx)) * Math.sqrt((n * Syy) - (Sy * Sy)));
  
  return {
    m: m,
    b: b,
    r: r
  };
}


function exponentialRegression(dataPoints) {
  
  dataPoints = dataPoints.map(Math.log10);
  var res = linearRegression(dataPoints);
  var ratio = Math.pow(10, res.m);
  
  return {
    ratio: ratio,
    fit: res.r
  };
}

module.exports = exponentialRegression;
