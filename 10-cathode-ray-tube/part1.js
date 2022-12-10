let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

let instructions = [];
let signalStrenght = countCycle = 0;
let registerStrenght = 1;

lineReader.on('line', (line) => {
  instructions.push(line);
});

lineReader.on('close', () => {
  instructions.forEach((instruction) => {
    let [command, value] = instruction.split(' ');
    switch (command) {
      case 'noop': cycle(); break;
      case 'addx': cycle(); cycle(); registerStrenght += Number(value); break;
    }
  });

  console.log(signalStrenght);
});

const cycle = () => {
  countCycle++;
  if ([20, 60, 100, 140, 180, 220].includes(countCycle)) {
    signalStrenght += registerStrenght * countCycle;
  };
}