let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

let comparisons = [[]];
let indexes = [];

lineReader.on('line', function (line) {
  if (line.length == 0) {
    comparisons.push([]);
  } else {
    comparisons[comparisons.length - 1].push(JSON.parse(line));
  }
});

lineReader.on('close', function () {
  comparisons.forEach(([left, right], index) => {
    if (isInOrder(left, right) < 0) {
      indexes.push(index + 1);
    }
  });

  console.log(indexes.reduce((a, b) => a + b, 0))
});

const isInOrder = (left, right) => {
  if (left === undefined) return -1;
  if (right === undefined) return 1;

  if (isAllNumbers(left, right)) {
    if (left === right) {
      return 0;
    }

    return left < right? -1 : 1;
  }

  if (isAllNumbers(left)) {
    left = [left];
  } else if (isAllNumbers(right)) {
    right = [right];
  }

  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    const result = isInOrder(left[i], right[i]);

    if (result !== 0) {
      return result;
    }
  }

  return 0;
}

const isAllNumbers = (...arr) => { return arr.every((item) => typeof item === 'number')}