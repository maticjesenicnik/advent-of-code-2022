let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('inputs/input.txt')
});

let points = {
  'Tie': 3,
  'Player 1': 0,
  'Player 2': 6
}

let scenarios = {
  'rock:rock': 'Tie',
  'rock:paper': 'Player 2',
  'rock:scissors': 'Player 1',
  'paper:rock': 'Player 1',
  'paper:paper': 'Tie',
  'paper:scissors': 'Player 2',
  'scissors:rock': 'Player 2',
  'scissors:paper': 'Player 1',
  'scissors:scissors': 'Tie'
}

let mappings = {
  'A': 'rock',
  'B': 'paper',
  'C': 'scissors',
  'X': 'rock',
  'Y': 'paper',
  'Z': 'scissors'
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
    let [player1, player2] = match.split(' ');

    score += points[scenarios[`${mappings[player1]}:${mappings[player2]}`]] + scores[mappings[player2]];
  });
  console.log('Score: ', score);
});