module.exports.convertToEm = function (value, rootFontSize) {
  rootFontSize = rootFontSize || 16;
  if (value == 0) return 0;
  if (value.indexOf('rem') > 0) {
    return parseFloat(value.slice(0, -3));
  }
  if (value.indexOf('em') > 0) {
    return parseFloat(value.slice(0, -2));
  }
  if (value.indexOf('px') > 0) {
    var pixels = parseFloat(value.slice(0, -2));
    return pixels/rootFontSize;
  }
  console.log('Skipping: ', value);
}

module.exports.addToMap = function (map, key, value) {
  if (map.hasOwnProperty(key)) {
    map[key].push(value);
  } else {
    map[key] = [value];
  }
}
