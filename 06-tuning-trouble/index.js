let inputSize = +process.argv[2];
if (!inputSize) { return console.log('Please provide array length as an argument')}

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

const checkIfCharactersUnique = (array) => {
  if (array.length !== inputSize) return false;
  let unique = true;
  array.forEach((character, index) => {
    if (array.indexOf(character) !== index) {
      unique = false;
    }
  });
  return unique;
}

let datastream;

lineReader.on('line', (line) => {
  datastream = line.split('');
});

lineReader.on('close', () => {
  let movingArray = [];
  datastream.forEach((data, index) => {
    movingArray.push(data);
    if (checkIfCharactersUnique(movingArray)) {
      return console.log(index + 1);
    } else if (movingArray.length === inputSize) {
      movingArray.shift();
    }
  });
});