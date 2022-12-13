let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

let comparisons = [];

lineReader.on('line', function (line) {
  if (line.length !== 0) {
    comparisons.push(JSON.parse(line));
  }
});

lineReader.on('close', function () {
  const packets = [...comparisons, [[2]], [[6]]].sort(isInOrder);

  const start = packets.findIndex(packet => JSON.stringify(packet) === '[[2]]') + 1;
  const end = packets.findIndex(packet => JSON.stringify(packet) === '[[6]]') + 1;

  console.log(start * end);
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