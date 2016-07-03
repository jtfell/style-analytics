module.exports.convertToEm = function (value) {
  if (value == 0) return 0;
  if (value.indexOf('em') > 0) {
    return parseFloat(value.slice(0, -2));
  }
  // TODO: deal with non em values
}

module.exports.addToMap = function (map, key, value) {
  if (map.hasOwnProperty(key)) {
    map[key].push(value);
  } else {
    map[key] = [value];
  }
}
