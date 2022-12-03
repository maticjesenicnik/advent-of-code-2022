var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

let elves = [];
elves.push([])

lineReader.on('line', function (line) {
  if (line === '') {
    elves.push([]);
  } else {
    elves[elves.length - 1].push(line);
  }
});

lineReader.on('close', function () {
  let res = elves.sort((a, b) => {
    return b.reduce((c, d) => parseInt(c) + parseInt(d), 0) - a.reduce((c, d) => parseInt(c) + parseInt(d), 0);
  });

  let part1Result = res[0].reduce((a, b) => parseInt(a) + parseInt(b), 0);

  let part2Result = 0;
  for (let i = 0; i < 3; i++) {
    part2Result += res[i].reduce((a, b) => parseInt(a) + parseInt(b), 0);
  }

  console.log('Part 1: ' + part1Result);
  console.log('Part 2: ' + part2Result);
});
