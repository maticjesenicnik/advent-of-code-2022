let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

let instructions = [];
const CYCLE_INTERVAL = 40;
let signalStrenght = 1;
let countCycle = 0; 
let row = ''; // Used for drawing the CRT screen

lineReader.on('line', (line) => {
  instructions.push(line);
});

lineReader.on('close', () => {
  instructions.forEach((instruction) => {
    let [command, num] = instruction.split(' ');
    switch (command) {
      case 'noop': draw(); break;
      case 'addx': draw(); draw(); signalStrenght += +num; break;
    }
  });
});

const draw = () => {
  row += [signalStrenght - 1, signalStrenght, signalStrenght + 1].includes(countCycle % CYCLE_INTERVAL) ? '#' : '.';

  countCycle++;

  if (countCycle % CYCLE_INTERVAL == 0) {
    console.log(row);
    row = '';
  }
}