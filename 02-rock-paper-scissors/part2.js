let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

let points = {
  'Tie': 3,
  'Player 1': 0,
  'Player 2': 6
}

const getConditionPiece = (player1, condition) => {
  if (condition === 'Tie') {
    return player1;
  } else if (condition === 'Player 1') {
    return winsFor[player1];
  } else if (condition === 'Player 2') {
    return losesFor[player1];
  }
}

let winsFor = {
  'rock': 'scissors',
  'paper': 'rock',
  'scissors': 'paper'
}

let losesFor = {
  'rock': 'paper',
  'paper': 'scissors',
  'scissors': 'rock'
}

let conditions = {
  'X': 'Player 1',
  'Y': 'Tie',
  'Z': 'Player 2'
}

let mappings = {
  'A': 'rock',
  'B': 'paper',
  'C': 'scissors',
}

let scores = {
  'rock': 1,
  'paper': 2,
  'scissors': 3
}

let matches = [];
lineReader.on('line', function (line) {
  matches.push(line);
});

let score = 0;

lineReader.on('close', function () {
  matches.forEach(match => {
    let [player1, condition] = match.split(' ');

    score += points[conditions[condition]] + scores[getConditionPiece(mappings[player1], conditions[condition])];
  });
  console.log('Score: ', score);
});