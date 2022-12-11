let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('test.txt')
});

let monkeys = [];
const ROUNDS = 20;

lineReader.on('line', (line) => {
  if (line.startsWith('Monkey')) {
    monkeys.push({ items: [], operand: '', operationValue: '', test: 0, throwTrue: 0, throwFalse: 0, inspections: 0 });
  } else if (line.includes('Starting items:')) {
    monkeys[monkeys.length - 1].items = line.slice(17, line.length).split(', ').map(num => +num);
  } else if (line.includes('Operation:')) {
    monkeys[monkeys.length - 1].operand = line.slice(23, line.length).split(' ')[0];
    monkeys[monkeys.length - 1].operationValue = line.slice(24, line.length).split(' ')[1];
  } else if (line.includes('Test:')) {
    monkeys[monkeys.length - 1].test = +line.slice(21, line.length).split(' ')[0];
  } else if (line.includes('true:')) {
    monkeys[monkeys.length - 1].throwTrue = +line.slice(29, line.length).split(' ')[0];
  } else if (line.includes('false:')) {
    monkeys[monkeys.length - 1].throwFalse = +line.slice(30, line.length).split(' ')[0];
  }
});

lineReader.on('close', () => {
  for (let i = 0; i < ROUNDS; i++) {
    for (let monkey of monkeys) {
      for (let item of monkey.items) {
        let value = monkey.operationValue === 'old' ? item : +monkey.operationValue;
        
        switch (monkey.operand) {
          case '+': item += value; break;
          case '-': item -= value; break;
          case '*': item *= value; break;
          case '/': item /= value; break;
        }

        item = Math.floor(item / 3);

        monkeys[item % monkey.test === 0 ? monkey.throwTrue : monkey.throwFalse].items.push(item);
        monkey.inspections++;
      }
      monkey.items = [];
    }
  }

  monkeys = monkeys.sort((a, b) => b.inspections - a.inspections);
  let monkeyBussiness = monkeys[0].inspections * monkeys[1].inspections;
  console.log(monkeyBussiness);
});