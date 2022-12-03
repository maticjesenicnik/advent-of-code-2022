var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

let inputs = [];
let compartments = [];

const getPoints = (character) => {
  let code = character.charCodeAt(0);
  if (code >= 97 && code <= 122) {
    return code - 96;
  } else if (code >= 65 && code <= 90) {
    return code - 38;
  }
}

lineReader.on('line', function (line) {
  inputs.push(line);
});

lineReader.on('close', function () {
  inputs.forEach(input => {
    let half = input.length / 2;
    compartments.push([input.slice(0, half).split(''), input.slice(half).split('')]);
  });
  
  let allMatches = [];
  
  compartments.forEach(content => {
    let matches = [];
    content[0].forEach(item => {
      if (content[1].includes(item)) {
        matches.push(item);
      }
    });

    let uniqueMatches = [];
    matches.forEach(match => {
      if (!uniqueMatches.includes(match)) {
        uniqueMatches.push(match);
      }
    });

    allMatches.push(uniqueMatches);
  });

  console.log(allMatches.flat().reduce((acc, item) => acc + getPoints(item), 0));
});