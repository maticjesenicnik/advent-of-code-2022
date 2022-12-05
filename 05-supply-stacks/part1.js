let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

let crane = new Array(9).fill(0).map(() => []);
let instructions = [];

lineReader.on('line', (line) => {
  if (line.startsWith('move')) {
    instructions.push({quantity: +line.split(' ')[1], from: +line.split(' ')[3] - 1, to: +line.split(' ')[5] - 1});
  } else {
    for (let i = 0; i < line.length; i++) {
      if (line.charCodeAt(i) >= 65 && line.charCodeAt(i) <= 90) {
        crane[Math.floor(i / 4)].push(line[i]);
      }
    }
  } 
});

lineReader.on('close', function () {
  instructions.forEach(move => {
    let {quantity, from, to} = move;

    for (let i = 0; i < quantity; i++) {
      crane[to].unshift(crane[from].shift());
    }
  });

  console.log(crane.reduce((acc, pile) => acc + pile[0], ''));
});