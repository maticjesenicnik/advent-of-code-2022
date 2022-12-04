let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

let inputs = [];

lineReader.on('line', function (line) {
  inputs.push(line);
});

let sections = [];

lineReader.on('close', function () {
  inputs.forEach(input => {
    sections.push(input.split(',').map(item => item.split('-').map(s => +s)));
  });

  console.log(`Part 1: ${part1(sections)}`);
  console.log(`Part 2: ${part2(sections)}`);
});

const part1 = (sections) => {
  return totalOverlap = sections.filter(([[aStart, aEnd], [bStart, bEnd]]) => {
    return (aStart <= bStart && aEnd >= bEnd) || (bStart <= aStart && bEnd >= aEnd);
  }).length;
}

const part2 = (sections) => {
  return sections.filter(([[aStart, aEnd], [bStart, bEnd]]) => {
    let overlap = false;
    for (let i = aStart; i <= aEnd; i++) {
      if (i >= bStart && i <= bEnd) {
        overlap = true;
      }
    }
    return overlap;
  }).length;
}