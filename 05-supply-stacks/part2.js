let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

let instructions = [];
let crane = new Map();

crane[1] = ['F', 'R', 'W'];
crane[2] = ['P', 'W', 'V', 'D', 'C', 'M', 'H', 'T'];
crane[3] = ['L', 'N', 'Z', 'M', 'P'];
crane[4] = ['R', 'H', 'C', 'J'];
crane[5] = ['B', 'T', 'Q', 'H', 'G', 'P', 'C'];
crane[6] = ['Z', 'F', 'L', 'W', 'C', 'G'];
crane[7] = ['C', 'G', 'J', 'Z', 'Q', 'L', 'V', 'W'];
crane[8] = ['C', 'V', 'T', 'W', 'F', 'R', 'N', 'P'];
crane[9] = ['V', 'S', 'R', 'G', 'H', 'W', 'J'];


lineReader.on('line', function (line) {
  if (line.startsWith('move'))
    instructions.push(line);
});

lineReader.on('close', function () {
  instructions.forEach(move => {
    let input = move.split(' ');
    let [quantity, from, to] = [+input[1], +input[3], +input[5]];

    let items = crane[from].splice(0, quantity);
    crane[to] = items.concat(crane[to]);
  });

  let result = '';
  for (let position in crane) {
    result += crane[position].shift();
  }

  console.log(result);
});